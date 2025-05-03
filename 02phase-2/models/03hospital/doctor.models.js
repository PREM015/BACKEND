import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    experience: {
      type: Number, // in years
      min: 0,
    },
    qualifications: {
      type: [String],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    schedule: [
      {
        day: {
          type: String, // e.g., "Monday"
        },
        startTime: {
          type: String, // e.g., "09:00"
        },
        endTime: {
          type: String, // e.g., "17:00"
        },
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
