import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { 
  jobRoles as initialJobs,
  getGlobalJobsStore,
  addGlobalJob,
  updateGlobalJob,
  deleteGlobalJob,
  type StoredJobItem
} from "@/data/jobs";

// Middleware helper to check admin session
async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("evantras_admin_token")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// 1. GET ALL JOBS (Active + Inactive) FOR ADMIN
export async function GET() {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      let jobs = await Job.find({}).sort({ createdAt: -1 }).lean();

      // Seed if empty
      if (jobs.length === 0) {
        await Job.insertMany(
          initialJobs.map((j) => ({
            ...j,
            isActive: true,
          }))
        );
        jobs = await Job.find({}).sort({ createdAt: -1 }).lean();
      }

      return NextResponse.json({ success: true, jobs });
    }

    // Fallback in-memory store if DB not yet connected
    const fallbackJobs = getGlobalJobsStore();
    return NextResponse.json({
      success: true,
      jobs: fallbackJobs,
    });
  } catch (error: any) {
    console.error("Admin fetch jobs error:", error);
    const fallbackJobs = getGlobalJobsStore();
    return NextResponse.json({ success: true, jobs: fallbackJobs });
  }
}

// 2. CREATE A NEW JOB POSTING
export async function POST(request: Request) {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      department,
      category,
      location,
      type,
      experience,
      overview,
      responsibilities,
      qualifications,
    } = body;

    if (!title || !department || !experience || !overview) {
      return NextResponse.json(
        { error: "Title, department, experience, and overview are required." },
        { status: 400 }
      );
    }

    const cleanId =
      body.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString().slice(-4);

    const parsedResponsibilities = Array.isArray(responsibilities)
      ? responsibilities
      : typeof responsibilities === "string"
      ? responsibilities.split("\n").filter((s: string) => s.trim().length > 0)
      : [];

    const parsedQualifications = Array.isArray(qualifications)
      ? qualifications
      : typeof qualifications === "string"
      ? qualifications.split("\n").filter((s: string) => s.trim().length > 0)
      : [];

    const jobData: StoredJobItem = {
      id: cleanId,
      title,
      department,
      category: category || "tech",
      location: location || "Anna Nagar, Chennai",
      type: type || "Full-Time • On-site",
      experience,
      overview,
      responsibilities: parsedResponsibilities,
      qualifications: parsedQualifications,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    const conn = await connectToDatabase();
    if (conn) {
      const newJob = await Job.create(jobData);
      // Keep in-memory store in sync
      addGlobalJob(jobData);
      return NextResponse.json({
        success: true,
        message: "Job created and published successfully!",
        job: newJob,
      });
    }

    // Save into global in-memory store
    const created = addGlobalJob(jobData);

    return NextResponse.json({
      success: true,
      message: "Job created and published successfully!",
      job: created,
    });
  } catch (error: any) {
    console.error("Create job error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create job posting." },
      { status: 500 }
    );
  }
}

// 3. TOGGLE ACTIVE STATUS OR UPDATE JOB
export async function PUT(request: Request) {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    // Always update in-memory store
    updateGlobalJob(id, { isActive: Boolean(isActive) });

    const conn = await connectToDatabase();
    if (conn) {
      const updated = await Job.findOneAndUpdate(
        { id },
        { $set: { isActive: Boolean(isActive) } },
        { new: true }
      );

      return NextResponse.json({
        success: true,
        message: `Job ${isActive ? "activated" : "deactivated"} successfully.`,
        job: updated,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Job ${isActive ? "activated" : "deactivated"} successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update job status." }, { status: 500 });
  }
}

// 4. DELETE A JOB
export async function DELETE(request: Request) {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    // Always delete from in-memory store
    deleteGlobalJob(id);

    const conn = await connectToDatabase();
    if (conn) {
      await Job.findOneAndDelete({ id });
      return NextResponse.json({
        success: true,
        message: "Job deleted successfully.",
      });
    }

    return NextResponse.json({ success: true, message: "Job deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete job." }, { status: 500 });
  }
}
