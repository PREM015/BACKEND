import mongoose from "mongoose";

// Define the schema fields as needed
const orderSchema = new mongoose.Schema({
  // Example fields (replace or extend as required)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
}, { timestamps: true }); 

export const Order = mongoose.model("Order", orderSchema); 