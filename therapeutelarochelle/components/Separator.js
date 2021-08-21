import React from "react";

export default function Separator({ color, width, thickness }) {
  return (
    <div
      style={{
        background: color,
        width: width,
        margin: "50px auto",
        height: thickness,
      }}
    />
  );
}
