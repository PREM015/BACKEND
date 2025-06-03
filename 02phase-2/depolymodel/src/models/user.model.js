// Importing necessary modules
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";        // For creating JSON Web Tokens (JWT)
import bcrypt from "bcrypt";           // For hashing and comparing passwords

// Define the schema (structure) for the User model
const userSchema = new Schema(
  {
    // Unique username (stored in lowercase and trimmed)
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    // User email (must be unique, lowercase, and trimmed)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,   // NOTE: was misspelled as 'lowecase'
      trim: true,
    },

    // Full name of the user (used for display)
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    // User's profile picture URL (e.g., stored in Cloudinary)
    avatar: {
      type: String,
      required: true,
    },

    // Optional cover image URL for profile
    coverImage: {
      type: String,
    },

    // Watch history — stores references to videos the user watched
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",  // Reference to the Video model
      }
    ],

    // Hashed password
    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    // Optional refresh token for maintaining session
    refreshToken: {
      type: String,
    }
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
  }
);

// Middleware: Before saving a user, hash the password if it's modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password with bcrypt (salt rounds = 10)
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare provided password with stored (hashed) password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token (short-lived token for secure API access)
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

// Method to generate refresh token (long-lived token for session continuation)
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

// Export the User model so it can be used in other parts of the app
/*

Model name: "User"

MongoDB collection name: "users" 
This behavior can be overridden by explicitly specifying a collection name like so: */
export const User = mongoose.model("User", userSchema);
