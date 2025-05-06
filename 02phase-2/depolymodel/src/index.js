import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import express from 'express'
import connectdb from "./db/index.js";
import dotenv from "dotenv"

connectdb();
dotenv.config({
  path:'./env'
})

/*

// Initialize Express app
const app = express();

(async () => {
  try {
    // Attempt to connect to MongoDB using URI + DB name from constants
    await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`);

    // Set up error listener for the app (catches unexpected server-level errors)
    app.on("error", (error) => {
      console.log("❌ Server Error: ", error);
      throw error;
    });

    // Start the server and listen on the provided PORT from .env
    app.listen(process.env.PORT, () => {
      console.log(`✅ App is listening on port ${process.env.PORT}`);
    });

  } catch (error) {
    // Catch any errors during DB connection or server startup
    console.error("❌ Initialization Error: ", error);
  }
})();*/