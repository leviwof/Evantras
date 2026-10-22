import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { connectToDatabase, getLastMongoError } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { 
  jobRoles as initialJobs,
  getGlobalJobsStore
} from "@/data/jobs";

export async function GET(request: Request) {
  // Reading headers & request url ensures this route is always dynamically evaluated
  await headers();
  const { searchParams } = new URL(request.url);
  const categoryFilter = searchParams.get("category");

  try {
    const conn = await connectToDatabase();

    if (conn) {
      const query: any = { isActive: true };
      if (categoryFilter && categoryFilter !== "all") {
        query.category = categoryFilter;
      }

      let jobs = await Job.find(query).sort({ createdAt: -1 }).lean();

      // If empty in DB, seed with initial jobs
      if (jobs.length === 0 && !categoryFilter) {
        await Job.insertMany(
          initialJobs.map((j) => ({
            ...j,
            isActive: true,
          }))
        );
        jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 }).lean();
      }

      return NextResponse.json(
        {
          success: true,
          source: "database",
          jobs,
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0, must-revalidate",
          },
        }
      );
    }

    // Fallback to in-memory active jobs
    let activeJobs = getGlobalJobsStore().filter((j) => j.isActive !== false);
    if (categoryFilter && categoryFilter !== "all") {
      activeJobs = activeJobs.filter((j) => j.category === categoryFilter);
    }

    return NextResponse.json(
      {
        success: true,
        source: "fallback",
        dbError: getLastMongoError(),
        jobs: activeJobs,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Fetch jobs error:", error);
    let activeJobs = getGlobalJobsStore().filter((j) => j.isActive !== false);
    return NextResponse.json(
      {
        success: true,
        source: "fallback",
        dbError: getLastMongoError(),
        jobs: activeJobs,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  }
}
