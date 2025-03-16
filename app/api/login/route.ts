import connectToDatabase from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { logIn } from "../../../lib/controllers/userControllers";

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log("connected to DB successfully");
      const body = await req.json();
      if (!body) {
        throw new Error("unable to parse body");
      }

      const loginRes = await logIn(req, body);
      return loginRes
    } else {
      throw new Error("DB not connected");
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
