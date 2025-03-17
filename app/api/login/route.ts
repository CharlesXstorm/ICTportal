import connectToDatabase from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { logIn } from "../../../lib/controllers/userControllers";

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log("connected to DB successfully");

      const formData = await req.formData();

      const email = formData.get("email");
      const password = formData.get("password");

      const body = { email, password };

      if (!body) {
        throw new Error("unable to parse body");
      }

      const loginRes = await logIn(req, body);
      return loginRes;
    } else {
      throw new Error("DB not connected");
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
