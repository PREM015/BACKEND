 
import mongoose, { Schema, Document } from "mongoose";

// message schema
export interface Message extends Document {
  content: string;
  createdat: Date;
}

const MessageScehma: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },

  createdat: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// user schema

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  verifyCodeExpiry: Date;
  isacceptmessage: boolean;
  message: Message[];
  isverified: boolean;
}

 
const Userschema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "not correct"],
  },
  password: {
    type: String,
    required: [true, "please enter the password "],
  },
  verifycode: {
    type: String,
    required: [true, "enter the code "],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "enter the code "],
  },
  isacceptmessage: {
    type: Boolean,
    default: true,
  },
  message: [MessageScehma],
  isverified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.users || mongoose.model("users", Userschema);

export default User;