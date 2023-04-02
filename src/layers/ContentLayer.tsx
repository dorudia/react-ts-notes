import React from "react";
import { BoxProps } from "../types/types";

const ContentLayer = ({ children }: BoxProps) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentLayer;
