import { WebSocketServer } from "ws";
import { createClient } from "redis";

const client = createClient()
console.log('Connected to redis')
client.on('error', (err) => {
  console.log('Error : ' + err);
})

const subscriber = client.duplicate()


const wss = new WebSocketServer({ port: 8080 })


wss.on('connection', async (ws) => {
  ws.on('error', console.error)
  await subscriber.connect()
  await subscriber.subscribe('problem_done', (message) => {
    console.log(message);
    ws.send(message)
    ws.on('message', (data, isBinary) => {
      console.log(data)
    })
  });
})