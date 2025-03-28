"use client"

import React, { useEffect } from 'react'
import RegistrationForm from '../RegistrationForm';
import Header from '../Header';
import Loading from '../ui/Loading';
import { useStore } from '@/store';

const RegisterPage = () => {
    const loading = useStore((state) => state.loading);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      switch (loading) {
        case true:
          body.style.overflow = "hidden";
          return;
        case false:
          body.style.overflow = "auto";
          return;
        default:
          return;
      }
    }
  }, [loading]);

  return (
    <div className="register">
      {
        <Loading
          height="h-[100vh]"
          animHeight="h-[200px]"
          animWidth="w-[200px]"
          className={[
            loading
              ? "opacity-100 pointer-events-auto"
              : "opacity-[0] pointer-events-none",
            "fixed",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      }

      <Header loggedIn />

      <div className="register__container">
        <p className="register__title">
          Registration portal for the ICT training program 2025
        </p>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegisterPage
