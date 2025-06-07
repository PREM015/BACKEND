// Import multer, a middleware for handling multipart/form-data (used for file uploads)
import multer from "multer";

// Define storage configuration for multer
const storage = multer.diskStorage({
    // Set the destination where files should be saved
    destination: function (req, file, cb) {
        // Files will be stored in the ./public/temp directory
        cb(null, "./public/temp");
    },

    // Define the filename for the uploaded file
    filename: function (req, file, cb) {
        // Save the file with its original name
        cb(null, file.originalname);
    }
});

// Create the multer upload middleware with the defined storage
export const upload = multer({ 
    storage, // use the custom disk storage
});
