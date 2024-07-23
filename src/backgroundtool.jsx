import React, { useState } from 'react';

const RemoveBackground=() =>{
  const [image, setImage] = useState(null);
  const [bgRemove, setBgRemove] = useState(null);

  const handleRemoveBackground = async () => {
    const apiKey = "3HTCZrhLjjrLKjrSqTWgE4cy";
    const apiUrl = "https://api.remove.bg/v1.0/removebg";

    const formData = new FormData();
    formData.append("image_file", image, image.name);
    formData.append("size", 'auto');

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey
        },
        body: formData
      });

      const data = await res.blob();
      const imageUrl = URL.createObjectURL(data);
      setBgRemove(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  const refresh = () =>{
    window.location.reload()
};

  return (
    <div className='flex justify-center text-white min-h-screen border-2 bg-gray-700 border-blue-400 border-t-0 rounded-md '>
    <div className="container mx-auto  p-8   ">
      <div className="mb-4 pt-2 border-2 border-white bg-gray-300 rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-700 ">Background Remover Tool</h1>
      </div>
      <div className="mb-4 border-2 border-white hover:border-blue-400  p-4 rounded-md  ">
        <label htmlFor="userImg" className="block mb-2 text-sm font-medium text-white">
          Select a File
        </label>
        <input
          type="file"
          id="userImg"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <div className="flex flex-wrap justify-center items-center mb-4 space-x-4">
        {image && (
          <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-4">
            <img src={URL.createObjectURL(image)} alt="Selected" className="w-full h-auto rounded shadow-lg" />
          </div>
        )}
        {bgRemove && (
          <div className="w-1/2 md:w-1/3 lg:w-1/4 mb-4">
            <img src={bgRemove} alt="Background Removed" className="w-full h-auto rounded shadow-lg" />
          </div>
        )}
      </div>
      {bgRemove && (
        <div className="text-center mb-6">
          <a href={bgRemove} download="applied_effect.png">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Download
            </button>
          </a>
        </div>
      )}
      {!bgRemove &&
      <div className="text-center ">
        <button
          type="button"
          onClick={handleRemoveBackground}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Remove Background
        </button>
        <div className="">
        <button className="sticky mt-8 bg-green-500 p-2 rounded-md" onClick={refresh}>
                Refresh
        </button>
        </div>
      </div>
      
}
    </div>
    </div>

  );
}

export default RemoveBackground;
