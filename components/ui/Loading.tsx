import React from "react";

interface loadProps {
  height: string;
  animHeight: string;
  animWidth: string;
  className: string;
}

const Loading: React.FC<loadProps> = ({
  height,
  animHeight,
  animWidth,
  className
}) => {
  return (
    <div className={["load__background",className, height].filter(Boolean).join(" ")}>
      <div
        className={["load__anim", animHeight, animWidth]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="load__box"></span>
        <span className="load__box"></span>
        <span className="load__box"></span>
        <span className="load__box"></span>
      </div>
    </div>
  );
};

export default Loading;
