"use client";

import React from "react";

interface selectProps {
  id?: string;
  className?: string;
  name: string;
  options: string[];
  data?: string;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const Select: React.FC<selectProps> = ({
  id,
  className,
  name,
  options,
  setData,
}) => {
  const selectHandler = (e: any) => {
    if (setData) {
      setData((prev: any) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
    // console.log("select event", e.target.name);
  };

  return (
    <select
      onChange={selectHandler}
      className={["select", className].filter(Boolean).join(" ")}
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
