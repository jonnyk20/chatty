// server.js

const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let userCycle = 0;
wss.on('connection', (ws) => {
  console.log('Client connected');

    ws.send(JSON.stringify({id: uuidv1(), type: 'userCycle', cycleNumber: userCycle}));

  userCycle = userCycle === 4 ? 0 : userCycle + 1;

  console.log(wss.clients.size)
  wss.clients.forEach((client, index) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({id: uuidv1(), type: 'incomingNotification', content: 'a user has connected', newCount: wss.clients.size}));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    wss.clients.forEach((client, index) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({id: uuidv1(), type: 'incomingNotification', content: 'a user has disconnected', newCount: wss.clients.size}));
      }
    });
  });

  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    const message = JSON.parse(data);
    message.id = uuidv1();
    if (message.type === 'postMessage') {
      message.type = 'incomingMessage';
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    } else if (message.type === 'postNotification') {
      message.type = 'incomingNotification';
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
      
  });
});
