import React, { useState } from "react";

const ToggleBox: React.FC = () => {
  const [showBox, setShowBox] = useState(true);

  return (
    <div>
      <button onClick={() => setShowBox(!showBox)}>
        {showBox ? "hide" : "show"}
      </button>
      {showBox && (
        <div
          style={{
            backgroundColor: "yellow",
            width: "200px",
            height: "200px",
          }}
        ></div>
      )}
    </div>
  );
};

export default ToggleBox;
