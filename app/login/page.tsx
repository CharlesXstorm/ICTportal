import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import Link from "@/components/ui/Link";
import React from "react";

const page = () => {
  return (
    <div className="login">
      <Header />
      <div className="signup__container flex justify-center">
        <div className="signup__container__info">
          <p className="signup__container__info__title">
            Log in to your account
          </p>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              href="/"
              type="button"
              className="cursor-pointer text-blue-600"
            >
              Sign up
            </Link>
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
