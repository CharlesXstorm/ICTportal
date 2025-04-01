import { PropsWithChildren } from "react";

export interface buttonProps extends PropsWithChildren {
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface inputProps {
  className?: string;
  id?: string;
  type: string;
  rows?: number;
  cols?: number;
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface inputPhotoProps {
  className?: string;
  type: string;
  name?: string;
  inputId: string;
  boxId: string;
  accept?: string;
  disabled?: boolean;
  maxFile?: number;
  maxSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  photoUrl?: string;
  setData?: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;

}

export interface svgProps {
  id?: string;
  svg: (color: string, width: string) => React.JSX.Element;
  isClicked?: boolean;
  isHovered?: boolean;
  className?: string;
  color?: string;
  width?: string;
}
