import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  location: string;
  noticePeriod: string;
  message: string;
  resumeName: string;
  resumeData?: string; // base64 or storage url
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: String, default: "Fresher" },
    location: { type: String, default: "Chennai" },
    noticePeriod: { type: String, default: "Immediate" },
    message: { type: String, default: "" },
    resumeName: { type: String, default: "No file" },
    resumeData: { type: String },
    status: { 
      type: String, 
      enum: ["New", "Reviewed", "Shortlisted", "Rejected"], 
      default: "New" 
    },
  },
  { timestamps: true }
);

export const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
