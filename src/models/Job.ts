import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  id: string;
  title: string;
  department: string;
  category: "all" | "tech" | "business" | "hr";
  location: string;
  type: string;
  experience: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["all", "tech", "business", "hr"], 
      default: "tech" 
    },
    location: { type: String, default: "Anna Nagar, Chennai" },
    type: { type: String, default: "Full-Time • On-site" },
    experience: { type: String, required: true },
    overview: { type: String, required: true },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
