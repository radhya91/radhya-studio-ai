import React, { useRef, useCallback, useEffect, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  imageFile: File | null;
  onFileChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, imageFile, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileChange(files[0]);
    }
  }, [onFileChange]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className="flex-1 h-36 relative group transition-all duration-200"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInputChange}
      />
      
      {previewUrl ? (
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
          <img src={previewUrl} alt="Uploaded" className="w-full h-full object-cover" />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-start justify-end p-2">
             <button
                onClick={handleClear}
                className="bg-white text-gray-700 hover:text-red-600 rounded-full p-1.5 shadow-md hover:scale-105 transition-all transform"
                title="Remove Image"
              >
                <X size={16} />
              </button>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-100 py-1.5 px-3">
             <p className="text-gray-700 text-xs font-medium truncate flex items-center gap-1">
                <ImageIcon size={12} className="text-indigo-500"/>
                {imageFile?.name}
             </p>
          </div>
        </div>
      ) : (
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 group-hover:shadow-inner"
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
             <UploadCloud size={20} className="text-indigo-500" />
          </div>
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Click or Drag & Drop</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;