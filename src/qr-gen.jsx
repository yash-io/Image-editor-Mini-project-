import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QR_GEN = () => {
  const [link, setLink] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [qrResult, setQrResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(true); // State to toggle between generating and scanning
  const scannerRef = useRef(null); // Ref to store Html5QrcodeScanner instance

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneratedQR(link);
  };

  const downloadQRCode = () => {
    const qrCanvas = document.getElementById('qrCode');
    const qrCodeSize = qrCanvas.width;
    const padding = 20; // Add padding around the QR code

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = qrCodeSize + padding * 2;
    offscreenCanvas.height = qrCodeSize + padding * 2;
    const offscreenContext = offscreenCanvas.getContext('2d');

    // Fill the canvas with a white background
    offscreenContext.fillStyle = '#FFFFFF';
    offscreenContext.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Draw the QR code onto the canvas with padding
    offscreenContext.drawImage(qrCanvas, padding, padding);

    // Convert the offscreen canvas to a data URL and download it
    const pngUrl = offscreenCanvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    if (!isGenerating) {
      setTimeout(() => {
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader", { fps: 10, qrbox: 250 }
        );
        scannerRef.current.render(
          (decodedText) => {
            setQrResult(decodedText);
            // No automatic state change here
          },
          (error) => {
            console.warn("QR Code scanning failed. Reason: ", error);
          }
        );
      }, 100); // Add a slight delay before initializing the scanner
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear QR Code scanner. ", err));
        scannerRef.current = null;
      }
    }
  }, [isGenerating]);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4">
      <h1 className="text-white text-4xl mb-6 animate-pulse">QR-CODE GENERATOR AND SCANNER</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setIsGenerating(true);
            setQrResult(''); // Clear QR result when switching modes
          }}
          className={`p-2 mx-2 ${isGenerating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Generate QR Code
        </button>
        <button
          onClick={() => {
            setIsGenerating(false);
            setGeneratedQR(null); // Clear generated QR when switching modes
          }}
          className={`p-2 mx-2 ${!isGenerating ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Scan QR Code
        </button>
      </div>
      {isGenerating ? (
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <h2 className="text-white text-xl mb-4">Enter Your Text Here:</h2>
            <input
              type="text"
              name="link-data"
              id="link-data"
              placeholder="Enter URL or Text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="p-2 w-full mb-4 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Generate QR Code
            </button>
          </form>
          <div id="displayqr" className="mt-4">
            {generatedQR && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
                <QRCode
                  id="qrCode"
                  value={generatedQR}
                  size={256}
                  className="p-2 border-2 border-black bg-orange-200 rounded-md"
                />
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
      ) : (
        <div className="w-full max-w-md">
          <h2 className="text-white text-xl mb-4">QR Code Scanner</h2>
          <div id="qr-reader" className="bg-white p-4 rounded shadow-lg" style={{ width: '100%' }}></div>
          <p className="mt-2 text-white">QR Code Result: <span className="font-bold text-yellow-400">{qrResult}</span></p>
        </div>
      )}
    </div>
  );
};

export default QR_GEN;