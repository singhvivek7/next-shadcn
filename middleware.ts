"use server";

import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

const middleware = async (req: NextRequest) => {
  const accessToken = req.cookies.get("atk")?.value; 

  
  
  const path = req.nextUrl.pathname;
  
  const publicRoutes =
  /^\/(login|_next\/static|_next\/images|favicon\.ico)/;

  console.log("🚀 ~ middleware ~ accessToken:", accessToken)

  if(accessToken && path === "/login") {

    return NextResponse.redirect(new URL("/", req.url));
  }
  
  if (publicRoutes.test(path)) {
    return NextResponse.next();
  }
  
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  const payload = jwtDecode<JwtPayload>(accessToken);


  // Allow the request to proceed
  const response = NextResponse.next();

  return response;
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/image|favicon.ico|favicon_3.png).*)",
  ],
};

export default middleware;