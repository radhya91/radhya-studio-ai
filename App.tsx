import React, { useState, useMemo } from 'react';
import { AlertTriangle, Menu, ShieldAlert, X } from 'lucide-react';
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
  const [validationError, setValidationError] = useState<{title: string, message: string} | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeConfig = useMemo(() => MODES.find(m => m.id === activeMode) || MODES[0], [activeMode]);

  const handleModeChange = (mode: AppMode) => {
    setActiveMode(mode);
    setGeneratedImages([]);
    setTextContent('');
    setError(null);
    setValidationError(null);
    setIsMobileMenuOpen(false);
  };

  const handleGenerate = async (prompt: string, img1: File | null, img2: File | null, ratio: string, options?: GenerationOptions) => {
    setIsGenerating(true);
    setError(null);
    setValidationError(null);
    
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
      
      // Handle Specific Validation Errors
      if (errorMessage.includes("VALIDATION_NO_BABY_DETECTED")) {
        setValidationError({
            title: "No Baby Detected",
            message: "Our AI analysis suggests the uploaded photo does not contain a baby. For the 'Newborn Photo' feature to work correctly, please upload a photo where a baby or infant is clearly visible."
        });
      } else {
        setError(errorMessage);
      }
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

        {/* Error Toast (Generic) */}
        {error && (
            <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl flex items-start gap-3 shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-red-500" />
                <div className="flex-1">
                    <h4 className="font-bold text-sm">Error</h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                    <span className="sr-only">Close</span>
                    <X size={20} />
                </button>
            </div>
        )}

      </main>

      {/* Validation Warning Modal */}
      {validationError && (
          <div className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                  <div className="p-6 text-center space-y-4">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                          <ShieldAlert size={32} className="text-amber-600" />
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">{validationError.title}</h3>
                          <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                              {validationError.message}
                          </p>
                      </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 flex justify-center">
                      <button 
                          onClick={() => setValidationError(null)}
                          className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full sm:w-auto"
                      >
                          I Understand
                      </button>
                  </div>
              </div>
          </div>
      )}

      <ImageModal
        images={generatedImages}
        initialIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
      />
    </div>
  );
};

export default App;