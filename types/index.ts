import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type Nullable<T> = {
  [KeyWord in keyof T]?: T[KeyWord] | undefined;
};
