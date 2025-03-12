import React from "react";

interface headerProps {
  className?: string;
}

const Header: React.FC<headerProps> = ({ className }) => {
  return (
    <div className={["header", `${className}`].filter(Boolean).join(" ")}>
      <p className="header__title">
        HON. FERDINAND DOZIE NWANKWO CENTER FOR DEVELOPMENT AND ICT
      </p>
    </div>
  );
};

export default Header;
