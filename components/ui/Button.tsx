"use client";

import React, { PropsWithChildren } from "react";

interface buttonProps extends PropsWithChildren {
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<buttonProps> = ({
  children,
  className,
  type = "button",
}) => {
  return (
    <button
      className={[className, "button"].filter(Boolean).join(" ")}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
