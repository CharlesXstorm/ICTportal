import React from "react";

interface inputProps {
  id?: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<inputProps> = ({ id, type, placeholder }) => {
  return (
    <>
      <input id={id} className="input" type={type} placeholder={placeholder} />
    </>
  );
};

export default Input;
