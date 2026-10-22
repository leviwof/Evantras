import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Application } from "@/models/Application";
import { getGlobalApplicationsStore } from "@/data/applications";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("evantras_admin_token")?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const applications = await Application.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ success: true, applications });
    }

    const fallbackApps = getGlobalApplicationsStore();
    return NextResponse.json({ success: true, applications: fallbackApps });
  } catch (error: any) {
    console.error("Fetch applications error:", error);
    const fallbackApps = getGlobalApplicationsStore();
    return NextResponse.json({ success: true, applications: fallbackApps });
  }
}
