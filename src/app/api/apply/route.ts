import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Application } from "@/models/Application";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const experience = String(formData.get("experience") || "Fresher").trim();
    const location = String(formData.get("location") || "Chennai").trim();
    const noticePeriod = String(formData.get("noticePeriod") || "Immediate").trim();
    const message = String(formData.get("message") || "").trim();
    const resume = formData.get("resume") as File | null;

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json(
        { error: "Please provide all required fields (Name, Email, Phone, Position)." },
        { status: 400 }
      );
    }

    let resumeBase64 = "";
    let resumeName = "No file attached";

    if (resume) {
      resumeName = resume.name;
      const buffer = await resume.arrayBuffer();
      resumeBase64 = `data:${resume.type};base64,${Buffer.from(buffer).toString("base64")}`;
    }

    // Save to MongoDB if connected
    const conn = await connectToDatabase();
    if (conn) {
      await Application.create({
        fullName,
        email,
        phone,
        position,
        experience,
        location,
        noticePeriod,
        message,
        resumeName,
        resumeData: resumeBase64,
        status: "New",
      });
    }

    console.log("Candidate Application Logged:", {
      fullName,
      email,
      phone,
      position,
      resumeName,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our HR team at hr@evantras.com will review your profile and reach out.",
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your application. Please try emailing hr@evantras.com directly." },
      { status: 500 }
    );
  }
}
