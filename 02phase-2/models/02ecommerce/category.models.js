import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Use PascalCase for model name (recommended by Mongoose)
export const Category = mongoose.model("Category", categorySchema);
