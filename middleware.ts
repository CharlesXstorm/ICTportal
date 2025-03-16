import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();
    const authHeader = request.headers.get("authorization");
    const authToken = authHeader && authHeader.split(" ")[1];

    if (authToken) {
      //verify the authToken
      const secret = new TextEncoder().encode(
        process.env.AUTH_SECRET || "fallback_SECRET"
      );
      const { payload } = await jwtVerify(authToken, secret);

      if (payload) {
        ///// Controller logic starts
        const tokenCookie = cookieStore?.get("jwt");
        const token = tokenCookie?.value;

        // Check if the user token exists & verify it
        if (token) {
          // Verify the user token
          const jwtSecret = new TextEncoder().encode(
            process.env.JWT_SECRET || "fallback_secret"
          );
          const { payload: userPayload } = await jwtVerify(token, jwtSecret);

          console.log("Decoded user token payload:", userPayload);

          if (userPayload && userPayload.id) {
            const response = NextResponse.next();
            response.headers.set("x-decoded-value", `${userPayload.id}`);
            return response;
          }
        } else {
          throw new Error("No user token found!");
        }
        ///// Controller logic ends
      }
    } else {
      throw Error("API Authorization failed");
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export const config = {
  matcher: ["/api/user/:path*", "/api/users/:path*"], // Only apply to /specific-route and its subpaths
};
