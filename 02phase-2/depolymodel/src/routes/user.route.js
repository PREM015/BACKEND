// // Import Router from Express to create modular route handlers
// import { Router } from "express";

// // Import controller functions that contain business logic for each route
// import { 
//     loginUser, 
//     logoutUser, 
//     registerUser, 
//     refreshAccessToken, 
//     changeCurrentPassword, 
//     getCurrentUser, 
//     updateUserAvatar, 
//     updateUserCoverImage, 
//     getUserChannelProfile, 
//     getWatchHistory, 
//     updateAccountDetails
// } from "../controller/user.controller.js";

// // Import middleware for file uploads using multer
// import { upload } from "../middleware/multer.middleware.js";

// // Import custom middleware to verify JWT tokens for protected routes
// import { verifyJWT } from "../middleware/auth.middleware.js";

// // Create a new Express Router instance
// const router = Router()

// // ---------------------- Public Routes ----------------------

// // Route to register a new user
// // It supports uploading an avatar and cover image during registration
// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",       // Expect 1 avatar file
//             maxCount: 1
//         }, 
//         {
//             name: "coverImage",   // Expect 1 cover image file
//             maxCount: 1
//         }
//     ]),
//     registerUser
// )

// // Route to log in a user (generates access and refresh tokens)
// router.route("/login").post(loginUser)

// // ---------------------- Protected Routes ----------------------
// // These routes require a valid JWT to access

// // Route to log out a user (clears refresh token, etc.)
// router.route("/logout").post(verifyJWT, logoutUser)

// // Route to refresh an access token using a valid refresh token
// router.route("/refresh-token").post(refreshAccessToken)

// // Route to change the current user's password
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)

// // Route to fetch the currently authenticated user's profile
// router.route("/current-user").get(verifyJWT, getCurrentUser)

// // Route to update user account details (name, email, etc.)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// // Route to update user's avatar image (single file upload)
// router.route("/avatar").patch(
//     verifyJWT,
//     upload.single("avatar"),       // Expects a file with key "avatar"
//     updateUserAvatar
// )

// // Route to update user's cover image (single file upload)
// router.route("/cover-image").patch(
//     verifyJWT,
//     upload.single("coverImage"),   // Expects a file with key "coverImage"
//     updateUserCoverImage
// )

// // Route to get another user's public channel profile by username
// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)

// // Route to get the current user's watch history
// router.route("/history").get(verifyJWT, getWatchHistory)

// // Export the configured router so it can be used in app.js
// export default router

// --- Minimal router setup ---

import { Router } from "express";  // Import Express Router for modular route management
import { registeruser } from "../controllers/user.controller.js"; // Import the registration controller

const router = Router();  // Create a new router instance

// Define POST route for user registration using the registeruser controller
router.route("/register").post(registeruser);

// Export the router instance to use in main app (e.g., app.js or index.js)
export default router;
