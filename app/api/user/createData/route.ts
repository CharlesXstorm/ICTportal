import connectToDatabase from "../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { userModel as User } from "../../../../lib/models/userModel";
import { createUserData } from "../../../../lib/controllers/userControllers";
import { formatFormData } from "@/scripts";

export async function POST(req: NextRequest) {
  //get user from header, add user to existing body and call controller
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log("connected to DB successfully");

      const userId = req.headers.get("x-decoded-value");

      if (!userId) {
        throw new Error("No user token found. Please login");
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("user doesn't exist");
      }

      const formData = await req.formData();

      const body = formatFormData(formData, user);

      if (!body) {
        throw new Error("unable to format form");
      }

      if (body.gender === "Gender") {
        throw new Error("Please select a gender");
      }

      if (body.otherInfo.maritalStatus === "Marital Status") {
        throw new Error("Please select a marital status");
      }

      if (body.progInfo === "Choose Programme") {
        throw new Error("Please select a programme choice");
      }

      // return NextResponse.json({ status: body }, { status: 201 });
      const createDataRes = await createUserData(req, body);
      return createDataRes;
    } else {
      throw new Error("DB not connected");
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
