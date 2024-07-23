import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express()
const httpServer = app.listen(3000, () => console.log("connected to port 3000"))

const wss = new WebSocketServer({ server: httpServer })

let userCount = 0
wss.on("connection", (ws) => {
  ws.on('error', console.error)

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    })
   })
  })
  console.log("userCount = ", ++userCount)
  ws.send("Hello msg from WebSocket")
})

app.get("/", (req, res) => {
  res.send("A webSocket Server")
})

// TODO: try to create a room based chat application
/*
let connectedClients: {
  room: string,
  ws: WebSocket
}[] = []
wss.on("connection", (ws) => {
  ws.on('error', (err) => console.error(err))
  ws.on('message', (data, binary) => {
    const msg = JSON.parse(data.toString())
    if (msg.type === "join") {
      connectedClients.push({
        room: msg.room,
        ws: ws
      })
    } else if (msg.type === "message") {
      connectedClients.forEach((client) => {
        if (client.room === msg.room) {
          client.ws.send(msg.message)
        }
      })
    } else {
      ws.send("Invalid message")
    }
  })
  ws.send("Total online users = " + connectedClients.length)
})
*/
