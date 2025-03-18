"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { inputProps } from "@/types";
import { image, Svg } from "../svgs";
import { uiscript } from "@/scripts";

const Photo: React.FC<inputProps> = ({
  className,
  type,
  name,
  // setData,
  accept,
  maxFile = 1,
  maxSize = 200,
  maxWidth = 1024,
  maxHeight = 1024,
}) => {
  const [info, setInfo] = useState<any[]>([]);
  const [bgImage, setBgImage] = useState("");

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
        toast.error(res);
        // setError(res);
      } else {
        // error.length > 0 ? setError("") : null;
        setInfo((prev) => [...prev, ...res]);
      }
    }
  };
  //////////////////////////////////////////////

  useEffect(() => {
    if (info) {
      const file = info[info.length - 1];

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
        <div className="flex flex-col justify-center text-[12px]">
          <span className="text-center ">Drag & drop image(s) here or </span>
          <span className="text-center text-blue-600">browse images</span>
        </div>
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
            width: "100%",
            height: "100%",
            backgroundImage: bgImage ? bgImage : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #ddd",
          }}
          className="upload__image"
        ></div>
      </div>
    </div>
  );
};

export default Photo;
