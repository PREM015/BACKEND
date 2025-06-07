// Importing asyncHandler utility to manage errors in async functions without try-catch
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc    Controller to handle user registration
 * @route   POST /api/v1/users/register
 * @access  Public
 */
const registeruser = asyncHandler(async (req, res) => {
  // Placeholder response for registration endpoint
  return res.status(200).json({
    message: `User registration successful (⚙️ Server is running at port: ${process.env.PORT}) , ok`,
  });
});

// Exporting registeruser as a named export
export { registeruser };
