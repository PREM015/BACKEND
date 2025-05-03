import mongoose from "mongoose";

const MedicalSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Assuming there's a Doctor model
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    symptoms: {
      type: [String],
      default: [],
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
    prescription: {
      type: [
        {
          medicineName: { type: String, required: true },
          dosage: { type: String },
          duration: { type: String },
        },
      ],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    isFollowUpRequired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Medical = mongoose.model("Medical", MedicalSchema);

export default Medical;
