import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express()
const httpServer = app.listen(3000, () => console.log("connected to port 3000"))

const wss = new WebSocketServer({ server: httpServer })

wss.on("connection", (ws) => {
  ws.on('error', (err) => console.error(err))

  ws.on('message', (data, binary) => {
    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        client.send(data, { binary: binary })
      }
    })
  })

  ws.send("Hello msg from WebSocket")
})

