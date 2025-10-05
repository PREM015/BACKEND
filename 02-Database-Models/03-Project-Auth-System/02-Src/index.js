// Import dotenv to load environment variables from .env file
import dotenv from "dotenv";
// Import database connection function
import connectDB from "./db/index.js";
// Import the Express app instance
import { app } from './app.js';

// Load environment variables from the .env file located at the project root
dotenv.config({
    path: './.env'
});

// Connect to MongoDB using the connectDB function
connectDB()
.then(() => {
    // Once DB is connected successfully, start the Express server
    app.listen(process.env.PORT || 8000, () => {
        // Log the port the server is running on
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
})
.catch((err) => {
    // Handle MongoDB connection errors
    console.log("MONGO db connection failed !!! ", err);
});


/*
Alternative approach using an IIFE (Immediately Invoked Function Expression) to connect and start server:

import express from "express"
const app = express()

( async () => {
    try {
        // Connect to MongoDB using mongoose
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        // Listen for any errors on the app instance
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        // Start the server on the configured port
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()
*/
