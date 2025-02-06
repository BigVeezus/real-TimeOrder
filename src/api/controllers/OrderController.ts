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

      const data = await this.orderService.updateOrderStatus(id, status);
      res.status(200).json({ message: "Order status updated", data });
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

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.orderService.getAllOrders();
      res.status(200).json({ message: "Got all orders", data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred." });
      }
    }
  }

  async getOneOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const data = await this.orderService.getOneOrder(id);
      res.status(200).json({ message: "Got order by Id", data });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unknown error occurred." });
      }
    }
  }
}
