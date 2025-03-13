import React from "react";

interface fileProps {
  id?: string;
  type?: string;
  name?: string;
  className?: string;
}

const File: React.FC<fileProps> = ({ id, type="file", name, className }) => {
  return (
    <div className={["photo_upload", className].filter(Boolean).join(" ")}>
      <input className="hidden" id={id} type={type} name={name} accept=".jpg, .jpeg, .png" />
    </div>
  );
};

export default File;
