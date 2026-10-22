import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { jobRoles as initialJobs } from "@/data/jobs";

export async function GET() {
  try {
    const conn = await connectToDatabase();

    if (conn) {
      // Check if jobs exist in DB
      let jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 }).lean();

      // If empty in DB, seed with initial jobs
      if (jobs.length === 0) {
        await Job.insertMany(
          initialJobs.map((j) => ({
            ...j,
            isActive: true,
          }))
        );
        jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 }).lean();
      }

      return NextResponse.json({
        success: true,
        source: "database",
        jobs,
      });
    }

    // Fallback to static data if DB is offline
    return NextResponse.json({
      success: true,
      source: "fallback",
      jobs: initialJobs.map((j) => ({ ...j, isActive: true })),
    });
  } catch (error: any) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json({
      success: true,
      source: "fallback",
      jobs: initialJobs.map((j) => ({ ...j, isActive: true })),
    });
  }
}
