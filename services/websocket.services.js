import { WebSocketServer } from "ws";

class WebSocketService {
  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.clients = new Set();

    this.wss.on("connection", (ws) => {
      this.clients.add(ws);
      ws.on("close", () => this.clients.delete(ws));
    });
  }

  broadcast(data) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  handleUpgrade(req, socket, head) {
    this.wss.handleUpgrade(req, socket, head, (ws) => {
        this.wss.emit('connection', ws, res);
    })
  }
}


const wsService = new WebSocketService();

export default wsService;
