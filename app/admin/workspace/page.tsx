import React from "react";
import AdminPanel from "@/components/AdminPanel";
import Header from "@/components/Header";

const page = () => {
  return (
    <div className="register">
      <Header admin loggedIn/>

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
