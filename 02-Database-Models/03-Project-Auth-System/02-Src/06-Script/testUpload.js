import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

// Explicitly configure using individual env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testFilePath = "./public/temp/test.png";

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload(testFilePath, {
      resource_type: "auto",
    });
    console.log("Upload succeeded:", result.secure_url);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

testUpload();
