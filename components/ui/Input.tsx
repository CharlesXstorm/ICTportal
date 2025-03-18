"use client";

import React, { useRef } from "react";

interface inputProps {
  id?: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

const Input: React.FC<inputProps> = ({
  id,
  type,
  name,
  value,
  placeholder,
  setData,
  autoComplete,
}) => {
  const inputRef = useRef(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setData) {
      setData((prev) => {
        return { ...prev, [`${e.target.name}`]: `${e.target.value}` };
      });
    }
  };

  const addHolder = (e:any) => {
    // console.log("on blurr")
 console.log("on blurr", e)
  };

  const removeHolder = () => {
    // console.log("on focuss")
  };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        className="input"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onFocus={() => type === "date" && removeHolder()}
        onBlur={(e) => type === "date" && addHolder(e)}
        onChange={changeHandler}
        autoComplete={autoComplete}
      />
    </>
  );
};

export default Input;
