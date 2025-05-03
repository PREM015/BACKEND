import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    departments: {
      type: [String], // e.g., ['Cardiology', 'Neurology']
      default: [],
    },
    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },
    headDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Assuming a Doctor model exists
    },
    isOperational: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);

export default Hospital;
