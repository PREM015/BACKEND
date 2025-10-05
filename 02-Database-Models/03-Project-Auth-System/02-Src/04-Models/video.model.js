// Import mongoose and Schema constructor from mongoose
import mongoose, { Schema } from "mongoose";

// Import pagination plugin for aggregations
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the schema (structure) for the Video model
const videoSchema = new Schema(
  {
    // URL of the video file (usually from Cloudinary or another storage)
    videoFile: {
      type: String,
      required: true,
    },

    // URL of the video's thumbnail image
    thumbnail: {
      type: String,
      required: true,
    },

    // Title of the video
    title: {
      type: String,
      required: true,
    },

    // Description of the video
    description: {
      type: String,
      required: true,
    },

    // Duration of the video in seconds (or minutes, based on your app logic)
    duration: {
      type: Number,
      required: true,
    },

    // Number of times the video has been viewed
    views: {
      type: Number,
      default: 0,
    },

    // Whether the video is published or not
    isPublished: {
      type: Boolean,
      default: true,
    },

    // Reference to the user who uploaded the video
    owner: {
      type: Schema.Types.ObjectId, // Foreign key reference to a User document
      ref: "User",
    },
  },
  {
    // Automatically includes createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Apply the aggregation pagination plugin to the schema
videoSchema.plugin(mongooseAggregatePaginate);

// Export the Video model so it can be used elsewhere in the application
export const Video = mongoose.model("Video", videoSchema);
