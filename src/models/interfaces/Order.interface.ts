import { Document, Types } from "mongoose";

export interface IOrder {
  _id: Types.ObjectId;
  userId: Types.ObjectId | any;
  items: OrderItems[];
  totalCost: number;
  status: OrderStatus;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItems {
  productId: Types.ObjectId;
  cost: number;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  DISPATCHED = "DISPATCHED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}

// domain/events/OrderEvents.ts
export interface OrderStatusChangedEvent {
  orderId: string;
  oldStatus: OrderStatus;
  newStatus: OrderStatus;
  timestamp: Date;
}
