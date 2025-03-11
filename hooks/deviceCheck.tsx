import React, { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(window.innerHeight > 1300 ? true : false);
      }
    };

    const handleResize = () => {
      checkIsMobile()
    };

    window.addEventListener("resize", handleResize);

    checkIsMobile();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export default useIsMobile;
