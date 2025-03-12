import React from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Google from "./svgs/Google";

const LoginForm = () => {
  return (
    <div>
      <form className="signup__form">

        <Input type="email" placeholder="Email" />
        <Input
          id="loginPass"
          type="password"
          placeholder="Enter your password"
        />

        <Button className="bg-[rgb(109,84,181)]">Log in</Button>
        <div className="signup__form__google">
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
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
