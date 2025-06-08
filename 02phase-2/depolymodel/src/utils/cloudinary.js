// Import Cloudinary v2 for handling cloud uploads
import { v2 as cloudinary } from "cloudinary";

// Import fs module to interact with the local file system (for deleting temp files)
import fs from "fs";

// Configuration for Cloudinary with your credentials
// Make sure to use environment variables correctly (without quotes) — currently they are strings, which is incorrect.
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Cloudinary cloud name from your .env file
    api_key: process.env.CLOUDINARY_API_KEY,        // API key from your .env file
    api_secret: process.env.CLOUDINARY_API_SECRET   // API secret from your .env file
});

// Utility function to upload a local file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // If no file path is provided, return null
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect file type (image, video, etc.)
        });

        // File has been uploaded successfully
        // console.log("file is uploaded on cloudinary ", response.url);

        // Remove the local file after successful upload to save space
        fs.unlinkSync(localFilePath);

        // Return the Cloudinary upload response (includes public_id, URL, etc.)
        return response;

    } catch (error) {
        // If upload fails, delete the local file to clean up temporary storage
        fs.unlinkSync(localFilePath);
        
        // Return null to indicate failure
        return null;
    }
}


// Export the upload function for use in other files
export { uploadOnCloudinary };
