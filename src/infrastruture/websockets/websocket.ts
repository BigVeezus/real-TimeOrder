import WebSocket, {
  Server as WebSocketServerType,
  WebSocket as WebSocketType,
} from "ws";
import { Server as HttpServer } from "http";
import { Request } from "express";

export class WebSocketServer {
  private wss: WebSocketServerType;
  private clients: Set<WebSocketType>;

  constructor(server: HttpServer) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Set<WebSocketType>();

    this.wss.on("connection", (ws: WebSocketType, req: Request) => {
      console.log(`New WebSocket connection from ${req.socket.remoteAddress}`);

      this.clients.add(ws);
      ws.on("close", () => this.clients.delete(ws));

      ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });
  }

  public notifyClients(data: unknown): void {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
  public broadcast(event: string, data: any): void {
    const message = JSON.stringify({ event, data });
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
