"use client";

import React, { useEffect, useRef, useState } from "react";

interface inputProps {
  id?: string;
  type: string;
  name?: string;
  value?: string;
  placeholder: string;
  disabled: boolean;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
}

const Date: React.FC<inputProps> = ({
  id,
  type = "date",
  name,
  value,
  placeholder,
  disabled,
  setData,
  autoComplete,
}) => {
  const [dataValue, setDataValue] = useState(value || "Date of Birth");
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    if (inputRef.current) {
      // inputRef.current.focus();
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

  useEffect(() => {
    if (value) {
      setDataValue(value);
    }
  }, [value]);

  return (
    <div className="date">
      <button
        onClick={clickHandler}
        type="button"
        disabled={disabled}
        className={[
          "date__button",
          `${dataValue === "Date of Birth" ? "text-zinc-500" : ""}`,
          `${disabled ? "text-zinc-500" : ""}`,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {dataValue}
        <span className="self-right w-[1.2em]">
          <img src="/svg/down-arrow-black.svg" alt="arrown_down" />
        </span>
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
