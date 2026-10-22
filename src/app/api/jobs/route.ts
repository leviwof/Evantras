import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { 
  jobRoles as initialJobs,
  getGlobalJobsStore
} from "@/data/jobs";

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

    // Fallback to in-memory active jobs
    const activeJobs = getGlobalJobsStore().filter((j) => j.isActive !== false);
    return NextResponse.json({
      success: true,
      source: "fallback",
      jobs: activeJobs,
    });
  } catch (error: any) {
    console.error("Fetch jobs error:", error);
    const activeJobs = getGlobalJobsStore().filter((j) => j.isActive !== false);
    return NextResponse.json({
      success: true,
      source: "fallback",
      jobs: activeJobs,
    });
  }
}
