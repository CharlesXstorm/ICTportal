import { PropsWithChildren } from "react";

export interface buttonProps extends PropsWithChildren {
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
