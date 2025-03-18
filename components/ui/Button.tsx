"use client";

import { buttonProps } from "@/types";

const Button: React.FC<buttonProps> = ({
  children,
  className,
  type = "button",
  onClick
}) => {
  return (
    <button
      className={[className, "button"].filter(Boolean).join(" ")}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
