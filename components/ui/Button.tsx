"use client";

// import { useStore } from "@/store";
import { buttonProps } from "@/types";
// import Loading from "./Loading";

const Button: React.FC<buttonProps> = ({
  children,
  className,
  type = "button",
  onClick,
  disabled
}) => {
  // const btnLoading = useStore((state) => state.btnLoading);
  // console.log("btnLoading is ",btnLoading)
  return (
    <button
      className={[className, "button", disabled?"bg-[rgb(163, 163, 163)]":"bg-[rgb(109,84,181)] text-white" ].filter(Boolean).join(" ")}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {/* {
        <Loading
          height="h-full"
          animHeight="h-[80%]"
          animWidth="w-[40px]"
          className={[btnLoading ? "opacity-100" : "opacity-[0]"]
            .filter(Boolean)
            .join(" ")}
        />
      } */}
      {children}
    </button>
  );
};

export default Button;
