import React, { useState } from "react";
import QR_GEN from "./qr-gen";
import ImageTextExtractor from "./text"; 

const More_tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div>
      <div>
        <button onClick={() => setSelectedTool("QR")}>QR Tools</button>
        <button onClick={() => setSelectedTool("OCR")}>OCR Text</button>
      </div>
      
      <div>
        {selectedTool === "QR" && <QR_GEN />}
        {selectedTool === "OCR" && <ImageTextExtractor />}
      </div>
    </div>
  );
};

export default More_tools;