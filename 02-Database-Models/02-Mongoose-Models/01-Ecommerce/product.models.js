import mongoose from "mongoose";

// Define product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from both ends
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures price cannot be negative
    },
    description: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from both ends
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // References another document (User model)
       ref:" category"// Refers to the "User" collection
    },
    owner:{
      type: mongoose.Schema.type.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export Product model
const Product = mongoose.model("Product", productSchema);

export default Product;
