"use client";

import React, { useRef, useState } from "react";

interface inputProps {
  id?: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

const Date: React.FC<inputProps> = ({
  id,
  type = "date",
  name,
  value,
  placeholder,
  setData,
  autoComplete,
}) => {
  const [dataValue, setDataValue] = useState("Date of Birth");
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    if (inputRef.current) {
      // console.log("inRef is ready", inputRef)
      inputRef.current.showPicker();
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setData) {
      setDataValue(`${e.target.value}`);
      setData((prev) => {
        return { ...prev, [`${e.target.name}`]: `${e.target.value}` };
      });
    }
  };

  return (
    <div className="date">
      <button onClick={clickHandler} type="button" className="date__button">
        {dataValue}
      </button>
      <input
        ref={inputRef}
        id={id}
        className="input hidden absolute left-0 top-0"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Date;
