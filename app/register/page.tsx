import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import React from "react";

const page = () => {
  return (
    <div className="register">
      <Header loggedIn/>

      <div className="register__container">
        <p className="register__title">
          Registration portal for the ICT training program 2025
        </p>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default page;
