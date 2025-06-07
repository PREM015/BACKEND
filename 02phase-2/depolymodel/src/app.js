// Importing required packages
import express from "express"              // Express is the framework used to build the backend server
import cors from "cors"                    // CORS middleware helps manage cross-origin requests
import cookieParser from "cookie-parser"  // Parses cookies from incoming HTTP requests

// Creating an instance of an Express app
const app = express()

// CORS configuration to allow frontend applications from different origins to access the backend
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allows requests only from this origin (set in .env file)
    credentials: true                // Allows cookies and authentication headers in requests
}))

// Middleware to parse JSON requests with a size limit of 16KB
app.use(express.json({ limit: "16kb" }))

// Middleware to parse URL-encoded form data (like form submissions)
// `extended: true` allows for rich object and array support
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Middleware to serve static files (like images, CSS, JS) from the "public" folder
app.use(express.static("public"))

// Middleware to parse cookies in the request header
app.use(cookieParser())

// ----------- Route Imports -----------
// Importing various route files (each handles a specific part of the API)
// import userRouter from './routes/user.route.js'
// import healthcheckRouter from "./routes/healthcheck.routes.js"
// import tweetRouter from "./routes/tweet.routes.js"
// import subscriptionRouter from "./routes/subscription.routes.js"
// import videoRouter from "./routes/video.routes.js"
// import commentRouter from "./routes/comment.routes.js"
// import likeRouter from "./routes/like.routes.js"
// import playlistRouter from "./routes/playlist.routes.js"
// import dashboardRouter from "./routes/dashboard.routes.js"

// ----------- Route Declarations -----------
// Defining base paths for each router
// Each path maps to a specific functionality in the application

// app.use("/api/v1/healthcheck", healthcheckRouter)     // Health check route to monitor server status
// app.use("/api/v1/users", userRouter)                  // Routes related to user registration, login, profile, etc.
// app.use("/api/v1/tweets", tweetRouter)                // Tweet posting and fetching routes
// app.use("/api/v1/subscriptions", subscriptionRouter)  // Subscription-related functionality
// app.use("/api/v1/videos", videoRouter)                // Video upload, listing, and playback routes
// app.use("/api/v1/comments", commentRouter)            // Commenting on videos/tweets
// app.use("/api/v1/likes", likeRouter)                  // Liking videos, tweets, or comments
// app.use("/api/v1/playlist", playlistRouter)           // Playlist creation and management
// app.use("/api/v1/dashboard", dashboardRouter)         // Admin/creator dashboard route

// Example: To register a user, you'd use this route:
// http://localhost:8000/api/v1/users/register

// Exporting the app so it can be used in other files (like index.js or server.js)
export { app }
