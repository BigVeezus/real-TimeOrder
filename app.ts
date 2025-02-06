import express from "express";
import http from "http";
import { WebSocketServer } from "./src/infrastruture/websockets/websocket";
import { OrderRepository } from "./src/domains/Order/OrderRepository";
import { OrderService } from "./src/domains/Order/OrderService";
import { createOrderRouter } from "./src/api/routes/OrderRoutes";
import { connectToDatabase } from "./src/infrastruture/db/mongo";

export async function createApp() {
  const app = express();
  app.use(express.json());

  const db = await connectToDatabase();

  // Explicitly create an HTTP server
  const server = http.createServer(app);

  const webSocketServer = new WebSocketServer(server);

  // Order Domain
  const orderRepository = new OrderRepository(db);
  const orderService = new OrderService(orderRepository, webSocketServer);

  // Routes
  app.use("/orders", createOrderRouter(orderService));

  // Start listening AFTER everything is set up
  server.listen(3000, () => console.log("Server running on port 3000"));

  return app;
}
