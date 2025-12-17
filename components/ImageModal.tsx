import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageModalProps {
  images: GeneratedImage[];
  initialIndex: number | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const image = useMemo(() => (currentIndex !== null ? images[currentIndex] : null), [currentIndex, images]);

  if (currentIndex === null || !image) return null;

  const totalImages = images.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalImages - 1;

  const next = () => {
    if (!isLast) setCurrentIndex((prev) => (prev !== null ? prev + 1 : null));
  };

  const prev = () => {
    if (!isFirst) setCurrentIndex((prev) => (prev !== null ? prev - 1 : null));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div 
        className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onKeyDown={handleKeyDown}
        tabIndex={0}
    >
      <div className="relative w-full h-full flex flex-col max-w-7xl">
        
        {/* Toolbar */}
        <div className="absolute top-0 right-0 z-50 flex items-center gap-2">
            <a 
                href={image.url} 
                download={`radhya-ai-${Date.now()}.png`}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
                title="Download"
            >
                <Download size={20} />
            </a>
            <button 
                onClick={onClose} 
                className="p-3 bg-white/10 hover:bg-red-500/80 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
            >
                <X size={20} />
            </button>
        </div>

        {/* Main Image Area */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4">
            <img
                src={image.url}
                alt="Full View"
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation */}
            {totalImages > 1 && (
                <>
                    <button
                        onClick={prev}
                        disabled={isFirst}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 p-4 text-white hover:text-indigo-400 transition-all ${isFirst ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-110'}`}
                    >
                        <ChevronLeft size={48} />
                    </button>
                    <button
                        onClick={next}
                        disabled={isLast}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 p-4 text-white hover:text-indigo-400 transition-all ${isLast ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:scale-110'}`}
                    >
                        <ChevronRight size={48} />
                    </button>
                </>
            )}
        </div>

        {/* Footer info */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl max-w-3xl mx-auto w-full">
            <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                    <p className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider mb-2">Prompt Details</p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                        {image.prompt}
                    </p>
                </div>
                <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                        {currentIndex + 1} / {totalImages}
                    </span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;