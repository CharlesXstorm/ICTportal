"use client";

import React from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Google from "./svgs/Google";

const SignupForm = () => {
  return (
    <form className="signup__form">
      <div className="signup__form__group">
        <Input type="text" placeholder="First name" />
        <Input type="text" placeholder="Last name" />
      </div>

      <Input type="email" placeholder="Email" />
      <Input id="loginPass" type="password" placeholder="Enter your password" />

      <Button className="bg-[rgb(109,84,181)]">Create account</Button>
      <div className="signup__form__google">
        <div className="signup__form__text">
          <hr />
          <p>Or register with</p>
          <hr />
        </div>

        <div className="signup__form__google__button">
          <Button className="border-[1px] border-white"><Google /> Google</Button>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
