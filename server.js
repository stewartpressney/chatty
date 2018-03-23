    const express = require('express');
    const http = require('http');
    const WebSocket = require('ws');

    const app = express();

    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {

      ws.on('message', (message) => {
        console.log('server receives message', message)
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      };
    wss.broadcast(JSON.stringify({type: 'userConnected', onlineNumber:wss.clients.size}))

    });

    server.listen(8080, () => {
      console.log('Listening on %d', server.address().port);
    });