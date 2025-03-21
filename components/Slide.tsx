"use client";

import Image from "next/image";
import React from "react";
import Header from "./Header";
import useIsMobile from "@/hooks/deviceCheck";
import Desktop from "./svgs/Desktop";

const Slide = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {
        <div className="slide">
          <Desktop className={[
              "object-contain scale-[1.2]",
              `${isMobile ? "hidden" : "flex"}`,
            ]
              .filter(Boolean)
              .join(" ")} />
          {/* <Image
            alt="slide1"
            src="/images/slide1.jpg"
            fill
            className={[
              "object-contain scale-[1.2]",
              `${isMobile ? "hidden" : "flex"}`,
            ]
              .filter(Boolean)
              .join(" ")}
          /> */}
          <Header className="lg:absolute top-0 lg:left-0" />
        </div>
      }
    </>
  );
};

export default Slide;
