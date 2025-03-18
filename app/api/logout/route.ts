// import connectToDatabase from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { logOut } from "../../../lib/controllers/userControllers";

export async function POST(req: NextRequest) {
  try {
    const logoutRes = await logOut(req);
    return logoutRes;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
