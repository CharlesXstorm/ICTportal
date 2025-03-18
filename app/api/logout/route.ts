// import connectToDatabase from "../../../lib/mongodb";
import { NextResponse } from "next/server";
import { logOut } from "../../../lib/controllers/userControllers";

export async function POST() {
  try {
    const logoutRes = await logOut();
    return logoutRes;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
