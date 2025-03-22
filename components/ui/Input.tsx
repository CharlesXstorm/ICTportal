"use client";

import React, { useRef } from "react";

interface inputProps {
  id?: string;
  className: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  disabled?: boolean;
}

const Input: React.FC<inputProps> = ({
  id,
  className,
  type,
  name,
  value,
  placeholder,
  setData,
  autoComplete,
  disabled,
}) => {
  const inputRef = useRef(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setData) {
      setData((prev) => {
        return { ...prev, [`${e.target.name}`]: `${e.target.value}` };
      });
    }
  };

  //   const addHolder = (e:any) => {
  //     // console.log("on blurr")
  //  console.log("on blurr", e)
  //   };

  //   const removeHolder = () => {
  //     // console.log("on focuss")
  //   };

  return (
    <>
      <input
        ref={inputRef}
        id={id}
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
