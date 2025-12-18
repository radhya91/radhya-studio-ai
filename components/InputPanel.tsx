import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair, Hand, Eye, Layers, Fingerprint, Baby, Heart, ShieldCheck, Moon, Microscope, ScanFace, Scale, Video, CloudRain, Wind, UserCheck, Flame, Infinity, Clapperboard, Film, Users2, Home, Shirt, UploadCloud, X, Footprints, Smile, UserPlus, Droplets, Target, ShoppingBag, History, Bandage, User, Wand2, ZoomIn, Cpu, Maximize2, Lightbulb, Scissors, Briefcase, Expand, PenTool, Wrench, Car } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, FashionEditorialOptions, LogoMascotOptions, ArchitecturalVisionOptions, IndustrialDesignOptions, GenerationOptions, PersonalColorOptions, ModMotorOptions, ModCarOptions } from '../types';
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

  // Fashion Editorial (Replaces Virtual Fashion)
  const [edStyle, setEdStyle] = useState('haute-couture');
  const [edLocation, setEdLocation] = useState('runway');
  const [edEra, setEdEra] = useState('modern');
  const [edFixes, setEdFixes] = useState({
    hauteCoutureFit: true,
    textileSimulation: true,
    dynamicPosing: true,
    makeupHairSync: true,
    magazineColorGrade: true
  });

  // Logo Mascot
  const [logoStyle, setLogoStyle] = useState('mascot');
  const [logoComplexity, setLogoComplexity] = useState('simple');
  const [logoFixes, setLogoFixes] = useState({
    vectorFlatness: true,
    negativeSpaceBalance: true,
    colorPaletteLimit: true,
    mascotExpressiveness: true,
    printReadiness: true
  });

  // Architectural Vision (New Feature)
  const [archiView, setArchiView] = useState('eye-level');
  const [archiEnv, setArchiEnv] = useState('sunny-noon');
  const [archiStyle, setArchiStyle] = useState('modern');
  const [archiFixes, setArchiFixes] = useState({
    verticalCorrection: true,
    materialRealism: true,
    environmentIntegration: true,
    scaleAccuracy: true,
    interiorGlow: true
  });

  // Industrial Design (New Feature)
  const [indMaterial, setIndMaterial] = useState('plastic-matte');
  const [indStyle, setIndStyle] = useState('minimalist');
  const [indView, setIndView] = useState('studio');
  const [indFixes, setIndFixes] = useState({
    materialInference: true,
    ergonomicSmoothing: true,
    explodedViewLogic: true,
    surfaceFinish: true,
    partLineDefinition: true
  });

  // Personal Color Analyst (New States)
  const [pcLighting, setPcLighting] = useState('unknown');
  const [pcHair, setPcHair] = useState('natural');
  const [pcVein, setPcVein] = useState('unsure');
  const [pcEye, setPcEye] = useState('');
  const [pcFixes, setPcFixes] = useState({
    whiteBalanceAuto: true,
    makeupNeutralizer: true,
    ignoreBackgroundReflections: true,
    focusOnIrisPattern: true
  });

  // Mod Motor States (Updated for 10 Blind Spots)
  const [motorStyle, setMotorStyle] = useState('cafe-racer');
  const [motorExhaust, setMotorExhaust] = useState('shorty');
  const [motorSeat, setMotorSeat] = useState('single');
  const [motorFixes, setMotorFixes] = useState({
    chainRealism: true,
    exhaustRouting: true,
    cableManagement: true,
    brakeLogic: true,
    suspensionMount: true,
    kickstandFix: true,
    tireClearance: true,
    engineAirflow: true,
    footControlSym: true,
    mirrorReflection: true
  });

  // Mod Car States
  const [carStyle, setCarStyle] = useState('jdm');
  const [carRim, setCarRim] = useState('te37');
  const [carSusp, setCarSusp] = useState('lowered');
  const [carFixes, setCarFixes] = useState({
    panelGap: true,
    reflectionMatch: true,
    camberLogic: true,
    brakeCaliper: true,
    headlightDetail: true,
  });

  const hasResults = generatedImages.length > 0 || !!textContent;
  
  // Helpers
  const isHeadshot = config.id === AppMode.PROFESSIONAL_HEADSHOT;
  const isStaging = config.id === AppMode.VIRTUAL_STAGING;
  const isDoubleExposure = config.id === AppMode.DOUBLE_EXPOSURE;
  const isHDR = config.id === AppMode.HDR_LANDSCAPE;
  const isGenFill = config.id === AppMode.GEN_FILL;
  const isFashionEditorial = config.id === AppMode.FASHION_EDITORIAL;
  const isLogoMascot = config.id === AppMode.LOGO_MASCOT;
  const isArchViz = config.id === AppMode.ARCHITECTURAL_VISION;
  const isIndustrial = config.id === AppMode.INDUSTRIAL_DESIGN;
  
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

  const isUiToCode = config.id === AppMode.UI_TO_CODE;
  const isNutrition = config.id === AppMode.NUTRITION_TRACKER;
  const isHandwriting = config.id === AppMode.HANDWRITING_DECIPHER;
  const isDataAnalyst = config.id === AppMode.DATA_ANALYST;
  const isDiy = config.id === AppMode.DIY_REPAIR;
  const isVintage = config.id === AppMode.VINTAGE_ID;
  const isCv = config.id === AppMode.CV_AUDITOR;
  const isTravel = config.id === AppMode.TRAVEL_GUIDE;
  const isPersonalColor = config.id === AppMode.PERSONAL_COLOR;
  
  const isModMotor = config.id === AppMode.MOD_MOTOR;
  const isModCar = config.id === AppMode.MOD_CAR;

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
    } else if (isFashionEditorial) {
        options = { editorialStyle: edStyle, location: edLocation, era: edEra, fixes: edFixes } as FashionEditorialOptions;
    } else if (isLogoMascot) {
        options = { style: logoStyle, complexity: logoComplexity, fixes: logoFixes } as LogoMascotOptions;
    } else if (isArchViz) {
        options = { viewpoint: archiView, environment: archiEnv, style: archiStyle, fixes: archiFixes } as ArchitecturalVisionOptions;
    } else if (isIndustrial) {
        options = { material: indMaterial, style: indStyle, view: indView, fixes: indFixes } as IndustrialDesignOptions;
    } else if (isPersonalColor) {
        options = { lighting: pcLighting, hairStatus: pcHair, veinColor: pcVein, eyeColor: pcEye, fixes: pcFixes } as PersonalColorOptions;
    } else if (isModMotor) {
        options = { style: motorStyle, exhaustType: motorExhaust, seatStyle: motorSeat, fixes: motorFixes } as ModMotorOptions;
    } else if (isModCar) {
        options = { style: carStyle, rimType: carRim, suspension: carSusp, fixes: carFixes } as ModCarOptions;
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
  const toggleEdFix = (key: keyof typeof edFixes) => setEdFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleLogoFix = (key: keyof typeof logoFixes) => setLogoFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleArchiFix = (key: keyof typeof archiFixes) => setArchiFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleIndFix = (key: keyof typeof indFixes) => setIndFixes(prev => ({...prev, [key]: !prev[key]}));
  const togglePcFix = (key: keyof typeof pcFixes) => setPcFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleMotorFix = (key: keyof typeof motorFixes) => setMotorFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleCarFix = (key: keyof typeof carFixes) => setCarFixes(prev => ({...prev, [key]: !prev[key]}));

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
                                    {isPhotoshoot ? 'Product Reference' : 
                                     (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar) 
                                     ? 'Input Image' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar) ? 'Upload Source' : 'Reference Image')}
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

                        {/* --- MOD MOTOR UI --- */}
                        {isModMotor && (
                            <div className="bg-red-50/50 p-5 rounded-xl border border-red-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-red-800 uppercase tracking-widest flex items-center gap-2">
                                    <Wrench size={14} /> Custom Bike Builder
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Style</label>
                                        <select value={motorStyle} onChange={(e) => setMotorStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="cafe-racer">Cafe Racer</option>
                                            <option value="scrambler">Scrambler</option>
                                            <option value="bobber">Bobber</option>
                                            <option value="chopper">Chopper</option>
                                            <option value="drag-bike">Drag Bike</option>
                                            <option value="tracker">Street Tracker</option>
                                            <option value="sport-fairing">Full Fairing Sport</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Exhaust Type</label>
                                        <select value={motorExhaust} onChange={(e) => setMotorExhaust(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="shorty">Shorty / Slash Cut</option>
                                            <option value="underseat">Underseat</option>
                                            <option value="dual">Dual Exhaust</option>
                                            <option value="high-mount">High-mount Scrambler</option>
                                            <option value="straight-pipe">Straight Pipe</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Seat Style</label>
                                        <select value={motorSeat} onChange={(e) => setMotorSeat(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="single">Single Seater (Hornet)</option>
                                            <option value="flat-bench">Flat Bench (Brat)</option>
                                            <option value="springer">Springer Seat</option>
                                            <option value="stepped">Stepped Seat</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-red-200/50">
                                    {Object.entries(motorFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleMotorFix(key as keyof typeof motorFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- MOD CAR UI --- */}
                        {isModCar && (
                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-blue-800 uppercase tracking-widest flex items-center gap-2">
                                    <Car size={14} /> Car Tuning Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Tuning Style</label>
                                        <select value={carStyle} onChange={(e) => setCarStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="jdm">JDM / Street Racing</option>
                                            <option value="stance">Stance / Hellaflush</option>
                                            <option value="rally">Rally / WRC</option>
                                            <option value="offroad">Offroad / Overland</option>
                                            <option value="luxury-vip">Luxury VIP</option>
                                            <option value="time-attack">Time Attack</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Rims / Wheels</label>
                                        <select value={carRim} onChange={(e) => setCarRim(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="te37">6-Spoke Racing (TE37 style)</option>
                                            <option value="multi-spoke">Multi-spoke (BBS style)</option>
                                            <option value="dish">Deep Dish</option>
                                            <option value="five-star">5-Star</option>
                                            <option value="beadlock">Offroad Beadlock</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Suspension</label>
                                        <select value={carSusp} onChange={(e) => setCarSusp(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="lowered">Lowered (Sport)</option>
                                            <option value="slammed">Slammed (Air Suspension)</option>
                                            <option value="lifted">Lifted (Offroad)</option>
                                            <option value="stock">Stock Height</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-200/50">
                                    {Object.entries(carFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleCarFix(key as keyof typeof carFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- PERSONAL COLOR ANALYST UI (NEW) --- */}
                        {isPersonalColor && (
                            <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-purple-800 uppercase tracking-widest flex items-center gap-2">
                                    <Palette size={14} /> Professional Analysis Controls
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Lighting Condition</label>
                                        <select value={pcLighting} onChange={(e) => setPcLighting(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="unknown">Unsure (Auto Detect)</option>
                                            <option value="natural">Natural Daylight (Best)</option>
                                            <option value="indoor-warm">Indoor (Warm/Yellow Light)</option>
                                            <option value="indoor-cool">Indoor (Cool/Fluorescent)</option>
                                            <option value="studio">Studio Lighting</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Hair Status</label>
                                        <select value={pcHair} onChange={(e) => setPcHair(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="natural">Natural Color</option>
                                            <option value="dyed">Dyed / Colored</option>
                                            <option value="covered">Hijab / Covered</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Vein Color (Wrist Test)</label>
                                        <select value={pcVein} onChange={(e) => setPcVein(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="unsure">I don't know</option>
                                            <option value="blue">Blue / Purple (Cool)</option>
                                            <option value="green">Green / Olive (Warm)</option>
                                            <option value="purple">Blue & Green Mix (Neutral)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-purple-100">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Eye Color (Optional)</label>
                                    <input 
                                        type="text" 
                                        value={pcEye} 
                                        onChange={(e) => setPcEye(e.target.value)} 
                                        placeholder="e.g. Dark Brown, Hazel, Grey-Blue..."
                                        className="w-full text-xs p-2 rounded-lg border border-gray-200"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-purple-200/50">
                                    {Object.entries(pcFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => togglePcFix(key as keyof typeof pcFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
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
                                            <option value="modern">Modern</option>
                                            <option value="minimalist">Minimalist</option>
                                            <option value="scandinavian">Scandinavian</option>
                                            <option value="industrial">Industrial</option>
                                            <option value="mid-century">Mid-Century Modern</option>
                                            <option value="contemporary">Contemporary</option>
                                            <option value="transitional">Transitional</option>
                                            <option value="traditional">Traditional / Classic</option>
                                            <option value="rustic">Rustic</option>
                                            <option value="bohemian">Bohemian (Boho)</option>
                                            <option value="coastal">Coastal / Hamptons</option>
                                            <option value="farmhouse">Modern Farmhouse</option>
                                            <option value="art-deco">Art Deco</option>
                                            <option value="zen">Zen / Asian</option>
                                            <option value="japandi">Japandi</option>
                                            <option value="bauhaus">Bauhaus</option>
                                            <option value="brutalist">Brutalist</option>
                                            <option value="gothic">Gothic Revival</option>
                                            <option value="victorian">Victorian</option>
                                            <option value="mediterranean">Mediterranean</option>
                                            <option value="tropical">Tropical / Bali</option>
                                            <option value="eclectic">Eclectic</option>
                                            <option value="shabby-chic">Shabby Chic</option>
                                            <option value="french-country">French Country</option>
                                            <option value="luxury">Luxury</option>
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
                        
                        {/* --- FASHION EDITORIAL UI (UPDATED) --- */}
                        {isFashionEditorial && (
                            <div className="bg-pink-50/50 p-5 rounded-xl border border-pink-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-pink-800 uppercase tracking-widest flex items-center gap-2">
                                    <Shirt size={14} /> Fashion Editorial Magazine
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Editorial Concept</label>
                                        <select value={edStyle} onChange={(e) => setEdStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="haute-couture">Haute Couture (High Fashion)</option>
                                            <option value="avant-garde">Avant-Garde (Artistic)</option>
                                            <option value="street-style">Hypebeast / Street Style</option>
                                            <option value="minimalist">Minimalist Chic</option>
                                            <option value="boho-luxe">Bohemian Luxury</option>
                                            <option value="techwear">Cyber / Techwear</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Set Location</label>
                                        <select value={edLocation} onChange={(e) => setEdLocation(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="runway">Paris Fashion Runway</option>
                                            <option value="studio-infinity">Infinite White Studio</option>
                                            <option value="urban-decay">Urban Industrial</option>
                                            <option value="nature-surreal">Surreal Nature</option>
                                            <option value="neon-city">Neon Night City</option>
                                            <option value="palace">Historic Palace</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Fashion Era</label>
                                        <select value={edEra} onChange={(e) => setEdEra(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="modern">Modern Contemporary</option>
                                            <option value="y2k">Y2K (Early 2000s)</option>
                                            <option value="90s-grunge">90s Grunge</option>
                                            <option value="80s-power">80s Power Dressing</option>
                                            <option value="20s-art-deco">20s Art Deco</option>
                                            <option value="future">Futuristic</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-pink-200/50">
                                    {Object.entries(edFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleEdFix(key as keyof typeof edFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-pink-100 text-pink-800 border-pink-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* --- LOGO & MASCOT WIZARD UI --- */}
                        {isLogoMascot && (
                            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-orange-800 uppercase tracking-widest flex items-center gap-2">
                                    <PenTool size={14} /> Brand Identity Lab
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Design Style</label>
                                        <select value={logoStyle} onChange={(e) => setLogoStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="mascot">Mascot Character</option>
                                            <option value="minimalist">Minimalist / Symbol</option>
                                            <option value="emblem">Emblem / Badge</option>
                                            <option value="abstract">Abstract Geometric</option>
                                            <option value="lettermark">Lettermark / Typography</option>
                                            <option value="hand-drawn">Hand Drawn / Organic</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Complexity</label>
                                        <select value={logoComplexity} onChange={(e) => setLogoComplexity(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="simple">Simple (Iconic)</option>
                                            <option value="medium">Medium (Balanced)</option>
                                            <option value="detailed">Detailed (Illustration)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-orange-200/50">
                                    {Object.entries(logoFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleLogoFix(key as keyof typeof logoFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- ARCHITECTURAL VISION UI (NEW) --- */}
                        {isArchViz && (
                            <div className="bg-teal-50/50 p-5 rounded-xl border border-teal-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-teal-800 uppercase tracking-widest flex items-center gap-2">
                                    <Building2 size={14} /> Pro ArchViz Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Viewpoint</label>
                                        <select value={archiView} onChange={(e) => setArchiView(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="eye-level">Eye-Level (Human Scale)</option>
                                            <option value="drone">Drone / Aerial</option>
                                            <option value="worms-eye">Worm's Eye (Heroic)</option>
                                            <option value="interior">Interior Perspective</option>
                                            <option value="isometric">Isometric / Model</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Environment</label>
                                        <select value={archiEnv} onChange={(e) => setArchiEnv(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="sunny-noon">Sunny Noon (Clear)</option>
                                            <option value="golden-hour">Golden Hour (Warm)</option>
                                            <option value="overcast">Overcast (Soft Light)</option>
                                            <option value="rainy-mood">Rainy Mood</option>
                                            <option value="night-city">Night City</option>
                                            <option value="tropical-forest">Tropical Forest</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Architecture Style</label>
                                        <select value={archiStyle} onChange={(e) => setArchiStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="modern">Modern Minimalist</option>
                                            <option value="industrial">Industrial</option>
                                            <option value="brutalist">Brutalist (Concrete)</option>
                                            <option value="biophilic">Biophilic (Green)</option>
                                            <option value="tropical">Tropical Contemporary</option>
                                            <option value="classic">Neo-Classic</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-teal-200/50">
                                    {Object.entries(archiFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleArchiFix(key as keyof typeof archiFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-teal-100 text-teal-800 border-teal-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- INDUSTRIAL DESIGN UI (NEW) --- */}
                        {isIndustrial && (
                            <div className="bg-zinc-100 p-5 rounded-xl border border-zinc-200 space-y-5">
                                <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-widest flex items-center gap-2">
                                    <Box size={14} /> Industrial Design Lab
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Material</label>
                                        <select value={indMaterial} onChange={(e) => setIndMaterial(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="plastic-matte">Plastic (Matte)</option>
                                            <option value="plastic-gloss">Plastic (Glossy)</option>
                                            <option value="aluminum">Brushed Aluminum</option>
                                            <option value="steel">Stainless Steel</option>
                                            <option value="wood-oak">Oak Wood</option>
                                            <option value="wood-walnut">Walnut Wood</option>
                                            <option value="leather">Leather</option>
                                            <option value="glass">Tempered Glass</option>
                                            <option value="carbon-fiber">Carbon Fiber</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Design Aesthetics</label>
                                        <select value={indStyle} onChange={(e) => setIndStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="minimalist">Minimalist (Braun/Apple)</option>
                                            <option value="bauhaus">Bauhaus (Geometric)</option>
                                            <option value="cyberpunk">Cyberpunk (Tech)</option>
                                            <option value="retro-futurism">Retro Futurism</option>
                                            <option value="scandinavian">Scandinavian (Soft)</option>
                                            <option value="utilitarian">Utilitarian (Rugged)</option>
                                            <option value="organic">Organic (Curved)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Render View</label>
                                        <select value={indView} onChange={(e) => setIndView(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="studio">Studio (Clean BG)</option>
                                            <option value="exploded">Exploded View (Technical)</option>
                                            <option value="in-context">In-Context (Lifestyle)</option>
                                            <option value="blueprint">Blueprint / Wireframe</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200">
                                    {Object.entries(indFixes).map(([key, active]) => (
                                        <button key={key} onClick={() => toggleIndFix(key as keyof typeof indFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-zinc-800 text-white border-zinc-900' : 'bg-white text-gray-400 border-gray-200'}`}>
                                            {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </button>
                                    ))}
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