import React, { useState, useRef } from 'react';

const CarouselUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Tailwind CSS classes for styling
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Image</h2>
      <div className="flex flex-col items-center">
        {previewImage ? (
          <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded mb-4" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
            <p className="text-gray-500">No image selected</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="bg-green-400 cursor-pointer text-white font-bold py-2 px-4 rounded hover:bg-green-500 transition duration-300"
        >
          {selectedImage ? 'Change Image' : 'Upload Image'}
        </button>
      </div>
    </div>
  );
};

export default CarouselUpload;