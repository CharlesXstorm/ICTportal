import axios from "axios";
import { jwtVerify } from "jose";
import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyUserToken = async (token: any, pathname: string, url?: NextURL) => {
  // Verify the user token
  const jwtSecret = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_secret"
  );
  const { payload: userPayload } = await jwtVerify(token, jwtSecret);

  /////for client-route
  if (pathname === "/register" || pathname === "/admin/workspace") {
    if (pathname === "/register") {
      if (userPayload && userPayload.id) {
        const response = NextResponse.next();
        response.headers.set("x-decoded-value", `${userPayload.id}`);
        return response;
      } else {
        ///redirect
        return NextResponse.redirect(url || "/login");
      }
    }
    if (pathname === "/admin/workspace") {
      if (
        userPayload &&
        userPayload.id &&
        userPayload.id === `${process.env.ADMIN_ID}`
      ) {
        const response = NextResponse.next();
        response.headers.set("x-decoded-value", `${userPayload.id}`);
        return response;
      } else {
        ///redirect
        return NextResponse.redirect(url || "/login");
      }
    }
  }

  //////for api-route
  if (
    `/${pathname.split("/").slice(1, 3).join("/")}` === "/api/user" ||
    `/${pathname.split("/").slice(1, 3).join("/")}` === "/api/getAllData"
  ) {
    if (userPayload && userPayload.id) {
      const response = NextResponse.next();
      response.headers.set("x-decoded-value", `${userPayload.id}`);
      return response;
    }
  }
};

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();
    ////protect register and admin route
    if (pathname === "/register" || pathname === "/admin/workspace") {
      const url = request.nextUrl.clone();
      const tokenCookie = cookieStore.get("jwt");
      const token = tokenCookie?.value;
      if (token) {
        //verify token
        url.pathname = "/login";
        return await verifyUserToken(token, pathname, url);
      } else {
        ///redirect
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    ////protect selected api route
    if (
      `/${pathname.split("/").slice(1, 3).join("/")}` === "/api/user" ||
      `/${pathname.split("/").slice(1, 3).join("/")}` === "/api/getAllData"
    ) {
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
            return await verifyUserToken(token, pathname);
          } else {
            throw new Error("No user token found!");
          }
          ///// Controller logic ends
        }
      } else {
        throw Error("API Authorization failed");
      }
    }
    ////////
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}

export const config = {
  matcher: [
    "/register/:path*",
    "/admin/workspace/:path*",
    "/api/user/:path*",
    "/api/getAllData/:path*",
  ], // Only apply to /specific-route and its subpaths
};

// if (authToken) {
//   //verify the authToken
//   const secret = new TextEncoder().encode(
//     process.env.AUTH_SECRET || "fallback_SECRET"
//   );
//   const { payload } = await jwtVerify(authToken, secret);

//   if (payload) {
//     ///// Controller logic starts
//     const tokenCookie = cookieStore?.get("jwt");
//     const token = tokenCookie?.value;

//     // Check if the user token exists & verify it
//     if (token) {
//       // Verify the user token
//       const jwtSecret = new TextEncoder().encode(
//         process.env.JWT_SECRET || "fallback_secret"
//       );
//       const { payload: userPayload } = await jwtVerify(token, jwtSecret);

//       console.log("Decoded user token payload:", userPayload);

//       if (userPayload && userPayload.id) {
//         const response = NextResponse.next();
//         response.headers.set("x-decoded-value", `${userPayload.id}`);
//         return response;
//       }
//     } else {
//       throw new Error("No user token found!");
//     }
//     ///// Controller logic ends
//   }
// } else {
//   throw Error("API Authorization failed");
// }
