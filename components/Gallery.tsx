import React from 'react';
import { Eye, Loader2, Copy } from 'lucide-react';
import { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
  textContent: string;
  onImageClick: (index: number) => void;
  isLoading: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ images, textContent, onImageClick, isLoading }) => {
  const renderTextContent = (text: string) => {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-900 font-bold">$1</strong>');
    html = html.replace(/###\s*(.*)/g, '<h4 class="text-lg font-bold mt-6 mb-3 text-gray-800 border-b border-gray-200 pb-1">$1</h4>');
    html = html.replace(/##\s*(.*)/g, '<h3 class="text-xl font-bold mt-8 mb-4 text-indigo-700">$1</h3>');
    html = html.replace(/^\*\s*(.*)/gm, '<li class="ml-4 list-disc marker:text-indigo-400 pl-1 mb-1.5 text-gray-700">$1</li>');
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-indigo-600 px-1 py-0.5 rounded text-sm font-mono border border-gray-200">$1</code>');
    html = html.replace(/\n/g, '<br />');
    return html;
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
        <div className="relative">
            <div className="absolute inset-0 bg-indigo-100 blur-2xl opacity-50 rounded-full animate-pulse"></div>
            <div className="bg-white p-4 rounded-2xl shadow-lg relative z-10 border border-gray-100">
                <Loader2 size={32} className="text-indigo-600 animate-spin" />
            </div>
        </div>
        <h3 className="text-base font-bold text-gray-900 mt-6">Creating your masterpiece...</h3>
        <p className="text-sm text-gray-500 mt-1">AI is analyzing and processing.</p>
      </div>
    );
  }

  if (images.length > 0) {
    // Responsive grid for inline display
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-0 w-full">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => onImageClick(index)}
            className="group relative aspect-square bg-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={image.url}
              alt={`Generated Result ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button className="bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg px-4 py-2 rounded-full font-medium text-xs flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <Eye size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (textContent) {
    return (
      <div className="w-full bg-white p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-end mb-4">
                <button 
                    onClick={() => navigator.clipboard.writeText(textContent.replace(/<[^>]*>?/gm, ''))}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"
                    title="Copy Text"
                >
                    <Copy size={14} />
                    COPY TEXT
                </button>
            </div>
            <div 
            className="prose prose-slate max-w-none text-gray-600 leading-relaxed text-base"
            dangerouslySetInnerHTML={{ __html: renderTextContent(textContent) }}
            />
        </div>
      </div>
    );
  }

  return null;
};

export default Gallery;