import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("get user route working!!");
    return NextResponse.json({ status: "success for user" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ status: "fail on api/user-route" }, { status: 400 });
  }
}
