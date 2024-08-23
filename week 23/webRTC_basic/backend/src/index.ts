import { WebSocketServer, WebSocket } from "ws";


const wss = new WebSocketServer({ port: 8080 });

let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (data: string) => {
    try {
      const msg = JSON.parse(data);

      switch (msg.type) {
        case "identify-as-sender":
          senderSocket = ws;
          break;
        case "identify-as-receiver":
          receiverSocket = ws;
          break;
        case "create-offer":
          if (ws !== senderSocket) return;
          receiverSocket?.send(JSON.stringify({ type: "offer", offer: msg.offer }));
          break;
        case "create-answer":
          if (ws !== receiverSocket) return;
          senderSocket?.send(JSON.stringify({ type: "answer", answer: msg.answer }));
          break;
        case "ice-candidate":
          if (ws === senderSocket) {
            receiverSocket?.send(JSON.stringify({ type: "ice-candidate", candidate: msg.candidate }));
          } else if (ws === receiverSocket) {
            senderSocket?.send(JSON.stringify({ type: "ice-candidate", candidate: msg.candidate }));
          }
          break;
        default:
          console.warn(`Unknown message type: ${msg.type}`);
      }
    } catch (err) {
      console.error("Failed to parse message:", err);
    }
  });

  ws.on("close", () => {
    if (ws === senderSocket) senderSocket = null;
    if (ws === receiverSocket) receiverSocket = null;
  });
});
