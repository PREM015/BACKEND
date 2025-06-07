// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Import the database name from constants file
import { DB_NAME } from "../constants.js"; 

// Asynchronously connects to MongoDB using Mongoose
const connectdb = async () => {
  try {
    // Connect to MongoDB using MONGO_URI from .env and DB_NAME constant
    // `${process.env.MONGO_URI}/${DB_NAME}` constructs the full DB connection string
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`, {
        // Optional: Add more Mongoose connection options here if needed
      }
    );

    // Log success message with connection details
    console.log(`✅ MongoDB connected! Host: ${connectionInstance.connection.host}`);

  } catch (error) {
    // If connection fails, log error and exit the application with failure code
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit the process to avoid running server without DB
  }
};

// Export the connection function to use in other files
export default connectdb;
