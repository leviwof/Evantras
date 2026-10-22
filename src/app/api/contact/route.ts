import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    console.log("Contact Inquiry Received:", {
      name,
      email,
      phone,
      inquiryType,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. Our team will get back to you within 1-2 business days.",
    });
  } catch (error) {
    console.error("Contact inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please email hr@evantras.com directly." },
      { status: 500 }
    );
  }
}
