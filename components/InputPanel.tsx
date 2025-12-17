import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair, Hand, Eye, Layers, Fingerprint, Baby, Heart, ShieldCheck, Moon, Microscope, ScanFace, Scale, Video, CloudRain, Wind, UserCheck, Flame, Infinity, Clapperboard, Film, Users2, Home, Shirt, UploadCloud, X, Footprints, Smile, UserPlus, Droplets, Target, ShoppingBag, History, Bandage, User, Wand2, ZoomIn, Cpu, Maximize2 } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, GenerationOptions } from '../types';
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

  // Multi-Image State for Family Mode
  const [familyImages, setFamilyImages] = useState<File[]>([]);
  const familyFileInputRef = useRef<HTMLInputElement>(null);

  // Multi-Image State for Product Mode
  const [productImages, setProductImages] = useState<File[]>([]);
  const productFileInputRef = useRef<HTMLInputElement>(null);

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
  const [shootGaze, setShootGaze] = useState('product');
  const [shootGrip, setShootGrip] = useState('soft');
  
  const [shootFixes, setShootFixes] = useState({
    autoShadow: true,
    colorGrade: true,
    depthMatch: true,
    smartScale: true,
    displacementFix: true,
    spectralReflections: true,
    caustics: false,
    grainMatch: true,
    dynamicBlur: false,
    fabricDrape: true,
    clearBranding: true
  });

  // Newborn Specific States
  const [newbornPose, setNewbornPose] = useState('wrapped');
  const [newbornSetting, setNewbornSetting] = useState('beanbag');
  const [newbornSkin, setNewbornSkin] = useState('fair');
  const [newbornState, setNewbornState] = useState('asleep');
  const [newbornFixes, setNewbornFixes] = useState({
    softSkin: true,
    safetyComposite: true,
    squishLogic: true,
    reduceRedness: true,
    propScale: true,
    softFocus: true,
    hipJointFix: true,
    diaperVolume: true,
    fabricTension: true,
    handScale: true,
    naturalHairline: true,
    umbilicalRealism: false,
    circulationColor: true,
    complexBokeh: true,
    eyeReflection: true,
    lipTexture: true
  });

  // Prewedding Specific States
  const [prewedStyle, setPrewedStyle] = useState<'cinematic' | 'documentary' | 'editorial'>('cinematic');
  const [prewedTheme, setPrewedTheme] = useState('casual');
  const [prewedTime, setPrewedTime] = useState('golden-hour');
  const [prewedShot, setPrewedShot] = useState('wide');
  const [prewedFixes, setPrewedFixes] = useState({
    handContact: true,
    eyeContact: true,
    heightLogic: true,
    kissPhysics: true,
    ringDetail: true,
    windConsistency: true,
    fabricTexture: true,
    dressFlow: true,
    veilTransparency: true,
    groundContact: true,
    shadowSync: true,
    horizonFix: true,
    waterReflection: true,
    weatherInteraction: true,
    goldenHourRealism: true,
    skinToneMatch: true,
    depthPlane: true,
    filmGrain: true,
    dynamicFraming: true,
    colorHarmony: true,
    candidMoment: true,
    motionBlurArt: false,
    rawImperfection: true,
    flashPhotography: false
  });

  // Family Specific States
  const [familyType, setFamilyType] = useState<'nuclear' | 'big-family' | 'multi-gen'>('nuclear');
  const [familySetting, setFamilySetting] = useState('studio');
  const [familyOutfit, setFamilyOutfit] = useState('white-jeans');
  const [familyFixes, setFamilyFixes] = useState({
    faceFidelityBackRow: true,
    heightSorting: true,
    eyeContactSync: true,
    uniformLighting: true,
    generationLogic: true,
    rowDepthLogic: true,
    twinEffectFix: true,
    headSizeConsistency: true,
    teethRealism: true,
    handCountLogic: true,
    lazyEyeFix: true,
    hoverHandFix: true,
    postureSlouchFix: true,
    kidInteraction: true,
    chairLogic: true,
    footGrounding: true,
    shoeConsistency: true,
    patternClashFix: true,
    jewelryHallucination: true,
    glassesGlareFix: true,
    fabricDrapeSitting: true,
    shadowConsistency: true,
    backgroundSeparation: true,
    floorTexture: true,
    atmosphereAiry: true,
    proportionLogic: true
  });

  // Product Specific States (New - 30 Fixes)
  const [prodMaterial, setProdMaterial] = useState('glass');
  const [prodLight, setProdLight] = useState('softbox');
  const [prodPlace, setProdPlace] = useState('podium');
  const [productFixes, setProductFixes] = useState({
    // Group 1
    gravityFix: true,
    perspectiveCorrect: true,
    scaleLogic: true,
    surfaceContact: true,
    lensDistortionFix: true,
    symmetryLock: true,
    // Group 2
    glassCaustics: true,
    metalAnisotropy: true,
    liquidRefraction: true,
    plasticSubsurface: true,
    fabricWeave: true,
    condensationDrops: false,
    // Group 3
    rimLighting: true,
    softboxSimulation: true,
    hardSunlight: false,
    reflectionContinuity: true,
    ambientOcclusion: true,
    globalIllumination: true,
    // Group 4
    logoPreservation: true,
    colorAccuracy: true,
    labelFlatness: true,
    negativeSpace: false,
    noHallucinations: true,
    cleanEdges: true,
    // Group 5
    goldenRatio: true,
    bokehControl: true,
    heroAngle: true,
    minimalistZen: true,
    colorGrading: true,
    sharpFocusStack: true
  });

  // Recovery Specific States
  const [recDamage, setRecDamage] = useState('medium');
  const [recColor, setRecColor] = useState('auto');
  const [recStrength, setRecStrength] = useState('high');
  const [recFixes, setRecFixes] = useState({
    scratchKiller: true,
    tearPatching: true,
    dustSpeckle: true,
    waterDamage: false,
    tapeMark: false,
    faceIdentityLock: true,
    irisClarity: true,
    naturalTeeth: true,
    hairTexture: true,
    earStructure: true,
    deepColorization: false,
    sepiaNeutralizer: false,
    fadedInk: true,
    skinToneBalance: true,
    redEyeFix: false,
    motionBlur: true,
    softFocus: true,
    isoGrain: true,
    jpegArtifacts: true,
    textureUpscale: true,
  });

  // Detailing Specific States (New - 25 Fixes)
  const [detRes, setDetRes] = useState('4k');
  const [detCreative, setDetCreative] = useState('faithful');
  const [detSharp, setDetSharp] = useState('natural');
  const [detFixes, setDetFixes] = useState({
    poreSynthesis: true,
    irisPattern: true,
    hairStrandSeparation: true,
    nailTexture: true,
    wrinkleDepth: true,
    fabricWeaveMicro: true,
    leatherGrain: true,
    metalBrushing: true,
    woodVeins: true,
    paperRoughness: true,
    foliageVeins: true,
    brickMortar: true,
    asphaltGrain: true,
    waterRipples: true,
    cloudVolume: true,
    chromaticAberrationFix: true,
    cornerSharpness: true,
    sensorNoiseRemoval: true,
    dynamicRangeBoost: true,
    whiteBalanceAuto: true,
    textRestoration: true,
    straightLines: true,
    geometricPatternFix: true,
    silhouetteClean: true,
    noArtifacts: true,
  });

  const hasResults = generatedImages.length > 0 || !!textContent;
  const isPhotoCarousel = config.id === AppMode.PHOTO_CAROUSEL;
  const isPhotoshoot = config.id === AppMode.PHOTOSHOOT_AI;
  const isNewborn = config.id === AppMode.NEWBORN;
  const isPrewedding = config.id === AppMode.PREWEDDING;
  const isFamily = config.id === AppMode.FAMILY;
  const isProduct = config.id === AppMode.PRODUCT;
  const isRecovery = config.id === AppMode.RECOVERY;
  const isDetailing = config.id === AppMode.DETAILING;

  useEffect(() => {
    // Reset inputs only when mode changes, not when generating
    setPrompt('');
    setImage1(null);
    setImage2(null);
    setFamilyImages([]);
    setProductImages([]);
    setAspectRatio('1:1');
    
    // Reset specific states based on mode
    setPrewedStyle('cinematic');
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
            modelGaze: shootGaze,
            gripType: shootGrip,
            fixes: shootFixes
        } as PhotoshootOptions;
    } else if (isNewborn) {
        options = {
            pose: newbornPose,
            setting: newbornSetting,
            skinTone: newbornSkin,
            state: newbornState,
            fixes: newbornFixes
        } as NewbornOptions;
    } else if (isPrewedding) {
        options = {
            visualStyle: prewedStyle,
            theme: prewedTheme,
            timeOfDay: prewedTime,
            shotType: prewedShot,
            fixes: prewedFixes
        } as PreweddingOptions;
    } else if (isFamily) {
        options = {
            familyType: familyType,
            setting: familySetting,
            outfitStyle: familyOutfit,
            files: familyImages,
            fixes: familyFixes
        } as FamilyOptions;
    } else if (isProduct) {
        options = {
            materialType: prodMaterial,
            lightingStyle: prodLight,
            placement: prodPlace,
            files: productImages,
            fixes: productFixes
        } as ProductOptions;
    } else if (isRecovery) {
        options = {
            damageLevel: recDamage,
            colorMode: recColor,
            enhanceStrength: recStrength,
            fixes: recFixes
        } as RecoveryOptions;
    } else if (isDetailing) {
        options = {
            resolutionTarget: detRes,
            creativityLevel: detCreative,
            sharpnessMode: detSharp,
            fixes: detFixes
        } as DetailingOptions;
    }

    onGenerate(prompt, image1, image2, aspectRatio, options);
  };

  // Toggle Handlers
  const toggleCarouselFix = (key: keyof typeof carouselFixes) => setCarouselFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleShootFix = (key: keyof typeof shootFixes) => setShootFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleNewbornFix = (key: keyof typeof newbornFixes) => setNewbornFixes(prev => ({...prev, [key]: !prev[key]}));
  const togglePrewedFix = (key: keyof typeof prewedFixes) => setPrewedFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleFamilyFix = (key: keyof typeof familyFixes) => setFamilyFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleProductFix = (key: keyof typeof productFixes) => setProductFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleRecFix = (key: keyof typeof recFixes) => setRecFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleDetFix = (key: keyof typeof detFixes) => setDetFixes(prev => ({...prev, [key]: !prev[key]}));

  // Multi-Image Handler for Family
  const handleFamilyFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        // Limit to 25
        setFamilyImages(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 25);
        });
    }
  };

  const removeFamilyImage = (index: number) => {
    setFamilyImages(prev => prev.filter((_, i) => i !== index));
  };

  // Multi-Image Handler for Product (Max 5)
  const handleProductFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        // Limit to 5
        setProductImages(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 5);
        });
    }
  };

  const removeProductImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
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
                         {/* Standard Image Inputs (hidden for Multi-Upload Modes: Family & Product) */}
                        {!isFamily && !isProduct && (config.inputType === 'single-image' || config.inputType === 'dual-image') && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                    <ImageIcon size={14} className="text-indigo-500" />
                                    {isPhotoshoot ? 'Product Reference' : (isRecovery || isDetailing) ? 'Input Photo' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : (isRecovery || isDetailing) ? 'Original Photo' : 'Reference Image')}
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

                        {/* --- RECOVERY MODE UI --- */}
                        {isRecovery && (
                             <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200/50 space-y-5">
                                {/* ... existing recovery UI ... */}
                                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2">
                                    <History size={14} />
                                    Restoration Lab (Advanced)
                                </h3>

                                {/* Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Bandage size={10} /> Damage Level</label>
                                        <select value={recDamage} onChange={(e) => setRecDamage(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="light">Light (Blur/Dust)</option>
                                            <option value="medium">Medium (Scratches/Fading)</option>
                                            <option value="heavy">Heavy (Tears/Missing Parts)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Palette size={10} /> Color Mode</label>
                                        <select value={recColor} onChange={(e) => setRecColor(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="none">Keep Original Tone</option>
                                            <option value="auto">Auto Colorize</option>
                                            <option value="vibrant">Vibrant / Modern</option>
                                            <option value="bw">Restore B&W Only</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Wand2 size={10} /> Enhance Strength</label>
                                        <select value={recStrength} onChange={(e) => setRecStrength(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="balanced">Balanced</option>
                                            <option value="high">High (Max Detail)</option>
                                            <option value="creative">Creative (Fill Missing)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 20 Blind Spots - Grouped */}
                                <div className="space-y-4 pt-2 border-t border-amber-200/50">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <ShieldCheck size={12} />
                                        Specific Restoration Fixes (20 Points)
                                     </label>

                                     {/* Group 1: Surface */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1"><Bandage size={10} /> Surface Repair</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'scratchKiller', label: 'Scratch Killer', active: recFixes.scratchKiller },
                                                { id: 'tearPatching', label: 'Tear Patching', active: recFixes.tearPatching },
                                                { id: 'dustSpeckle', label: 'Dust Clean', active: recFixes.dustSpeckle },
                                                { id: 'waterDamage', label: 'Water Stain Fix', active: recFixes.waterDamage },
                                                { id: 'tapeMark', label: 'Tape Removal', active: recFixes.tapeMark },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRecFix(fix.id as keyof typeof recFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 2: Face */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1"><User size={10} /> Face & Identity</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'faceIdentityLock', label: 'Identity Lock', active: recFixes.faceIdentityLock },
                                                { id: 'irisClarity', label: 'Iris Clarity', active: recFixes.irisClarity },
                                                { id: 'naturalTeeth', label: 'Natural Teeth', active: recFixes.naturalTeeth },
                                                { id: 'hairTexture', label: 'Hair Texture', active: recFixes.hairTexture },
                                                { id: 'earStructure', label: 'Ear Structure', active: recFixes.earStructure },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRecFix(fix.id as keyof typeof recFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 3: Color */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1"><Palette size={10} /> Color Science</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'deepColorization', label: 'Deep Colorize', active: recFixes.deepColorization },
                                                { id: 'sepiaNeutralizer', label: 'Sepia Fix', active: recFixes.sepiaNeutralizer },
                                                { id: 'fadedInk', label: 'Ink Boost', active: recFixes.fadedInk },
                                                { id: 'skinToneBalance', label: 'Skin Tone Fix', active: recFixes.skinToneBalance },
                                                { id: 'redEyeFix', label: 'Red Eye Fix', active: recFixes.redEyeFix },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRecFix(fix.id as keyof typeof recFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 4: Digital */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1"><Aperture size={10} /> Digital Quality</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'motionBlur', label: 'Anti-Shake', active: recFixes.motionBlur },
                                                { id: 'softFocus', label: 'Sharpen Focus', active: recFixes.softFocus },
                                                { id: 'isoGrain', label: 'De-Noise', active: recFixes.isoGrain },
                                                { id: 'jpegArtifacts', label: 'JPEG Cleaner', active: recFixes.jpegArtifacts },
                                                { id: 'textureUpscale', label: '4K Texture', active: recFixes.textureUpscale },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRecFix(fix.id as keyof typeof recFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>
                                </div>
                             </div>
                        )}

                        {/* --- DETAILING MODE UI (NEW - 25 FIXES) --- */}
                        {isDetailing && (
                             <div className="bg-cyan-50/50 p-5 rounded-xl border border-cyan-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-cyan-800 uppercase tracking-widest flex items-center gap-2">
                                    <ZoomIn size={14} />
                                    Ultra-HD Upscaling Engine
                                </h3>

                                {/* Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Maximize2 size={10} /> Target Resolution</label>
                                        <select value={detRes} onChange={(e) => setDetRes(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="2k">2K (High Res)</option>
                                            <option value="4k">4K (Ultra HD)</option>
                                            <option value="8k">8K (Print Quality)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Cpu size={10} /> AI Creativity</label>
                                        <select value={detCreative} onChange={(e) => setDetCreative(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="faithful">Faithful (Denoise/Sharpen Only)</option>
                                            <option value="balanced">Balanced (Enhance Texture)</option>
                                            <option value="creative">Creative (Hallucinate Detail)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Aperture size={10} /> Sharpness Mode</label>
                                        <select value={detSharp} onChange={(e) => setDetSharp(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="soft">Soft / Cinematic</option>
                                            <option value="natural">Natural / Photographic</option>
                                            <option value="razor">Razor Sharp / Digital</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 25 Blind Spots - Grouped */}
                                <div className="space-y-4 pt-2 border-t border-cyan-200/50">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <ShieldCheck size={12} />
                                        Specific Enhancement Fixes (25 Points)
                                     </label>

                                     {/* Group 1: Skin & Bio */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-cyan-700 uppercase tracking-widest flex items-center gap-1"><User size={10} /> Skin & Biological</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'poreSynthesis', label: 'Pore Synthesis', active: detFixes.poreSynthesis },
                                                { id: 'irisPattern', label: 'Iris Pattern', active: detFixes.irisPattern },
                                                { id: 'hairStrandSeparation', label: 'Hair Strands', active: detFixes.hairStrandSeparation },
                                                { id: 'nailTexture', label: 'Nail Detail', active: detFixes.nailTexture },
                                                { id: 'wrinkleDepth', label: 'Realistic Age', active: detFixes.wrinkleDepth },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleDetFix(fix.id as keyof typeof detFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 2: Texture */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-cyan-700 uppercase tracking-widest flex items-center gap-1"><Layers size={10} /> Material & Fabric</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'fabricWeaveMicro', label: 'Fabric Weave', active: detFixes.fabricWeaveMicro },
                                                { id: 'leatherGrain', label: 'Leather Grain', active: detFixes.leatherGrain },
                                                { id: 'metalBrushing', label: 'Metal Brush', active: detFixes.metalBrushing },
                                                { id: 'woodVeins', label: 'Wood Veins', active: detFixes.woodVeins },
                                                { id: 'paperRoughness', label: 'Paper Texture', active: detFixes.paperRoughness },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleDetFix(fix.id as keyof typeof detFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 3: Env */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-cyan-700 uppercase tracking-widest flex items-center gap-1"><Mountain size={10} /> Environment</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'foliageVeins', label: 'Leaf Veins', active: detFixes.foliageVeins },
                                                { id: 'brickMortar', label: 'Brick/Stone', active: detFixes.brickMortar },
                                                { id: 'asphaltGrain', label: 'Road Grain', active: detFixes.asphaltGrain },
                                                { id: 'waterRipples', label: 'Water Ripples', active: detFixes.waterRipples },
                                                { id: 'cloudVolume', label: 'Cloud Volume', active: detFixes.cloudVolume },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleDetFix(fix.id as keyof typeof detFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-teal-100 text-teal-800 border-teal-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 4: Optical */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-cyan-700 uppercase tracking-widest flex items-center gap-1"><Aperture size={10} /> Optical Physics</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'chromaticAberrationFix', label: 'Remove CA', active: detFixes.chromaticAberrationFix },
                                                { id: 'cornerSharpness', label: 'Corner Sharpness', active: detFixes.cornerSharpness },
                                                { id: 'sensorNoiseRemoval', label: 'De-Noise', active: detFixes.sensorNoiseRemoval },
                                                { id: 'dynamicRangeBoost', label: 'HDR Boost', active: detFixes.dynamicRangeBoost },
                                                { id: 'whiteBalanceAuto', label: 'Auto White Balance', active: detFixes.whiteBalanceAuto },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleDetFix(fix.id as keyof typeof detFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 5: Text & Geom */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-cyan-700 uppercase tracking-widest flex items-center gap-1"><Type size={10} /> Text & Geometry</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'textRestoration', label: 'Text Fix', active: detFixes.textRestoration },
                                                { id: 'straightLines', label: 'Straight Lines', active: detFixes.straightLines },
                                                { id: 'geometricPatternFix', label: 'Pattern Fix', active: detFixes.geometricPatternFix },
                                                { id: 'silhouetteClean', label: 'Clean Edge', active: detFixes.silhouetteClean },
                                                { id: 'noArtifacts', label: 'No Artifacts', active: detFixes.noArtifacts },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleDetFix(fix.id as keyof typeof detFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-slate-200 text-slate-800 border-slate-400' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>
                                </div>
                             </div>
                        )}

                        {/* --- PRODUCT MODE UI (NEW - 30 FIXES + 5 IMAGES) --- */}
                        {isProduct && (
                             <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-5">
                                {/* ... existing product UI ... */}
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                                    <ShoppingBag size={14} />
                                    Commercial Product Engine
                                </h3>

                                {/* Multi-Image Upload Section for Product */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center justify-between">
                                        <span className="flex items-center gap-2"><ImageIcon size={12} /> Product Angles / Details</span>
                                        <span className="text-slate-600">{productImages.length} / 5 Photos</span>
                                    </label>
                                    
                                    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                                        {/* Upload Button */}
                                        <div 
                                            onClick={() => productFileInputRef.current?.click()}
                                            className="aspect-square border-2 border-dashed border-slate-300 bg-slate-100 hover:bg-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors"
                                        >
                                            <UploadCloud size={20} className="text-slate-500 mb-1" />
                                            <span className="text-[9px] font-bold text-slate-600">ADD</span>
                                            <input 
                                                type="file" 
                                                ref={productFileInputRef} 
                                                className="hidden" 
                                                multiple 
                                                accept="image/*" 
                                                onChange={handleProductFiles}
                                            />
                                        </div>

                                        {/* Image Previews */}
                                        {productImages.map((file, idx) => (
                                            <div key={idx} className="relative aspect-square group">
                                                <img 
                                                    src={URL.createObjectURL(file)} 
                                                    alt="ref" 
                                                    className="w-full h-full object-cover rounded-xl border border-gray-200" 
                                                />
                                                <button 
                                                    onClick={() => removeProductImage(idx)}
                                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Box size={10} /> Main Material</label>
                                        <select value={prodMaterial} onChange={(e) => setProdMaterial(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="glass">Glass / Transparent</option>
                                            <option value="metal">Metal / Reflective</option>
                                            <option value="plastic">Plastic / Matte</option>
                                            <option value="fabric">Fabric / Texture</option>
                                            <option value="leather">Leather / Organic</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Sun size={10} /> Lighting Style</label>
                                        <select value={prodLight} onChange={(e) => setProdLight(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="softbox">Studio Softbox (Clean)</option>
                                            <option value="hard">Hard Sunlight (Trendy)</option>
                                            <option value="neon">Neon / Cyberpunk</option>
                                            <option value="rim">Dark Rim Light (Luxury)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Target size={10} /> Placement</label>
                                        <select value={prodPlace} onChange={(e) => setProdPlace(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="podium">Geometric Podium</option>
                                            <option value="surface">Flat Surface</option>
                                            <option value="floating">Floating / Levitating</option>
                                            <option value="water">In Water / Splash</option>
                                            <option value="nature">Nature / Rock</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 30 Blind Spots - Grouped */}
                                <div className="space-y-4 pt-2 border-t border-slate-200/50">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <ShieldCheck size={12} />
                                        Pro-Commercial Fixes (30 Points)
                                     </label>

                                     {/* Group 1: Physics */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Scale size={10} /> Physics & Structure</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'gravityFix', label: 'Gravity Lock', active: productFixes.gravityFix },
                                                { id: 'perspectiveCorrect', label: 'Perspective Fix', active: productFixes.perspectiveCorrect },
                                                { id: 'scaleLogic', label: 'Real Scale', active: productFixes.scaleLogic },
                                                { id: 'surfaceContact', label: 'Contact Shadows', active: productFixes.surfaceContact },
                                                { id: 'lensDistortionFix', label: 'No Fish-Eye', active: productFixes.lensDistortionFix },
                                                { id: 'symmetryLock', label: 'Symmetry Lock', active: productFixes.symmetryLock },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleProductFix(fix.id as keyof typeof productFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 2: Material */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Layers size={10} /> Material & Texture</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'glassCaustics', label: 'Glass Caustics', active: productFixes.glassCaustics },
                                                { id: 'metalAnisotropy', label: 'Brushed Metal', active: productFixes.metalAnisotropy },
                                                { id: 'liquidRefraction', label: 'Liquid Physics', active: productFixes.liquidRefraction },
                                                { id: 'plasticSubsurface', label: 'Plastic SSS', active: productFixes.plasticSubsurface },
                                                { id: 'fabricWeave', label: 'Fabric Weave', active: productFixes.fabricWeave },
                                                { id: 'condensationDrops', label: 'Condensation', active: productFixes.condensationDrops },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleProductFix(fix.id as keyof typeof productFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 3: Light */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Sun size={10} /> Light & Atmosphere</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'rimLighting', label: 'Rim Separation', active: productFixes.rimLighting },
                                                { id: 'softboxSimulation', label: 'Softbox Sim', active: productFixes.softboxSimulation },
                                                { id: 'hardSunlight', label: 'Hard Shadows', active: productFixes.hardSunlight },
                                                { id: 'reflectionContinuity', label: 'Reflection Map', active: productFixes.reflectionContinuity },
                                                { id: 'ambientOcclusion', label: 'Deep Corners', active: productFixes.ambientOcclusion },
                                                { id: 'globalIllumination', label: 'Bounce Light', active: productFixes.globalIllumination },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleProductFix(fix.id as keyof typeof productFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 4: Brand */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Type size={10} /> Brand & Fidelity</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'logoPreservation', label: 'Logo Clarity', active: productFixes.logoPreservation },
                                                { id: 'colorAccuracy', label: 'True Color', active: productFixes.colorAccuracy },
                                                { id: 'labelFlatness', label: 'Label Curve', active: productFixes.labelFlatness },
                                                { id: 'negativeSpace', label: 'Ad Copy Space', active: productFixes.negativeSpace },
                                                { id: 'noHallucinations', label: 'No Artifacts', active: productFixes.noHallucinations },
                                                { id: 'cleanEdges', label: 'Easy Cutout', active: productFixes.cleanEdges },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleProductFix(fix.id as keyof typeof productFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 5: Aesthetics */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1"><Aperture size={10} /> Composition</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'goldenRatio', label: 'Rule of Thirds', active: productFixes.goldenRatio },
                                                { id: 'bokehControl', label: 'Pro Bokeh', active: productFixes.bokehControl },
                                                { id: 'heroAngle', label: 'Hero Angle', active: productFixes.heroAngle },
                                                { id: 'minimalistZen', label: 'Minimalist', active: productFixes.minimalistZen },
                                                { id: 'colorGrading', label: 'Commercial Grade', active: productFixes.colorGrading },
                                                { id: 'sharpFocusStack', label: 'Focus Stacking', active: productFixes.sharpFocusStack },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleProductFix(fix.id as keyof typeof productFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-teal-50 text-teal-700 border-teal-100' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
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

// Simple check icon for the new toggle
const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export default InputPanel;