import React, { useState } from "react";

const ToggleBox: React.FC = () => {
  const [showBox, setShowBox] = useState(true);

  return (
    <div>
      <button onClick={() => setShowBox(!showBox)}>
        {showBox ? "hide" : "show"}
      </button>
      <div
        style={{
          backgroundColor: "yellow",
          width: "200px",
          height: "200px",
          visibility: showBox ? "visible" : "hidden",
        }}
      ></div>
    </div>
  );
};

export default ToggleBox;
