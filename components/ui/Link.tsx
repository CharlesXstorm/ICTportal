"use client";

import React from "react";
import { buttonProps } from "@/types";
import { useRouter } from "next/navigation";

const Link: React.FC<buttonProps> = ({
  children,
  className,
  type = "button",
  href,
}) => {
  const route = useRouter();

  const navigate = () => {
    route.push(href ?? "");
  };

  return (
    <button onClick={navigate} className={className} type={type}>
      {children}
    </button>
  );
};

export default Link;
