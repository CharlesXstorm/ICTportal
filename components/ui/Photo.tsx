"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { inputPhotoProps } from "@/types";
import { image, Svg } from "../svgs";
import { uiscript } from "@/scripts";
import { useStore } from "@/store";

const Photo: React.FC<inputPhotoProps> = ({
  className,
  type,
  name,
  inputId,
  boxId,
  photoUrl,
  setData,
  accept,
  maxFile = 1,
  maxSize = 200,
  maxWidth = 1024,
  maxHeight = 1024,
}) => {
  const [info, setInfo] = useState<any[]>([]);
  const [bgImage, setBgImage] = useState("");
  const { userData, disabled } = useStore();

  ///////////////processFile/////////////////
  const processFile = async (files: FileList) => {
    const res = (await uiscript.drop(
      files,
      maxFile,
      maxSize,
      maxWidth,
      maxHeight,
      inputId,
      boxId
    )) as any;
    if (res) {
      if (typeof res === "string") {
        toast.error(res);
      } else {
        setInfo((prev) => [...prev, ...res]);
      }
    }
  };
  //////////////////////////////////////////////

  useEffect(() => {
    if (userData) {
      setBgImage(`url(${photoUrl})`);
    } else {
      if (info) {
        const file = info[info.length - 1];

        if (file) {
          const reader = new FileReader();

          // Set the background image when the file is loaded
          reader.onload = () => {
            if (reader.result) {
              if (setData) {
                setData((prev) => {
                  return { ...prev, photo: reader.result };
                });
              }
              setBgImage(`url(${reader.result})`);
            }
          };

          // Read the file as a data URL
          reader.readAsDataURL(file);
        }
      }
    }
  }, [info, userData, photoUrl]);

  return (
    <div
      className={[
        "photo_upload",
        className,
        disabled ? "pointer-events-none" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        onClick={() => uiscript.click(inputId, boxId)}
        onDragOver={(e) => {
          e.preventDefault();
          uiscript.dragover(inputId, boxId);
        }}
        onDragLeave={() => uiscript.dragleave(inputId, boxId)}
        onDrop={async (e) => {
          e.preventDefault();
          const files = e.dataTransfer.files;
          processFile(files);
        }}
        // id="uploadbox"
        id={boxId}
        className="uploadbox relative"
      >
        <div className="w-full flex justify-center pt-4">
          <Svg svg={image} width="3em" color="#666" />
        </div>
        <div className="flex flex-col justify-center text-[12px]">
          {name === "photo" && (
            <>
              <span className="text-center ">
                Drag & drop image here or{" "}
              </span>
              <span className="text-center text-blue-600">browse image</span>
            </>
          )}
          {name === "payPhoto" && (
            <>
              <span className="text-center ">
                Drag & drop payment receipt image here or{" "}
              </span>
              <span className="text-center text-blue-600">browse payment receipt image</span>
            </>
          )}
        </div>
        <input
          id={inputId}
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
