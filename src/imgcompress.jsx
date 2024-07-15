import React, { useState, useRef, useEffect } from 'react';


const Img_compress = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [originalImageSize, setOriginalImageSize] = useState(null);
  const [compressedImageSize, setCompressedImageSize] = useState(null);
  const [resolutionWidth, setResolutionWidth] = useState(800);
  const [resolutionHeight, setResolutionHeight] = useState(600);
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [saturationValue, setSaturationValue] = useState(100);
  const [hueRotateValue, setHueRotateValue] = useState(0);
  const [grayscaleActive, setGrayscaleActive] = useState(false);
  const [qualityLevel, setQualityLevel] = useState('high');
  const previewImageRef = useRef(null);

  const previewImage = (event) => {
    const file = event.target.files[0];
    setPreviewImageUrl(URL.createObjectURL(file));
    setOriginalImageSize((file.size / 1024).toFixed(2)); // Convert bytes to KB
  };

  const applyEffects = () => {
    if (previewImageRef.current) {
      previewImageRef.current.style.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%) hue-rotate(${hueRotateValue}deg) grayscale(${grayscaleActive ? 100 : 0}%)`;
    }
  };

  const compressImage = () => {
    const previewImage = new Image();
    previewImage.src = previewImageUrl;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const quality = qualityLevel === 'high' ? 0.9 : qualityLevel === 'medium' ? 0.5 : 0.1;

    previewImage.onload = () => {
      canvas.width = resolutionWidth;
      canvas.height = resolutionHeight;
      ctx.drawImage(previewImage, 0, 0, resolutionWidth, resolutionHeight);

      const compressedImageUrl = canvas.toDataURL('image/jpeg', quality);

      setPreviewImageUrl(compressedImageUrl);
      setDownloadUrl(compressedImageUrl);

      const compressedImageSize = calculateImageSize(compressedImageUrl);
      setCompressedImageSize((compressedImageSize / 1024).toFixed(2)); // Convert bytes to KB
    };
  };

  const calculateImageSize = (dataUrl) => {
    // Calculate the size of the image in bytes from the base64 string
    const head = 'data:image/jpeg;base64,';
    return dataUrl.length * (3 / 4) - head.length;
  };

  const reset = () => {
    window.location.reload(); 
  };

  useEffect(() => {
    applyEffects();
  }, [brightnessValue, saturationValue, hueRotateValue, grayscaleActive]);
  const common="text-sm font-semibold";
  const hover_ ="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  return (
    <div className="border-t-0 border-2 rounded-md border-blue-700  p-8 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Image Compressor</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <label htmlFor="imageInput" className={common}>Choose Image</label>
          <input type="file" id="imageInput" onChange={previewImage} accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="resolutionWidth" className={common}>Resolution Width</label>
          <input type="number" id="resolutionWidth" value={resolutionWidth} onChange={(e) => setResolutionWidth(e.target.value)} className={hover_} />
        </div>
        <div className="mb-4">
          <label htmlFor="resolutionHeight" className={common}>Resolution Height</label>
          <input type="number" id="resolutionHeight" value={resolutionHeight} onChange={(e) => setResolutionHeight(e.target.value)} className={hover_} />
        </div>
        <div className="mb-4">
          <label htmlFor="brightnessRange" className={common}>Brightness</label>
          <input type="range" id="brightnessRange" value={brightnessValue} onChange={(e) => setBrightnessValue(e.target.value)} min="0" max="200" step="1" className="w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="saturationRange" className={common}>Saturation</label>
          <input type="range" id="saturationRange" value={saturationValue} onChange={(e) => setSaturationValue(e.target.value)} min="0" max="200" step="1" className="w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="hueRotateRange" className={common}>Hue Rotate</label>
          <input type="range" id="hueRotateRange" value={hueRotateValue} onChange={(e) => setHueRotateValue(e.target.value)} min="0" max="360" step="1" className="w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="grayscaleToggle" className={common}>Grayscale</label>
          <input type="checkbox" id="grayscaleToggle" checked={grayscaleActive} onChange={(e) => setGrayscaleActive(e.target.checked)} className="ml-2" />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="qualityLevel" className={common}>Quality Level</label>
        <select id="qualityLevel" value={qualityLevel} onChange={(e) => setQualityLevel(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="mt-4">
        <button onClick={compressImage} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Compress Image</button>
        <button onClick={reset} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2">Reset</button>
        {downloadUrl && <a href={downloadUrl} download="compressed_image.jpg" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 ml-2">Download Image</a>}
      </div>
      {previewImageUrl && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Preview Image</h2>
          <img ref={previewImageRef} src={previewImageUrl} alt="Preview Image" className="max-w-full shadow-md rounded-lg" />
        </div>
      )}
      {originalImageSize !== null && compressedImageSize !== null && (
        <div className="mt-4">
          <p>Original Image Size: {originalImageSize} KB</p>
          <p>Compressed Image Size: {compressedImageSize} KB</p>
        </div>
      )}
    </div>
  );
};

export default Img_compress;
