"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginData } from "@/data";
import Input from "./ui/Input";
import Button from "./ui/Button";
// import Google from "./svgs/Google";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./ui/Loading";

const LoginForm = () => {
  const [data, setData] = useState<{ [key: string]: any }>({ ...loginData });
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      setBtnLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const loginInfo = new FormData();
      // Append all fields from the `data` state to the FormData object
      Object.keys(data).forEach((key) => {
        loginInfo.append(key, data[key]);
      });
      // Send the FormData object to the API via POST request
      const response = await axios.post(`${API_URL}/login`, loginInfo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!response) {
        setBtnLoading(false);
        throw new Error("no login response received");
      }

      if (response.data.data === `${process.env.NEXT_PUBLIC_ADMIN_ID}`) {
        router.push("admin/workspace");
        setBtnLoading(false);
      } else {
        router.push("register");
        setBtnLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <form className="signup__form">
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
          id="loginPass"
          type="password"
          setData={setData}
          placeholder="Enter your password"
          autoComplete="new-password"
        />

        <Button onClick={login} className="bg-[rgb(109,84,181)]">
          {btnLoading && (
            <Loading
              height="h-full"
              animHeight="h-[80%]"
              animWidth="w-[40px]"
              className={[
                btnLoading ? "opacity-100" : "opacity-[0]",
                "absolute",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          )}
          Log in
        </Button>
        {/* <div className="signup__form__google">
          <div className="signup__form__text">
            <hr className="line" />
            <p>Or log in with</p>
            <hr className="line" />
          </div>

          <div className="signup__form__google__button">
            <Button className="border-[1px] border-white">
              <Google /> Google
            </Button>
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
