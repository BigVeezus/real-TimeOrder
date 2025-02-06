import { OrderRepository } from "./OrderRepository";
import { WebSocketServer } from "../../infrastruture/websockets/websocket";
import { IOrder, OrderStatus } from "../../models/interfaces/Order.interface";

export class OrderService {
  orderRepository: OrderRepository;
  webSocketServer: WebSocketServer;
  constructor(
    orderRepository: OrderRepository,
    webSocketServer: WebSocketServer
  ) {
    this.orderRepository = orderRepository;
    this.webSocketServer = webSocketServer;
  }

  async updateOrderStatus(id: string, status: string) {
    try {
      const order = await this.orderRepository.findById(id);
      if (!order) throw new Error("Order not found");

      const data = await this.orderRepository.updateStatus(id, status);
      this.webSocketServer.broadcast("ORDER_STATUS_CHANGED", {
        id: order._id,
        oldStatus: order.status,
        newStatus: status,
        timestamp: new Date(),
      });

      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async createOrder(order: IOrder) {
    try {
      order.totalCost = this.calculateTotalCost(order);
      order.status = OrderStatus.PENDING;

      const newOrder = await this.orderRepository.createOrder(order);
      if (!newOrder) throw new Error("Order not created");
      return newOrder;
    } catch (error) {
      console.log(error);
      throw new Error("couldnt update order");
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.getAllOrders();
      return orders;
    } catch (error) {
      console.log(error);
      throw new Error("couldnt get all orders");
    }
  }

  async getOneOrder(id: string) {
    try {
      const order = await this.orderRepository.getOneOrder(id);
      return order;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  calculateTotalCost(order: IOrder): number {
    return order.items.reduce((total, item) => {
      return total + item.cost * item.quantity;
    }, 0);
  }
}
