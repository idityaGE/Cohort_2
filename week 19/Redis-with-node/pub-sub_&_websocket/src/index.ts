import { WebSocketServer } from "ws";
import { createClient } from "redis";

const client = createClient()
client.on('error', (err) => {
  console.log('Error : ' + err);
})

const wss = new WebSocketServer({ port : 8080 })

wss.on('connection', (ws) => {
  ws.on('error', console.error)
  client.subscribe('problem_done', (err, count) => {
    if (err) {
      console.error('Error subscribing to channel:', err);
    } else {
      console.log('Subscribed to channel:', count);
    }
  });
  client.on('message', (channel, message) => {
    ws.send(message)
  })
})