import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { 
  DEFAULT_ADMIN_EMAIL, 
  DEFAULT_ADMIN_PASSWORD, 
  verifyPassword, 
  hashPassword, 
  createSessionToken 
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    let isValid = false;
    let adminName = "Evantras Admin";

    // 1. Try checking against MongoDB if connected
    const conn = await connectToDatabase();
    if (conn) {
      let adminRecord = await Admin.findOne({ email: cleanEmail });

      // If no admin exists in database yet, seed with default admin
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0 && cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
        adminRecord = await Admin.create({
          email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
          password: hashPassword(DEFAULT_ADMIN_PASSWORD),
          name: "Evantras Master Admin",
          role: "superadmin",
        });
      }

      if (adminRecord) {
        isValid = verifyPassword(password, adminRecord.password);
        adminName = adminRecord.name;
      }
    }

    // 2. Direct fallback check if DB is offline or env-based login
    if (!isValid && cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
      if (password === DEFAULT_ADMIN_PASSWORD) {
        isValid = true;
        adminName = "Evantras Master Admin";
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = createSessionToken({ email: cleanEmail, name: adminName });

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
      user: { email: cleanEmail, name: adminName },
    });

    // Set secure HTTP-Only cookie (7 days expiry)
    response.cookies.set("evantras_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
