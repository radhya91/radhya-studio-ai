import React, { useState, useMemo } from 'react';
import { AlertTriangle, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import InputPanel from './components/InputPanel';
import ImageModal from './components/ImageModal';
import { AppMode, GeneratedImage, GenerationOptions } from './types';
import { MODES } from './constants';
import { generateCreativeContent } from './services/geminiService';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>(AppMode.TEXT_TO_IMAGE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [textContent, setTextContent] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeConfig = useMemo(() => MODES.find(m => m.id === activeMode) || MODES[0], [activeMode]);

  const handleModeChange = (mode: AppMode) => {
    setActiveMode(mode);
    setGeneratedImages([]);
    setTextContent('');
    setError(null);
    setIsMobileMenuOpen(false);
  };

  const handleGenerate = async (prompt: string, img1: File | null, img2: File | null, ratio: string, options?: GenerationOptions) => {
    setIsGenerating(true);
    setError(null);
    
    // Clear previous results to show loading state cleanly
    setGeneratedImages([]);
    setTextContent('');

    try {
      const response = await generateCreativeContent(activeMode, prompt, img1, img2, ratio, options);

      if (response.images.length > 0) {
        setGeneratedImages(response.images);
      } else if (response.text) {
        setTextContent(response.text);
      } else {
        setError('Generation successful, but no content was returned. Please try again.');
      }
    } catch (err) {
      console.error('Generation Error:', err);
      const errorMessage = (err && typeof err === 'object' && 'message' in err) 
        ? String(err.message) 
        : 'An unexpected error occurred while processing your request.';
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 text-gray-900 flex overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 flex-shrink-0 hidden md:block z-40 shadow-xl relative border-r border-gray-200 bg-white">
        <Sidebar activeMode={activeMode} setActiveMode={handleModeChange} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="w-80 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-200 border-r border-gray-100">
             <Sidebar activeMode={activeMode} setActiveMode={handleModeChange} />
          </div>
          <div 
            className="flex-1 bg-gray-900/20 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative bg-white md:bg-gray-50/50">
        
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-30 sticky top-0 shadow-sm">
            <div className="flex items-center gap-3">
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Menu size={24} />
                </button>
                <h1 className="font-bold text-lg text-gray-900 truncate max-w-[200px]">{activeConfig.label}</h1>
            </div>
        </div>

        {/* Single Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div className="max-w-5xl mx-auto w-full h-full">
                 <InputPanel
                    config={activeConfig}
                    isGenerating={isGenerating}
                    onGenerate={handleGenerate}
                    generatedImages={generatedImages}
                    textContent={textContent}
                    onClear={() => { setGeneratedImages([]); setTextContent(''); }}
                    onImageClick={setSelectedImageIndex}
                />
            </div>
        </div>

        {/* Error Toast */}
        {error && (
            <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl flex items-start gap-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-red-500" />
                <div className="flex-1">
                    <h4 className="font-bold text-sm">Error</h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
            </div>
        )}

      </main>

      <ImageModal
        images={generatedImages}
        initialIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
      />
    </div>
  );
};

export default App;