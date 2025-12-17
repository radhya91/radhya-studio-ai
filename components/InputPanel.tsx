import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, GenerationOptions } from '../types';
import ImageUploader from './ImageUploader';
import Gallery from './Gallery';

interface InputPanelProps {
  config: ModeConfig;
  isGenerating: boolean;
  onGenerate: (prompt: string, img1: File | null, img2: File | null, ratio: string, options?: GenerationOptions) => void;
  generatedImages: GeneratedImage[];
  textContent: string;
  onClear: () => void;
  onImageClick: (index: number) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ 
    config, 
    isGenerating, 
    onGenerate, 
    generatedImages, 
    textContent, 
    onClear,
    onImageClick
}) => {
  const [prompt, setPrompt] = useState('');
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // Photo Carousel Specific States
  const [carouselLighting, setCarouselLighting] = useState('softbox');
  const [carouselAngle, setCarouselAngle] = useState('eye-level');
  const [carouselFixes, setCarouselFixes] = useState({
    gravity: true,
    lensCorrection: true,
    textureBoost: true,
    colorFidelity: true,
    superSharp: false
  });

  // Photoshoot AI Specific States
  const [shootVibe, setShootVibe] = useState('luxury');
  const [shootLighting, setShootLighting] = useState('golden');
  const [shootComposition, setShootComposition] = useState('table');
  const [shootFixes, setShootFixes] = useState({
    autoShadow: true,
    colorGrade: true,
    depthMatch: true,
    smartScale: true
  });

  const hasResults = generatedImages.length > 0 || !!textContent;
  const isPhotoCarousel = config.id === AppMode.PHOTO_CAROUSEL;
  const isPhotoshoot = config.id === AppMode.PHOTOSHOOT_AI;

  useEffect(() => {
    // Reset inputs only when mode changes, not when generating
    setPrompt('');
    setImage1(null);
    setImage2(null);
    setAspectRatio('1:1');
    
    // Reset Carousel
    setCarouselLighting('softbox');
    setCarouselAngle('eye-level');
    setCarouselFixes({
        gravity: true,
        lensCorrection: true,
        textureBoost: true,
        colorFidelity: true,
        superSharp: false
    });

    // Reset Photoshoot
    setShootVibe('luxury');
    setShootLighting('golden');
    setShootComposition('table');
    setShootFixes({
        autoShadow: true,
        colorGrade: true,
        depthMatch: true,
        smartScale: true
    });

  }, [config.id]);

  const handleGenerateClick = () => {
    let options: GenerationOptions | undefined;
    
    if (isPhotoCarousel) {
        options = {
            lighting: carouselLighting,
            angle: carouselAngle,
            fixes: carouselFixes
        } as CarouselOptions;
    } else if (isPhotoshoot) {
        options = {
            vibe: shootVibe,
            lighting: shootLighting,
            composition: shootComposition,
            fixes: shootFixes
        } as PhotoshootOptions;
    }

    onGenerate(prompt, image1, image2, aspectRatio, options);
  };

  const toggleCarouselFix = (key: keyof typeof carouselFixes) => {
    setCarouselFixes(prev => ({...prev, [key]: !prev[key]}));
  };

  const toggleShootFix = (key: keyof typeof shootFixes) => {
    setShootFixes(prev => ({...prev, [key]: !prev[key]}));
  };

  const isImageOutput = !config.category.includes('AI Tools');

  return (
    <div className="flex flex-col min-h-full">
        
        {/* Workspace Container */}
        <div className="p-4 md:p-8 space-y-8">
            
            {/* 1. Header Section */}
            <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded-full">{config.category}</span>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3">{config.label}</h2>
                    </div>
                    {hasResults && (
                        <button 
                            onClick={onClear}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Clear Results"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
                <p className="text-base text-gray-500 leading-relaxed font-medium mt-3 max-w-2xl">
                    {config.description}
                </p>
            </div>

            {/* 2. Configuration Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Col: Inputs */}
                <div className="lg:col-span-12 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                         {/* Image Inputs */}
                        {(config.inputType === 'single-image' || config.inputType === 'dual-image') && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                    <ImageIcon size={14} className="text-indigo-500" />
                                    {isPhotoshoot ? 'Products & Scene' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : 'Reference Image')}
                                        imageFile={image1}
                                        onFileChange={setImage1}
                                    />
                                    {config.inputType === 'dual-image' && (
                                        <ImageUploader
                                            label={isPhotoshoot ? "Reference Style / Scene" : "Second Image"}
                                            imageFile={image2}
                                            onFileChange={setImage2}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- PHOTO CAROUSEL SPECIAL SETTINGS --- */}
                        {isPhotoCarousel && (
                            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 space-y-5">
                                <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-2">
                                    <Camera size={14} />
                                    Commercial Studio Settings
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Studio Lighting</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'softbox', label: 'Softbox', icon: <Box size={14}/> },
                                                { id: 'hard', label: 'Hard/Rim', icon: <Zap size={14}/> },
                                                { id: 'natural', label: 'Sunlight', icon: <Sun size={14}/> },
                                                { id: 'cinematic', label: 'Cinematic', icon: <Sparkles size={14}/> }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setCarouselLighting(opt.id)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                                                        carouselLighting === opt.id 
                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.icon} {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Camera Angle</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'eye-level', label: 'Eye Level' },
                                                { id: 'isometric', label: 'Isometric' },
                                                { id: 'flatlay', label: 'Top Down' },
                                                { id: 'hero', label: 'Low Hero' }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setCarouselAngle(opt.id)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                                                        carouselAngle === opt.id 
                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase">Pro Quality Fixes</label>
                                     <div className="flex flex-wrap gap-2">
                                        {[
                                            { id: 'gravity', label: 'Gravity Fix', active: carouselFixes.gravity },
                                            { id: 'lensCorrection', label: 'Lens Correction', active: carouselFixes.lensCorrection },
                                            { id: 'textureBoost', label: 'Texture Boost', active: carouselFixes.textureBoost },
                                            { id: 'colorFidelity', label: 'True Color', active: carouselFixes.colorFidelity },
                                            { id: 'superSharp', label: 'Ultra Sharp', active: carouselFixes.superSharp },
                                        ].map((fix) => (
                                            <button
                                                key={fix.id}
                                                onClick={() => toggleCarouselFix(fix.id as keyof typeof carouselFixes)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                                                    fix.active 
                                                    ? 'bg-green-100 text-green-700 border-green-200' 
                                                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-white'
                                                }`}
                                            >
                                                {fix.active ? <Crosshair size={10} /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}
                                                {fix.label}
                                            </button>
                                        ))}
                                     </div>
                                </div>
                            </div>
                        )}

                        {/* --- PHOTOSHOOT AI SPECIAL SETTINGS --- */}
                        {isPhotoshoot && (
                            <div className="bg-pink-50/50 p-5 rounded-xl border border-pink-100 space-y-5">
                                <h3 className="text-xs font-bold text-pink-700 uppercase tracking-widest flex items-center gap-2">
                                    <Camera size={14} />
                                    Lifestyle Integration Settings
                                </h3>

                                {/* Vibe & Lighting */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Scene Vibe</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'luxury', label: 'Luxury/Indoor', icon: <Armchair size={14}/> },
                                                { id: 'nature', label: 'Nature/Out', icon: <Mountain size={14}/> },
                                                { id: 'urban', label: 'Urban/Street', icon: <Building2 size={14}/> },
                                                { id: 'studio', label: 'Min. Studio', icon: <Box size={14}/> }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setShootVibe(opt.id)}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                                                        shootVibe === opt.id 
                                                        ? 'bg-pink-600 text-white border-pink-600 shadow-sm' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.icon} {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Light Match</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'golden', label: 'Golden Hour' },
                                                { id: 'daylight', label: 'Soft Daylight' },
                                                { id: 'flash', label: 'Studio Flash' },
                                                { id: 'neon', label: 'Neon/Night' }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setShootLighting(opt.id)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                                                        shootLighting === opt.id 
                                                        ? 'bg-pink-600 text-white border-pink-600 shadow-sm' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Composition & Fixes */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                     <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Composition</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'table', label: 'On Table' },
                                                { id: 'held', label: 'Held by Model' },
                                                { id: 'wear', label: 'Worn (Fashion)' },
                                                { id: 'floating', label: 'Artistic Float' }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setShootComposition(opt.id)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                                                        shootComposition === opt.id 
                                                        ? 'bg-pink-600 text-white border-pink-600 shadow-sm' 
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                         <label className="text-[10px] font-bold text-gray-500 uppercase">Smart Blending</label>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'autoShadow', label: 'Cast Shadows', active: shootFixes.autoShadow },
                                                { id: 'colorGrade', label: 'Color Grade', active: shootFixes.colorGrade },
                                                { id: 'depthMatch', label: 'Depth Blur', active: shootFixes.depthMatch },
                                                { id: 'smartScale', label: 'Smart Scale', active: shootFixes.smartScale },
                                            ].map((fix) => (
                                                <button
                                                    key={fix.id}
                                                    onClick={() => toggleShootFix(fix.id as keyof typeof shootFixes)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                                                        fix.active 
                                                        ? 'bg-purple-100 text-purple-700 border-purple-200' 
                                                        : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-white'
                                                    }`}
                                                >
                                                    {fix.active ? <Sparkles size={10} /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}
                                                    {fix.label}
                                                </button>
                                            ))}
                                         </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Prompt Input */}
                        <div className="space-y-3">
                            <label htmlFor="prompt" className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                <Type size={14} className="text-indigo-500" />
                                {config.category.includes('AI Tools') ? 'Instructions' : 'Prompt Description'}
                            </label>
                            <div className="relative group">
                                <textarea
                                    id="prompt"
                                    rows={4}
                                    className="w-full p-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none resize-none placeholder-gray-400 transition-all text-base leading-relaxed shadow-inner"
                                    placeholder={config.promptPlaceholder}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    disabled={isGenerating}
                                />
                                <div className={`absolute bottom-3 right-3 text-[10px] font-bold transition-colors ${prompt.length > 0 ? 'text-indigo-600' : 'text-gray-300'}`}>
                                    {prompt.length}
                                </div>
                            </div>
                        </div>

                        {/* Controls Row: Ratio & Button */}
                        <div className="flex flex-col md:flex-row gap-6 items-end">
                            {isImageOutput && (
                                <div className="flex-1 w-full space-y-3">
                                    <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                        <Settings2 size={14} className="text-indigo-500" />
                                        Aspect Ratio
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { id: '1:1', icon: <Square size={14} />, label: 'Square' },
                                            { id: '4:3', icon: <RectangleHorizontal size={14} className="scale-x-90" />, label: 'Std' },
                                            { id: '16:9', icon: <RectangleHorizontal size={14} />, label: 'Wide' },
                                            { id: '9:16', icon: <RectangleVertical size={14} />, label: 'Story' }
                                        ].map(ratio => (
                                            <button
                                                key={ratio.id}
                                                onClick={() => setAspectRatio(ratio.id)}
                                                disabled={isGenerating}
                                                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all border ${
                                                    aspectRatio === ratio.id
                                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                <div className="mb-1">{ratio.icon}</div>
                                                <span className="text-[9px] font-bold uppercase">{ratio.id}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="w-full md:w-auto md:min-w-[200px]">
                                <button
                                    onClick={handleGenerateClick}
                                    disabled={isGenerating}
                                    className={`w-full h-[62px] flex items-center justify-center px-6 text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                                        isGenerating
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none translate-y-0'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin mr-2" />
                                            Working...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} className="mr-2" />
                                            Generate
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Results Section (Inline) */}
            {(hasResults || isGenerating) && (
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {isGenerating ? 'Generating Results' : 'Output Result'}
                        </span>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[200px]">
                        <Gallery
                            images={generatedImages}
                            textContent={textContent}
                            onImageClick={onImageClick}
                            isLoading={isGenerating}
                        />
                    </div>
                </div>
            )}
            
            {/* Bottom Padding */}
            <div className="h-10"></div>
        </div>
    </div>
  );
};

export default InputPanel;