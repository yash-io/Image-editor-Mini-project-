import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QR_GEN = () => {
  const [link, setLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneratedQR(link);
  };

  const downloadQRCode = () => {
    const qrCanvas = document.getElementById('qrCode');
    const pngUrl = qrCanvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-gray-600 min-h-screen flex flex-col items-center  p-4">
      <h1 className="text-white text-4xl mb-6 animate-pulse">QR-CODE GENERATOR</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-white text-xl mb-4">ENTER YOUR TEXT HERE:</h2>
        <input
          type="text"
          name="link-data"
          id="link-data"
          placeholder="Enter URL links"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="p-2 w-full mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          GENERATE QR CODE
        </button>
      </form>
      <div id="displayqr" className="mt-4">
      {generatedQR && (
          <div className="mt-4 p-4 bg-white rounded-lg">
            <QRCode id="qrCode" value={generatedQR} size={256} className="p-2 border-2 border-black bg-orange-200 rounded-md" />
            <br />
            <button
              id="download-btn"
              onClick={downloadQRCode}
              className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QR_GEN;
