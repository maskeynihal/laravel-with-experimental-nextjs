import { NextResponse } from "next/server";
import { getAuthUser } from "@/services/auth";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getAuthUser(request.cookies.getAll());

  console.log(user);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/middleware/dashboard",
};
