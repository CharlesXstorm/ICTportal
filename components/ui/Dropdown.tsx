"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Arrow from "../svgs/Arrow";
// import Search from "../svgs/Search";
// import { inputProps } from "@/types";

interface dropdownitemsProps {
  option: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  onChange: (name: string, option: string) => void;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

interface dropdownProps {
  id: string;
  options: Array<string>;
  name: string;
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  data?: string,
  disabled?: boolean;
  searchable: boolean;
}

const DropdownItems: React.FC<dropdownitemsProps> = ({
  option,
  setTitle,
  name,
  onChange,
  setDropdown,
  setSearch,
}) => {
  const setOption = () => {
    setTitle(option);
    onChange(name, option);
    setDropdown(false);
    setSearch("");
  };
  return (
    <button
      type="button"
      onClick={setOption}
      className="dropdown__button w-full flex justify-between items-center rounded-[4px] p-1 px-4 bg-white hover:bg-orange-400"
    >
      {option}
    </button>
  );
};

const Dropdown: React.FC<dropdownProps> = ({
  id,
  options,
  name,
  setData,
  data,
  disabled,
  searchable
}) => {
  const [title, setTitle] = useState(options[0]);
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [hovered, setHovered] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const changeHandler = (title: string, option: string) => {
    setData((prev) => {
      return { ...prev, [title]: option };
    });
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clickHandler = () => {
    setDropdown((prev) => {
      if (!prev) {
        return true;
      } else {
        return false;
      }
    });
  };

  let filteredOptions =
    search.length === 0
      ? [...options]
      : options.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    return setTitle(data || options[0]);
  }, [options, data]);

  useEffect(() => {
    const focus = () => {
      if (dropdown) {
        searchRef?.current?.focus();
      } else {
        return;
      }
    };
    return focus();
  }, [dropdown]);

  return (
    <div
      className="dropdown"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        ref={btnRef}
        onClick={clickHandler}
        type="button"
        className={[
          "dropdown__button border-[1px]",
          `${title === options[0] ? "text-zinc-500" : ""}`,
          `${disabled ? "text-zinc-500" : ""}`
        ]
          .filter(Boolean)
          .join(" ")}

          disabled={disabled}
      >
        {title}
        <span
          className={[dropdown && "rotate-180", !dropdown && "rotate-0"]
            .filter(Boolean)
            .join(" ")}
        >
          <Arrow />
        </span>
      </button>

      {
        <div
          className={[
            `${!dropdown && "hidden"}`,
            `${dropdown && "flex"}`,
            "dropdown__info",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="p-1 flex w-full h-auto">
            {searchable && <input
              id={id}
              ref={searchRef}
              type="text"
              value={search}
              onChange={searchHandler}
              // onFocus={() => setDropdown(true)}
              onBlur={() => {
                if (!hovered) {
                  setDropdown(false);
                }
              }}
              placeholder="Search"
              className="border border-orange-400 rounded-[4px] p-1 w-full "
            />}
          </div>
          <div className="flex flex-col w-full flex-grow overflow-auto p-1">
            {filteredOptions.map((option, index) => (
              <DropdownItems
                key={index}
                option={option}
                setTitle={setTitle}
                name={name}
                onChange={changeHandler}
                setDropdown={setDropdown}
                setSearch={setSearch}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Dropdown;
