'use client';

import React, { useRef, useState } from 'react';
import { FaCamera, FaImage } from 'react-icons/fa';

interface ImageCaptureProps {
  onImageSelected: (file: File) => void;
  disabled?: boolean;
}

export default function ImageCapture({ onImageSelected, disabled }: ImageCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
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
          <button
            onClick={() => {
              setPreview(null);
              handleButtonClick();
            }}
            disabled={disabled}
            className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaCamera /> Change Photo
          </button>
        </div>
      ) : (
        <button
          onClick={handleButtonClick}
          disabled={disabled}
          className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-dashed border-gray-600 hover:border-primary transition-colors flex flex-col items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-5xl text-gray-400">
            <FaCamera />
          </div>
          <div className="text-gray-300 text-center px-4">
            <p className="font-semibold text-lg">Take a Photo of Your Chart</p>
            <p className="text-sm text-gray-400 mt-2">
              Or select an image from your gallery
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <FaImage />
            <span>Choose Image</span>
          </div>
        </button>
      )}
    </div>
  );
}
