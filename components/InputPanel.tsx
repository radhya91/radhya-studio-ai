import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair, Hand, Eye, Layers, Fingerprint, Baby, Heart, ShieldCheck, Moon, Microscope, ScanFace, Scale, Video, CloudRain, Wind, UserCheck, Flame, Infinity, Clapperboard, Film, Users2, Home, Shirt, UploadCloud, X, Footprints, Smile, UserPlus, Droplets, Target, ShoppingBag, History, Bandage, User, Wand2, ZoomIn, Cpu, Maximize2, Lightbulb, Scissors, Briefcase, Expand } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, GenerationOptions } from '../types';
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

  // Cinematic Relighting States (New - 25 Fixes)
  const [relightStyle, setRelightStyle] = useState('rembrandt');
  const [relightColor, setRelightColor] = useState('teal-orange');
  const [relightLens, setRelightLens] = useState('anamorphic');
  const [relightFixes, setRelightFixes] = useState({
    rembrandtTriangle: true,
    rimLightSeparation: true,
    volumetricFog: true,
    practicalLights: true,
    catchlights: true,
    tealOrangePush: true,
    skinToneProtection: true,
    deepBlacks: true,
    highlightRollOff: true,
    vibranceBoost: true,
    filmGrain: true,
    anamorphicFlares: true,
    halation: true,
    vignette: true,
    chromaticAbberation: true,
    softShadows: true,
    silhouetteDrama: false,
    subsurfaceScattering: true,
    ambientOcclusion: true,
    depthOfField: true,
    cyberpunkNeon: false,
    horrorGloom: false,
    goldenHourWarmth: false,
    moonlightCoolness: false,
    dreamyGlow: true,
  });

  // Analog Film States (New - 30 Films)
  const [filmStock, setFilmStock] = useState('portra400');
  const [filmFormat, setFilmFormat] = useState('35mm');
  const [filmFixes, setFilmFixes] = useState({
    halation: true,
    filmGrain: true,
    colorShift: true,
    bleachBypass: false,
    crossProcess: false,
    lightLeaks: true,
    vignette: true,
    softFocus: false,
    chromaticAberration: true,
    bloom: true,
    dustScratches: true,
    motionBlur: false,
    dateStamp: true,
    filmBorder: false,
    fadedPrint: false,
    overexposure: false,
    underexposure: false,
    highContrast: false,
    lowContrast: false,
    flashBurn: false,
  });

  // --- NEW STATES FOR ADDED FEATURES ---

  // Professional Headshot
  const [hsOutfit, setHsOutfit] = useState('suit');
  const [hsBackground, setHsBackground] = useState('office');
  const [hsFixes, setHsFixes] = useState({
    skinTexture: true,
    eyeContact: true,
    lightingMatch: true,
    hairCleanup: true
  });

  // Virtual Staging
  const [stgRoom, setStgRoom] = useState('living');
  const [stgStyle, setStgStyle] = useState('modern');
  const [stgFixes, setStgFixes] = useState({
    perspectiveMatch: true,
    shadowCast: true,
    scaleLogic: true,
    colorHarmony: true
  });

  // Double Exposure
  const [deBlend, setDeBlend] = useState('silhouette');
  const [deSecond, setDeSecond] = useState('nature');
  const [deFixes, setDeFixes] = useState({
    edgeDetection: true,
    contrastBoost: true,
    colorGrade: true
  });

  // HDR Landscape
  const [hdrStyle, setHdrStyle] = useState('natural');
  const [hdrSky, setHdrSky] = useState(true);
  const [hdrFixes, setHdrFixes] = useState({
    shadowRecovery: true,
    highlightSave: true,
    saturationBoost: true,
    noiseReduction: true
  });

  // Gen Fill
  const [gfDir, setGfDir] = useState('horizontal');
  const [gfZoom, setGfZoom] = useState('1.5x');
  const [gfFixes, setGfFixes] = useState({
    seamlessTransition: true,
    resolutionMatch: true,
    lightingConsistency: true
  });


  const hasResults = generatedImages.length > 0 || !!textContent;
  
  // Helpers
  const isHeadshot = config.id === AppMode.PROFESSIONAL_HEADSHOT;
  const isStaging = config.id === AppMode.VIRTUAL_STAGING;
  const isDoubleExposure = config.id === AppMode.DOUBLE_EXPOSURE;
  const isHDR = config.id === AppMode.HDR_LANDSCAPE;
  const isGenFill = config.id === AppMode.GEN_FILL;
  
  const isPhotoCarousel = config.id === AppMode.PHOTO_CAROUSEL;
  const isPhotoshoot = config.id === AppMode.PHOTOSHOOT_AI;
  const isNewborn = config.id === AppMode.NEWBORN;
  const isPrewedding = config.id === AppMode.PREWEDDING;
  const isFamily = config.id === AppMode.FAMILY;
  const isProduct = config.id === AppMode.PRODUCT;
  const isRecovery = config.id === AppMode.RECOVERY;
  const isDetailing = config.id === AppMode.DETAILING;
  const isCinematicRelighting = config.id === AppMode.CINEMATIC_RELIGHTING;
  const isAnalogFilm = config.id === AppMode.ANALOG_FILM;

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
        options = { lighting: carouselLighting, angle: carouselAngle, fixes: carouselFixes } as CarouselOptions;
    } else if (isPhotoshoot) {
        options = { vibe: shootVibe, lighting: shootLighting, composition: shootComposition, modelGaze: shootGaze, gripType: shootGrip, fixes: shootFixes } as PhotoshootOptions;
    } else if (isNewborn) {
        options = { pose: newbornPose, setting: newbornSetting, skinTone: newbornSkin, state: newbornState, fixes: newbornFixes } as NewbornOptions;
    } else if (isPrewedding) {
        options = { visualStyle: prewedStyle, theme: prewedTheme, timeOfDay: prewedTime, shotType: prewedShot, fixes: prewedFixes } as PreweddingOptions;
    } else if (isFamily) {
        options = { familyType: familyType, setting: familySetting, outfitStyle: familyOutfit, files: familyImages, fixes: familyFixes } as FamilyOptions;
    } else if (isProduct) {
        options = { materialType: prodMaterial, lightingStyle: prodLight, placement: prodPlace, files: productImages, fixes: productFixes } as ProductOptions;
    } else if (isRecovery) {
        options = { damageLevel: recDamage, colorMode: recColor, enhanceStrength: recStrength, fixes: recFixes } as RecoveryOptions;
    } else if (isDetailing) {
        options = { resolutionTarget: detRes, creativityLevel: detCreative, sharpnessMode: detSharp, fixes: detFixes } as DetailingOptions;
    } else if (isCinematicRelighting) {
        options = { lightingStyle: relightStyle, colorGrade: relightColor, lensType: relightLens, fixes: relightFixes } as CinematicRelightingOptions;
    } else if (isAnalogFilm) {
        options = { filmStock: filmStock, filmFormat: filmFormat, fixes: filmFixes } as AnalogFilmOptions;
    } else if (isHeadshot) {
        options = { outfit: hsOutfit, background: hsBackground, fixes: hsFixes } as HeadshotOptions;
    } else if (isStaging) {
        options = { roomType: stgRoom, style: stgStyle, fixes: stgFixes } as StagingOptions;
    } else if (isDoubleExposure) {
        options = { blendMode: deBlend, secondaryElement: deSecond, fixes: deFixes } as DoubleExposureOptions;
    } else if (isHDR) {
        options = { style: hdrStyle, skyEnhancement: hdrSky, fixes: hdrFixes } as HDROptions;
    } else if (isGenFill) {
        options = { direction: gfDir, zoomLevel: gfZoom, fixes: gfFixes } as GenFillOptions;
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
  const toggleRelightFix = (key: keyof typeof relightFixes) => setRelightFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleFilmFix = (key: keyof typeof filmFixes) => setFilmFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleHsFix = (key: keyof typeof hsFixes) => setHsFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleStgFix = (key: keyof typeof stgFixes) => setStgFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleDeFix = (key: keyof typeof deFixes) => setDeFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleHdrFix = (key: keyof typeof hdrFixes) => setHdrFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleGfFix = (key: keyof typeof gfFixes) => setGfFixes(prev => ({...prev, [key]: !prev[key]}));

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
                                    {isPhotoshoot ? 'Product Reference' : (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill) ? 'Input Photo' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill) ? 'Original Photo' : 'Reference Image')}
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

                        {/* --- PHOTO PROFILE UI (RENAMED FROM PROFESSIONAL HEADSHOT) --- */}
                        {isHeadshot && (
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-blue-800 uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase size={14} /> Profile Picture Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Outfit Style</label>
                                        <select value={hsOutfit} onChange={(e) => setHsOutfit(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="suit">Business Suit (Formal)</option>
                                            <option value="blazer">Smart Blazer (Business Casual)</option>
                                            <option value="casual">Tech Casual (T-Shirt/Hoodie)</option>
                                            <option value="polo">Polo Shirt (Semi-Formal)</option>
                                            <option value="turtle-neck">Turtle Neck (Creative/Modern)</option>
                                            <option value="sweater">Sweater / Knitwear (Cozy)</option>
                                            <option value="leather-jacket">Leather Jacket (Edgy)</option>
                                            <option value="denim-jacket">Denim Jacket (Casual)</option>
                                            <option value="traditional">Traditional (Batik/Kebaya/Kimono)</option>
                                            <option value="medical-coat">Medical White Coat (Doctor)</option>
                                            <option value="uniform-pilot">Pilot Uniform</option>
                                            <option value="uniform-chef">Chef Uniform</option>
                                            <option value="sportswear">Sportswear / Gym</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Background</label>
                                        <select value={hsBackground} onChange={(e) => setHsBackground(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="office">Modern Office Blur</option>
                                            <option value="studio-grey">Studio Grey (Classic)</option>
                                            <option value="studio-white">Studio White (High Key)</option>
                                            <option value="studio-black">Studio Black (Low Key)</option>
                                            <option value="city">City Skyline Bokeh</option>
                                            <option value="nature">Nature / Park (Greenery)</option>
                                            <option value="library">Library / Bookshelf</option>
                                            <option value="cafe">Coffee Shop / Cafe</option>
                                            <option value="minimal-blue">Solid Blue (Professional)</option>
                                            <option value="minimal-yellow">Solid Yellow (Vibrant)</option>
                                            <option value="gradient">Gradient Abstract</option>
                                            <option value="brick-wall">Brick Wall (Industrial)</option>
                                            <option value="neon">Neon Lights (Cyberpunk)</option>
                                            <option value="luxury-living">Luxury Living Room</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-200/50">
                                    {Object.entries(hsFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleHsFix(key as keyof typeof hsFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- VIRTUAL STAGING UI --- */}
                        {isStaging && (
                            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                                    <Armchair size={14} /> Interior Design Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Room Type</label>
                                        <select value={stgRoom} onChange={(e) => setStgRoom(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="living">Living Room</option>
                                            <option value="bedroom">Bedroom</option>
                                            <option value="dining">Dining Room</option>
                                            <option value="office">Home Office</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Interior Style</label>
                                        <select value={stgStyle} onChange={(e) => setStgStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="modern">Modern Contemporary</option>
                                            <option value="scandinavian">Scandinavian (Light/Airy)</option>
                                            <option value="industrial">Industrial (Raw/Brick)</option>
                                            <option value="luxury">Luxury Classic</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-200/50">
                                    {Object.entries(stgFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleStgFix(key as keyof typeof stgFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- DOUBLE EXPOSURE UI --- */}
                        {isDoubleExposure && (
                            <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-purple-800 uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={14} /> Artistic Blending
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Blend Mode</label>
                                        <select value={deBlend} onChange={(e) => setDeBlend(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="silhouette">Silhouette Fill</option>
                                            <option value="overlay">Soft Overlay</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Secondary Element</label>
                                        <select value={deSecond} onChange={(e) => setDeSecond(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="nature">Nature (Forest/Ocean)</option>
                                            <option value="city">City Architecture</option>
                                            <option value="galaxy">Space / Galaxy</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-200/50">
                                    {Object.entries(deFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleDeFix(key as keyof typeof deFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- HDR LANDSCAPE UI --- */}
                        {isHDR && (
                            <div className="bg-yellow-50/50 p-5 rounded-xl border border-yellow-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-2">
                                    <Sun size={14} /> Dynamic Range Master
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">HDR Style</label>
                                        <select value={hdrStyle} onChange={(e) => setHdrStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="natural">Natural Balanced</option>
                                            <option value="dramatic">Dramatic Contrast</option>
                                            <option value="surreal">Surreal Vivid</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Sky Enhancement</label>
                                        <div className="flex items-center gap-3">
                                            <label className="text-xs flex items-center gap-2">
                                                <input type="checkbox" checked={hdrSky} onChange={(e) => setHdrSky(e.target.checked)} className="rounded text-yellow-600" />
                                                Auto-Enhance Sky
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-yellow-200/50">
                                    {Object.entries(hdrFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleHdrFix(key as keyof typeof hdrFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- GENERATIVE FILL UI --- */}
                        {isGenFill && (
                            <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                                    <Expand size={14} /> Smart Canvas Expand
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Expansion Direction</label>
                                        <select value={gfDir} onChange={(e) => setGfDir(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="horizontal">Horizontal (Panorama)</option>
                                            <option value="vertical">Vertical (Tall)</option>
                                            <option value="surround">All Around (Zoom Out)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Zoom Level</label>
                                        <select value={gfZoom} onChange={(e) => setGfZoom(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="1.5x">1.5x Expansion</option>
                                            <option value="2x">2.0x Expansion</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-indigo-200/50">
                                    {Object.entries(gfFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleGfFix(key as keyof typeof gfFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
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

                        {/* --- CINEMATIC RELIGHTING MODE UI (NEW - 25 FIXES) --- */}
                        {isCinematicRelighting && (
                             <div className="bg-violet-50/50 p-5 rounded-xl border border-violet-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-violet-800 uppercase tracking-widest flex items-center gap-2">
                                    <Clapperboard size={14} />
                                    Director's Suite: Lighting & Color
                                </h3>

                                {/* Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Lightbulb size={10} /> Lighting Setup</label>
                                        <select value={relightStyle} onChange={(e) => setRelightStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="rembrandt">Rembrandt (Classic)</option>
                                            <option value="split">Split Lighting (Drama)</option>
                                            <option value="butterfly">Butterfly (Glamour)</option>
                                            <option value="rim">Rim Light (Silhouette)</option>
                                            <option value="broad">Broad Lighting (Soft)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Palette size={10} /> Color Grading</label>
                                        <select value={relightColor} onChange={(e) => setRelightColor(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="teal-orange">Teal & Orange (Action)</option>
                                            <option value="noir">Noir B&W (Mystery)</option>
                                            <option value="matrix">Matrix Green (Sci-Fi)</option>
                                            <option value="wes-anderson">Pastel Palette (Quirky)</option>
                                            <option value="natural">Natural / Rec.709</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Aperture size={10} /> Lens Type</label>
                                        <select value={relightLens} onChange={(e) => setRelightLens(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="anamorphic">Anamorphic (Cinematic)</option>
                                            <option value="prime-50mm">Prime 50mm (Portrait)</option>
                                            <option value="vintage">Vintage 70s Glass</option>
                                            <option value="fisheye">Fisheye (Music Video)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 25 Blind Spots - Grouped */}
                                <div className="space-y-4 pt-2 border-t border-violet-200/50">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <Film size={12} />
                                        Cinematography Control (25 Points)
                                     </label>

                                     {/* Group 1: Lighting */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1"><Lightbulb size={10} /> The Gaffer (Light)</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'rembrandtTriangle', label: 'Rembrandt Triangle', active: relightFixes.rembrandtTriangle },
                                                { id: 'rimLightSeparation', label: 'Rim Separation', active: relightFixes.rimLightSeparation },
                                                { id: 'volumetricFog', label: 'God Rays', active: relightFixes.volumetricFog },
                                                { id: 'practicalLights', label: 'Practical Lamps', active: relightFixes.practicalLights },
                                                { id: 'catchlights', label: 'Eye Catchlights', active: relightFixes.catchlights },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRelightFix(fix.id as keyof typeof relightFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-violet-100 text-violet-800 border-violet-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 2: Color */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1"><Palette size={10} /> The Colorist</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'tealOrangePush', label: 'Teal/Orange Push', active: relightFixes.tealOrangePush },
                                                { id: 'skinToneProtection', label: 'Protect Skin Tone', active: relightFixes.skinToneProtection },
                                                { id: 'deepBlacks', label: 'Crush Blacks', active: relightFixes.deepBlacks },
                                                { id: 'highlightRollOff', label: 'Film Roll-off', active: relightFixes.highlightRollOff },
                                                { id: 'vibranceBoost', label: 'Pop Vibrance', active: relightFixes.vibranceBoost },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRelightFix(fix.id as keyof typeof relightFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 3: Atmosphere */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1"><Wind size={10} /> Atmosphere & FX</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'filmGrain', label: 'Film Grain', active: relightFixes.filmGrain },
                                                { id: 'anamorphicFlares', label: 'Lens Flares', active: relightFixes.anamorphicFlares },
                                                { id: 'halation', label: 'Red Halation', active: relightFixes.halation },
                                                { id: 'vignette', label: 'Vignette', active: relightFixes.vignette },
                                                { id: 'chromaticAbberation', label: 'Chromatic Abb.', active: relightFixes.chromaticAbberation },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRelightFix(fix.id as keyof typeof relightFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-indigo-100 text-indigo-800 border-indigo-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 4: Shadows */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1"><Moon size={10} /> The D.P. (Shadows)</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'softShadows', label: 'Soft Shadows', active: relightFixes.softShadows },
                                                { id: 'silhouetteDrama', label: 'Silhouette', active: relightFixes.silhouetteDrama },
                                                { id: 'subsurfaceScattering', label: 'Skin Glow (SSS)', active: relightFixes.subsurfaceScattering },
                                                { id: 'ambientOcclusion', label: 'Deep Corners', active: relightFixes.ambientOcclusion },
                                                { id: 'depthOfField', label: 'Bokeh', active: relightFixes.depthOfField },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRelightFix(fix.id as keyof typeof relightFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-slate-200 text-slate-800 border-slate-400' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 5: Genre */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1"><Clapperboard size={10} /> Genre Presets</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'cyberpunkNeon', label: 'Cyberpunk', active: relightFixes.cyberpunkNeon },
                                                { id: 'horrorGloom', label: 'Horror Gloom', active: relightFixes.horrorGloom },
                                                { id: 'goldenHourWarmth', label: 'Golden Hour', active: relightFixes.goldenHourWarmth },
                                                { id: 'moonlightCoolness', label: 'Moonlight', active: relightFixes.moonlightCoolness },
                                                { id: 'dreamyGlow', label: 'Dreamy Pro-Mist', active: relightFixes.dreamyGlow },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleRelightFix(fix.id as keyof typeof relightFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-pink-100 text-pink-800 border-pink-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>
                                </div>
                             </div>
                        )}

                        {/* --- ANALOG FILM MODE UI (NEW - 30 FILMS) --- */}
                        {isAnalogFilm && (
                             <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-orange-800 uppercase tracking-widest flex items-center gap-2">
                                    <Film size={14} />
                                    Virtual Darkroom: Analog Emulation
                                </h3>

                                {/* Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Camera size={10} /> Film Stock (30 Types)</label>
                                        <select value={filmStock} onChange={(e) => setFilmStock(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <optgroup label="Kodak (Warm/Gold)">
                                                <option value="kodak-portra-160">Kodak Portra 160 (Natural)</option>
                                                <option value="kodak-portra-400">Kodak Portra 400 (Versatile)</option>
                                                <option value="kodak-portra-800">Kodak Portra 800 (Vibrant)</option>
                                                <option value="kodak-gold-200">Kodak Gold 200 (Nostalgic)</option>
                                                <option value="kodak-colorplus-200">Kodak ColorPlus 200 (Vintage)</option>
                                                <option value="kodak-ultramax-400">Kodak Ultramax 400 (Punchy)</option>
                                                <option value="kodak-ektar-100">Kodak Ektar 100 (Vivid)</option>
                                                <option value="kodak-vision3-500t">Kodak Vision3 500T (Cinema)</option>
                                                <option value="kodak-vision3-250d">Kodak Vision3 250D (Daylight)</option>
                                                <option value="kodak-ektachrome-e100">Kodak Ektachrome E100 (Slide)</option>
                                            </optgroup>
                                            <optgroup label="Fujifilm (Cool/Green)">
                                                <option value="fujifilm-superia-400">Fujifilm Superia 400 (Green Tint)</option>
                                                <option value="fujifilm-pro-400h">Fujifilm Pro 400H (Pastel)</option>
                                                <option value="fujifilm-c200">Fujifilm C200 (Muted)</option>
                                                <option value="fujifilm-velvia-50">Fujifilm Velvia 50 (Sat. Slide)</option>
                                                <option value="fujifilm-provia-100f">Fujifilm Provia 100F (Realistic)</option>
                                                <option value="fujifilm-neopan-acros-100">Fuji Acros 100 (B&W)</option>
                                                <option value="fujifilm-instax-mini">Instax Mini (Flash Look)</option>
                                            </optgroup>
                                            <optgroup label="Cinestill & Lomo (Artistic)">
                                                <option value="cinestill-800t">Cinestill 800T (Red Halation)</option>
                                                <option value="cinestill-50d">Cinestill 50D (Fine Grain)</option>
                                                <option value="lomocolor-100">LomoColor 100 (Vibrant)</option>
                                                <option value="lomocolor-400">LomoColor 400 (Retro)</option>
                                                <option value="lomochrome-purple">LomoChrome Purple (Surreal)</option>
                                                <option value="lomochrome-metropolis">LomoChrome Metropolis (Grunge)</option>
                                            </optgroup>
                                            <optgroup label="Black & White (Classic)">
                                                <option value="kodak-tri-x-400">Kodak Tri-X 400 (Gritty)</option>
                                                <option value="kodak-t-max-400">Kodak T-Max 400 (Sharp)</option>
                                                <option value="ilford-hp5-plus">Ilford HP5 Plus (Classic)</option>
                                                <option value="ilford-fp4-plus">Ilford FP4 Plus (Fine)</option>
                                                <option value="ilford-delta-3200">Ilford Delta 3200 (Grainy)</option>
                                            </optgroup>
                                            <optgroup label="Vintage & Instant">
                                                <option value="agfa-vista-200">Agfa Vista 200 (Red Tint)</option>
                                                <option value="polaroid-600">Polaroid 600 (Soft/Creamy)</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Settings2 size={10} /> Film Format</label>
                                        <select value={filmFormat} onChange={(e) => setFilmFormat(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="35mm">35mm (Standard)</option>
                                            <option value="120mm">120mm Medium Format (Depth)</option>
                                            <option value="110mm">110mm (Lo-Fi)</option>
                                            <option value="polaroid">Instant Film Border</option>
                                            <option value="cinemascope">CinemaScope (Wide)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* 25 Artifacts - Grouped */}
                                <div className="space-y-4 pt-2 border-t border-orange-200/50">
                                     <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2">
                                        <Scissors size={12} />
                                        Darkroom Adjustments (25 Points)
                                     </label>

                                     {/* Group 1: Chemistry */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1"><FlaskIcon /> Film Chemistry</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'halation', label: 'Halation (Red Glow)', active: filmFixes.halation },
                                                { id: 'filmGrain', label: 'Organic Grain', active: filmFixes.filmGrain },
                                                { id: 'colorShift', label: 'Chem. Color Shift', active: filmFixes.colorShift },
                                                { id: 'bleachBypass', label: 'Bleach Bypass', active: filmFixes.bleachBypass },
                                                { id: 'crossProcess', label: 'Cross Process', active: filmFixes.crossProcess },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleFilmFix(fix.id as keyof typeof filmFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 2: Optical */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1"><Aperture size={10} /> Optical Artifacts</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'lightLeaks', label: 'Light Leaks', active: filmFixes.lightLeaks },
                                                { id: 'vignette', label: 'Lens Vignette', active: filmFixes.vignette },
                                                { id: 'softFocus', label: 'Vintage Softness', active: filmFixes.softFocus },
                                                { id: 'chromaticAberration', label: 'Lens Fringing', active: filmFixes.chromaticAberration },
                                                { id: 'bloom', label: 'Highlight Bloom', active: filmFixes.bloom },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleFilmFix(fix.id as keyof typeof filmFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 3: Wear */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1"><History size={10} /> Physical Wear</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'dustScratches', label: 'Dust & Scratches', active: filmFixes.dustScratches },
                                                { id: 'motionBlur', label: 'Shutter Drag', active: filmFixes.motionBlur },
                                                { id: 'dateStamp', label: 'Date Stamp', active: filmFixes.dateStamp },
                                                { id: 'filmBorder', label: 'Film Sprockets', active: filmFixes.filmBorder },
                                                { id: 'fadedPrint', label: 'Faded Print', active: filmFixes.fadedPrint },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleFilmFix(fix.id as keyof typeof filmFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
                                            ))}
                                         </div>
                                     </div>

                                     {/* Group 4: Exposure */}
                                     <div className="space-y-1.5">
                                         <p className="text-[9px] font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1"><Sun size={10} /> Exposure Logic</p>
                                         <div className="flex flex-wrap gap-2">
                                            {[
                                                { id: 'overexposure', label: 'Overexposed', active: filmFixes.overexposure },
                                                { id: 'underexposure', label: 'Underexposed', active: filmFixes.underexposure },
                                                { id: 'highContrast', label: 'High Contrast', active: filmFixes.highContrast },
                                                { id: 'lowContrast', label: 'Low Contrast', active: filmFixes.lowContrast },
                                                { id: 'flashBurn', label: 'Direct Flash', active: filmFixes.flashBurn },
                                            ].map((fix) => (
                                                <button key={fix.id} onClick={() => toggleFilmFix(fix.id as keyof typeof filmFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${fix.active ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{fix.active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>}{fix.label}</button>
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

const FlaskIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L6 15v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4l-4-5.69V2" />
        <path d="M8.5 2h7" />
        <path d="M14 10h-4" />
    </svg>
);

export default InputPanel;