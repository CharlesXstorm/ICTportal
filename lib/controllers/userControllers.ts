import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel as User } from "../models/userModel";
import { NextRequest, NextResponse } from "next/server";

//error handling
const handleErrors = (err: string | string[]) => {
  //sign up
  if (err.includes("user validation")) {
    let error = { email: "", password: "" };
    if (err.includes("email")) {
      error.email = "Please enter a valid email";
      return error.email;
    }
    error.password = "Minimum of 6 characters required";
    return error.password;
  }

  if (err.includes("duplicate key")) {
    return "This account is already registered";
  }
};

// create jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: maxAge,
  });
};

//signup controller
export const signUp = async (req: NextRequest, body: any) => {
  //signUp user
  try {
    const user = await User.create(body);
    const token = createToken(user._id);

    const cookieStore = await cookies();

    cookieStore.set("jwt", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        status: "success",
        data: user._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    const error = handleErrors(err.message);

    return NextResponse.json(
      {
        status: "fail",
        message: error,
      },
      { status: 400 }
    );
  }
};

//login controller
export const logIn = async (req: NextRequest, body: any) => {
  //login user
  const { email, password } = body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user?._id);
    const cookieStore = await cookies();

    cookieStore.set("jwt", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        status: "success",
        data: user?._id,
      },
      { status: 201 }
    );
  } catch (err: any) {

    return NextResponse.json(
      {
        status: "fail",
        message: err.message,
      },
      { status: 400 }
    );
  }
};
