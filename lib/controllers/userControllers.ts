import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { userModel as User } from "../models/userModel";
import { dataModel as Data } from "../models/dataModel";
import { NextRequest, NextResponse } from "next/server";

//error handling
const handleErrors = (err: string | string[]) => {
  //sign up
  if (err.includes("user validation")) {
    const error = { email: "", password: "", lastName: "", firstName: "" };
    if (err.includes("email")) {
      error.email = "Please enter a valid email";
      return error.email;
    }
    if (err.includes("lastName")) {
      error.lastName = "Please enter a last name";
      return error.lastName;
    }
    if (err.includes("firstName")) {
      error.firstName = "Please enter a first name";
      return error.firstName;
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

export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", {
    maxAge: 1,
  });
  return NextResponse.json(
    {
      status: "success",
      message: "logged out",
    },
    { status: 200 }
  );
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

//getUser controller
export const getUser = async (req: NextRequest, userId: any) => {
  //get user

  try {
    const user = await User.findById(userId);
    return NextResponse.json(
      { status: "success", data: user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "fail on api/user-route", message: err },
      { status: 400 }
    );
  }
};

//createUserData controller
export const createUserData = async (req: NextRequest, body: any) => {
  //create user data
  try {
    const userData = await Data.create(body);

    return NextResponse.json(
      {
        status: "success",
        data: userData,
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

//getUserData controller
export const getUserData = async (req: NextRequest, userId: any) => {
  //get user data
  try {
    console.log("get user data working");
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId provided");
    }
    const userData = await Data.findOne({
      "user._id": new mongoose.Types.ObjectId(userId as string),
    });
    return NextResponse.json(
      { status: "success", data: userData },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "fail on api/user/getUserData-route", message: err },
      { status: 400 }
    );
  }
};

//getAllUserData controller
export const getAllUserData = async () => {
  //get all user data
  try {
    const allUserData = await Data.find();
    return NextResponse.json(
      { status: "success", data: allUserData },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { status: "fail on api/user/getAllUserData-route", message: err },
      { status: 400 }
    );
  }
};
