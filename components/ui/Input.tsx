import React from "react";

interface inputProps {
  id?: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
}

const Input: React.FC<inputProps> = ({ id, type, name, placeholder }) => {
  return (
    <>
      <input
        id={id}
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
