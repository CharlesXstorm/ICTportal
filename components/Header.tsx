"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

interface headerProps {
  className?: string;
  loggedIn?: boolean;
  admin?: boolean;
}

const Header: React.FC<headerProps> = ({
  className,
  loggedIn = false,
  admin = false,
}) => {
  const {
    userInfo,
    setUserInfo,
    userData,
    setUserData,
    adminData,
    setAdminData,
  } = useStore();
  const router = useRouter();

  const getUserInfo = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH;

      // console.log("get userData","API_AUTH",API_AUTH)
      const response = await axios.get(`${API_URL}/user`, {
        headers: { authorization: `Bearer ${API_AUTH}` },
      });

      if (!response.data.data) {
        throw new Error("no data in database");
      }
      setUserInfo(response.data.data);
      // console.log("userInfo response", response.data.data);
    } catch (err: any) {
      console.log("error", err.message);
    }
  };

  const getUserData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH;

      // console.log("get userData","API_AUTH",API_AUTH)
      const response = await axios.get(`${API_URL}/user/getData`, {
        headers: { authorization: `Bearer ${API_AUTH}` },
      });

      if (!response.data.data) {
        throw new Error("no data in database");
      }
      setUserData(response.data.data);
      // console.log("userData response", response.data.data);
    } catch (err: any) {
      console.log("error", err.message);
    }
  };

  const getAllUserData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH;

      // console.log("get userData","API_AUTH",API_AUTH)
      const response = await axios.get(`${API_URL}/getAllData`, {
        headers: { authorization: `Bearer ${API_AUTH}` },
      });

      if (!response.data.data) {
        throw new Error("no data in database for admin");
      }
      setAdminData(response.data.data);
      // console.log("AllData response", response.data.data);
    } catch (err: any) {
      console.log("error", err.message);
    }
  };

  const logout = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${API_URL}/logout`);

      if (!response) {
        throw new Error("no logout response received");
      }
      router.push("/login");
    } catch (err: any) {
      console.log("error", err.response.data.message);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      switch (loggedIn) {
        case loggedIn === admin:
          getUserInfo();
          getAllUserData();
          return;
        case true:
          getUserInfo();
          getUserData();
          return;
        default:
          console.log("default get");
          return;
      }
    }
  }, [loggedIn]);

  return (
    <div className={["header", `${className}`].filter(Boolean).join(" ")}>
      <p className="header__title">
        HON. FERDINAND DOZIE NWANKWO CENTER FOR DEVELOPMENT AND ICT
      </p>
      {loggedIn && (
        <div className="header__user">
          <p>{userInfo?.firstName}</p>
          <button onClick={logout} className="font-bold cursor-pointer">
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
