import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; 

// Asynchronously connects to MongoDB using Mongoose
const connectdb = async () => {
  try {
    // Connect to MongoDB using MONGO_URI from .env and DB_NAME constant
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`, {
       
      }
    );

    // Log success message with connection details
    console.log(`✅ MongoDB connected! Host: ${connectionInstance.connection.host}`);

  } catch (error) {
    // Log error and exit the application
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectdb;
