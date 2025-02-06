import express from "express";
import { OrderController } from "../controllers/OrderController";
import { OrderService } from "../../domains/Order/OrderService";

export function createOrderRouter(orderService: OrderService) {
  const router = express.Router();
  const orderController = new OrderController(orderService);

  router.post("/", (req, res) => orderController.createOrder(req, res));

  router.put("/:id/status", (req, res) =>
    orderController.updateStatus(req, res)
  );

  return router;
}
