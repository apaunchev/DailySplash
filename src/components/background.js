import React from "react";
import PreloadImage from "react-preload-image";

export default ({ color, src }) => (
  <PreloadImage
    style={{
      zIndex: 1,
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: `${color}`
    }}
    src={src}
  />
);
