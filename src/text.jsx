import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageTextExtractor = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const extractTextFromImage = () => {
    if (!imageUrl) return;

    setLoading(true);
    Tesseract.recognize(
      imageUrl,
      'eng',
      {
        logger: (m) => console.log(m), // Log progress if needed
      }
    ).then(({ data: { text } }) => {
      setExtractedText(text);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  };

  const reset = () => {
    setImageUrl(null);
    setExtractedText('');
    setFileInputKey(Date.now());
  };

  return (
    <div className="border-t-0 border-2 rounded-md border-blue-700 p-8 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Image Text Extractor</h1>
      <div className="mb-4">
        <label htmlFor="imageInput" className="text-sm font-semibold">Choose Image</label>
        <input
          type="file"
          id="imageInput"
          onChange={handleImageUpload}
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500"
          key={fileInputKey}
        />
      </div>
      <div className="mt-4">
        <button
          onClick={extractTextFromImage}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          disabled={!imageUrl || loading}
        >
          {loading ? 'Extracting...' : 'Extract Text'}
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
        >
          Reset
        </button>
      </div>
      {imageUrl && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Preview Image</h2>
          <img src={imageUrl} alt="Preview" className="max-w-full shadow-md rounded-lg" />
        </div>
      )}
      {extractedText && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Extracted Text</h2>
          <p className="whitespace-pre-line">{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageTextExtractor;
