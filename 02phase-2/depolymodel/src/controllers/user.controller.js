// Import asyncHandler utility to wrap async route handlers
// This helps to automatically catch errors and pass them to Express error middleware,
// avoiding the need for repetitive try-catch blocks in every async controller.
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc    Controller to handle user registration requests.
 * @route   POST /api/v1/users/register
 * @access  Public - no authentication needed for registration.
 */
const registeruser = asyncHandler(async (req, res) => {
  // Currently a placeholder response indicating the server is running and
  // the registration endpoint is reachable.
  // Replace this with actual user creation and validation logic as needed.
  return res.status(200).json({
    message: `User registration successful (⚙️ Server is running at port: ${process.env.PORT}) , ok`,
  });
});

// Export the registeruser function as a named export to use it in route definitions
export { registeruser };
