import React from "react";
import { ColorPicker, useColor } from "../node_modules/react-color-palette";
import ReactDOM from "react-dom";
import "react-color-palette/lib/css/styles.css";

export default function ColorPick() {
  const [color, setColor] = useColor("#00FF00");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Color picker</h1>
      <ColorPicker
        // width={600}
        height={400}
        color={color}
        onChange={setColor}
        // hideHSV
        // dark
      />
    </div>
  );
}

ReactDOM.render(<ColorPick />, document.getElementById("color-picker"));