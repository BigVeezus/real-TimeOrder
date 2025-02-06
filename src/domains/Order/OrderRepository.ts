import { Db, Collection, ObjectId, Document, UpdateResult } from "mongodb";
import { IOrder } from "../../models/interfaces/Order.interface";
import mongoose, { mongo } from "mongoose";
import { OrderModel } from "../../models/Order";

export class OrderRepository {
  private db;

  constructor(db: typeof mongoose) {
    this.db = db;
  }

  async createOrder(order: IOrder): Promise<Document | null> {
    try {
      const newOrder = new OrderModel(order);
      return await newOrder.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllOrders(): Promise<Document | null[]> {
    try {
      return await OrderModel.find({});
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOneOrder(id: string): Promise<Document | null> {
    try {
      return await OrderModel.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string): Promise<Document | null> {
    try {
      return OrderModel.findById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateStatus(id: string, status: string): Promise<UpdateResult> {
    try {
      return OrderModel.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
