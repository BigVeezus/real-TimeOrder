import mongoose from "mongoose";
import { IOrder, OrderStatus } from "./interfaces/Order.interface";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalCost: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

// const ChainSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//     },
//     networkRPC: {
//       type: String,
//     },
//     gasInfo: {
//       tokenTransferGas: {
//         type: String,
//       },
//       nativeTransferGas: {
//         type: String,
//       },
//     },
//     testAddress: {
//       type: String,
//     },
//     transactionRPC: {
//       type: String,
//     },
//     explorerURL: {
//       type: String,
//     },
//     chainTicker: {
//       type: String,
//     },
//     chainId: {
//       type: String,
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     collection: "Wallet-Chains",
//     timestamps: true,
//     toObject: {
//       virtuals: true,
//       retainKeyOrder: true,
//     },
//     toJSON: {
//       virtuals: true,
//     },
//     // strictPopulate: false
//   }
// );

// const Chain = mongoose.model<IChain>("Wallet-Chain", ChainSchema);

// export default Chain;
