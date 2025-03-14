import SignupForm from "@/components/SignupForm";
import Slide from "@/components/Slide";
import Link from "@/components/ui/Link";
import React from "react";

export default function Home() {
  return (
    <div className="signup">
      <Slide />

      <div className="signup__container flex justify-center">
        <div className="signup__container__info">
          <p className="signup__container__info__title">Create an account</p>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              type="button"
              className="cursor-pointer text-blue-600"
            >
              Log in
            </Link>
          </p>

          <SignupForm />
        </div>
      </div>
    </div>
  );
}
