"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signupData } from "@/data";
import Input from "./ui/Input";
import Button from "./ui/Button";
// import Google from "./svgs/Google";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./ui/Loading";

const SignupForm = () => {
  const [data, setData] = useState<{ [key: string]: any }>({ ...signupData });
  const [btnSigningUp, setBtnSigningUp] = useState(false);
  const router = useRouter();

  const signup = async () => {
    try {
      setBtnSigningUp((prev) => !prev);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const signUpInfo = new FormData();
      // Append all fields from the `data` state to the FormData object
      Object.keys(data).forEach((key) => {
        signUpInfo.append(key, data[key]);
      });
      // Send the FormData object to the API via POST request
      const response = await axios.post(`${API_URL}/signup`, signUpInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response) {
        throw new Error("no signup response received");
      }
      router.push("register");
      setBtnSigningUp((prev) => !prev);
    } catch (err: any) {
      toast.error(err.response.data.message);
      setBtnSigningUp((prev) => !prev);
      return;
    }
  };

  return (
    <form className="signup__form">
      <div className="signup__form__group">
        <Input
          name="firstName"
          className="input"
          value={data.firstName}
          type="text"
          placeholder="First name"
          setData={setData}
          autoComplete="given-name"
        />
        <Input
          name="lastName"
          className="input"
          value={data.lastName}
          type="text"
          placeholder="Last name"
          setData={setData}
          autoComplete="family-name"
        />
      </div>

      <Input
        name="email"
        className="input"
        value={data.email}
        type="email"
        placeholder="Email"
        setData={setData}
        autoComplete="email"
      />
      <Input
        name="password"
        className="input"
        value={data.password}
        id="signupPass"
        type="password"
        setData={setData}
        placeholder="Enter your password"
        autoComplete="new-password"
      />

      <Button onClick={signup} className="bg-[rgb(109,84,181)]">
        {btnSigningUp && (
          <Loading
            height="h-full"
            animHeight="h-[80%]"
            animWidth="w-[40px]"
            className={[
              btnSigningUp ? "opacity-100" : "opacity-[0]",
              "absolute",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        )}
        Create account
      </Button>
      {/* <div className="signup__form__google">
        <div className="signup__form__text">
          <hr className="line" />
          <p>Or register with</p>
          <hr className="line" />
        </div>

        <div className="signup__form__google__button">
          <Button className="border-[1px] border-white">
            <Google /> Google
          </Button>
        </div>
      </div> */}
    </form>
  );
};

export default SignupForm;
