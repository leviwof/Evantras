import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  // Clear session cookie
  response.cookies.set("evantras_admin_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
