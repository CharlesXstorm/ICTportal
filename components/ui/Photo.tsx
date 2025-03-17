"use client";

import React, { useEffect, useState } from "react";
import { inputProps } from "@/types";
import { image, Svg } from "../svgs";
import { uiscript } from "@/scripts";

const Photo: React.FC<inputProps> = ({
  className,
  type,
  name,
  accept,
  maxFile = 1,
  maxSize = 300,
  maxWidth = 1500,
  maxHeight = 1500,
  onChange,
}) => {
  const [info, setInfo] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState("");

  console.log("photo info", info);
  console.log("error", error);
  console.log("image", bgImage);

  ///////////////processFile/////////////////
  const processFile = async (files: FileList) => {
    const res = (await uiscript.drop(
      files,
      maxFile,
      maxSize,
      maxWidth,
      maxHeight
    )) as any;
    if (res) {
      if (typeof res === "string") {
        setError(res);
      } else {
        error.length > 0 ? setError("") : null;
        if (info.length > maxFile - 1) {
          setError(`Error: number of uploads must not exceed ${maxFile}`);
          setInfo([]);
        } else {
          setInfo((prev) => [...prev, ...res]);
        }
      }
    }
  };
  //////////////////////////////////////////////

  useEffect(() => {
    if (info) {
      const file = info[0];

      if (file) {
        const reader = new FileReader();

        // Set the background image when the file is loaded
        reader.onload = () => {
          if (reader.result) {
            setBgImage(`url(${reader.result})`);
          }
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }
  }, [info]);

  return (
    <div className={["photo_upload", className].filter(Boolean).join(" ")}>
      <div
        onClick={uiscript.click}
        onDragOver={(e) => {
          e.preventDefault();
          uiscript.dragover();
        }}
        onDragLeave={uiscript.dragleave}
        onDrop={async (e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          processFile(files);
        }}
        id="uploadbox"
        className="uploadbox relative"
      >
        <div className="w-full flex justify-center pt-4">
          <Svg svg={image} width="3em" color="#666" />
        </div>
        <p className=" px-5 py-1 flex flex-wrap text-center text-[12px]">
          Drag image(s) here or{" "}
          <span className="w-full text-blue-600">browse images</span>
          {/* <span className="text-[12px]">
            You can add up to {maxFile} image, each not exceeding{" "}
            {maxSize.toString().length > 3
              ? maxSize.toString().length > 4
                ? maxSize.toString().length > 5
                  ? `${maxSize.toString().slice(0, 3)}mb`
                  : `${maxSize.toString().slice(0, 2)}mb`
                : `${maxSize.toString()[0]}mb`
              : `${maxSize}kb`}{" "}
            in size and {maxWidth} X {maxHeight} in resolution.
          </span> */}
        </p>
        <input
          id="uploadfile"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files) {
              processFile(files);
            }
          }}
          className="hidden"
          name={name}
          type={type}
          accept={accept}
        />
        <div
        style={{
            width: '100%',
            height: '100%',
            backgroundImage: bgImage ? bgImage : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid #ddd',
          }}

          className="upload__image"
        ></div>
      </div>
    </div>
  );
};

export default Photo;
