"use client"

import React from "react";
import AdminPanel from "@/components/AdminPanel";
import Header from "@/components/Header";
import { useStore } from "@/store";
import Loading from "@/components/ui/Loading";

const page = () => {
  const loading = useStore((state) => state.loading);
  return (
    <div className="register">
      {loading && (
        <Loading
          height="h-[100vh]"
          animHeight="h-[200px]"
          animWidth="w-[200px]"
          className={[loading ? "opacity-100" : "opacity-[0]"]
            .filter(Boolean)
            .join(" ")}
        />
      )}
      <Header admin loggedIn />

      <div className="register__container">
        <p className="register__title">
          Admin Panel for the ICT training program 2025
        </p>
        <AdminPanel />
      </div>
    </div>
  );
};

export default page;
