import React from "react";

interface selectProps {
  id?: string;
  className?: string;
  name: string;
  options: string[];
}

const Select: React.FC<selectProps> = ({ id, className, name, options }) => {
  return (
    <select
      className={["input", className].filter(Boolean).join(" ")}
      id={id}
      name={name}
    >
      {options.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Select;
