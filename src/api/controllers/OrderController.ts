import { Request, Response } from "express";
import { OrderService } from "../../domains/Order/OrderService";
import { IOrder } from "../../models/interfaces/Order.interface";

export class OrderController {
  private orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async updateStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;

    try {
      if (!status) {
        res.status(400).json({ error: "missing order status" });
        return;
      }

      await this.orderService.updateOrderStatus(id, status);
      res.status(200).json({ message: "Order status updated" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred." });
      }
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const payload: IOrder = req.body;
      if (!payload.userId || payload.items.length == 0) {
        res.status(400).json({ error: "invalid payload" });
        return;
      }
      const data = await this.orderService.createOrder(payload);
      res.status(200).json({ message: "Order created", data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred." });
      }
    }
  }
}
