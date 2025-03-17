import connectToDatabase from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { userModel as User } from "../../../lib/models/userModel";
import { getAllUserData } from "../../../lib/controllers/userControllers";

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log("connected to DB successfully");

      const userId = req.headers.get("x-decoded-value");

      if (!userId) {
        throw new Error("No user token found. Please login");
      }

    //   const user = await User.findById(userId);
    //   if (!user) {
    //     throw new Error("user doesn't exist");
    //   }

      const getAllUserDataRes = await getAllUserData(req);
      return getAllUserDataRes;
    } else {
      throw new Error("DB not connected");
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
