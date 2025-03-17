"use client";

import Image from "next/image";
import React from "react";
import Header from "./Header";
import useIsMobile from "@/hooks/deviceCheck";

const Slide = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {
        <div className="slide">
          <Image
            alt="slide1"
            src="/images/slide1.jpg"
            fill
            className={[
              "object-contain scale-[1.2]",
              `${isMobile ? "hidden" : "flex"}`,
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <Header className="lg:absolute lg:left-0" />
        </div>
      }
    </>
  );
};

export default Slide;
