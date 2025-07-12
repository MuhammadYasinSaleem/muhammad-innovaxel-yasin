import mongoose from "mongoose";

const urlSchema=new mongoose.schema(
     {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
)

const Url = mongoose.model('Url', urlSchema);

export default Url;