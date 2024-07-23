import WebSocket, { WebSocketServer } from "ws";
import { createClient } from "redis";

const subscriber = createClient();
console.log('Connected to Redis');

subscriber.on('error', (err) => {
  console.log('Error : ' + err);
});

const wss = new WebSocketServer({ port: 8080 }); // ws://localhost:8080

// Map to store userId to WebSocket connection
const userConnections = new Map();

const getData = async () => {
  try {
    await subscriber.connect();
    await subscriber.subscribe('problem_done', (message) => {
      // Assuming the message is a JSON string containing userId and other data
      const data = JSON.parse(message);
      console.log(data)
      const userId = data.userId;

      // Find the WebSocket connection for this userId
      const ws = userConnections.get(userId);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getData();

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  // Handle messages from WebSocket clients
  ws.on('message', (message) => {
    // Assuming the client sends a JSON string containing userId
    //@ts-ignore
    const data = JSON.parse(message);
    // console.log(data)
    const userId = data.userId;

    // Store the WebSocket connection for this userId
    userConnections.set(userId, ws);

    console.log(`User connected: ${userId}`);
  });

  ws.on('close', () => {
    // Remove the WebSocket connection when it is closed
    userConnections.forEach((value, key) => {
      if (value === ws) {
        userConnections.delete(key);
        console.log(`User disconnected: ${key}`);
      }
    });
  });

  ws.send('Connected to WebSocket server');
});
