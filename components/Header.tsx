import React from "react";

interface headerProps {
  className?: string;
  loggedIn?: boolean;
}

const Header: React.FC<headerProps> = ({ className, loggedIn }) => {
  return (
    <div className={["header", `${className}`].filter(Boolean).join(" ")}>
      <p className="header__title">
        HON. FERDINAND DOZIE NWANKWO CENTER FOR DEVELOPMENT AND ICT
      </p>
      {loggedIn && <div className="header__user">
        <p>welcome user</p>
        <button className="font-bold">logout</button>
      </div>}
    </div>
  );
};

export default Header;
