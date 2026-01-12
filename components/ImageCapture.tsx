'use client';

import React, { useRef, useState } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';

interface ImageCaptureProps {
  onImageSelected: (file: File) => void;
  disabled?: boolean;
}

export default function ImageCapture({ onImageSelected, disabled }: ImageCaptureProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelected(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      {preview ? (
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Chart preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => {
                setPreview(null);
              }}
              disabled={disabled}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FaCamera /> Change Photo
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-white mb-1">
              Add Your Trading Chart
            </h3>
            <p className="text-sm text-gray-400">
              Choose how you want to provide your chart image
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Take Photo Button */}
            <button
              onClick={handleCameraClick}
              disabled={disabled}
              className="bg-gradient-to-br from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              <div className="bg-white/20 p-4 rounded-full">
                <FaCamera className="text-4xl" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">Take Photo</p>
                <p className="text-sm text-blue-100 mt-1">
                  Use your camera
                </p>
              </div>
            </button>

            {/* Select from Gallery Button */}
            <button
              onClick={handleGalleryClick}
              disabled={disabled}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg p-6 flex flex-col items-center justify-center gap-3 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg border border-gray-600"
            >
              <div className="bg-white/10 p-4 rounded-full">
                <FaImage className="text-4xl" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">Choose from Gallery</p>
                <p className="text-sm text-gray-300 mt-1">
                  Select an existing image
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
