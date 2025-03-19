"use client";

// import { useStore } from "@/store";
import { buttonProps } from "@/types";
// import Loading from "./Loading";

const Button: React.FC<buttonProps> = ({
  children,
  className,
  type = "button",
  onClick,
}) => {
  // const btnLoading = useStore((state) => state.btnLoading);
  // console.log("btnLoading is ",btnLoading)
  return (
    <button
      className={[className, "button"].filter(Boolean).join(" ")}
      type={type}
      onClick={onClick}
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
