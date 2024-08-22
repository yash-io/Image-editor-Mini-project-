import React, { useState } from "react";
import QR_GEN from "./qr-gen";
import ImageTextExtractor from "./text";

const More_tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolSelection = (tool) => {
    setSelectedTool(tool);
  };

  const resetTools = () => {
    setSelectedTool(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 bg-gray-800">
      {selectedTool && (
        <div className="w-full flex flex-col items-center">
          <button
            onClick={resetTools}
            className="mb-4 w-full sm:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
          >
            More Tools
          </button>
          {selectedTool === "QR" && <QR_GEN />}
          {selectedTool === "OCR" && <ImageTextExtractor />}
        </div>
      )}
      {!selectedTool && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
          <button 
            onClick={() => handleToolSelection("QR")} 
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            QR Tools
          </button>
          <button 
            onClick={() => handleToolSelection("OCR")} 
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
          >
            OCR Text
          </button>
        </div>
      )}
    </div>
  );
};

export default More_tools;