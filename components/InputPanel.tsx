import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair, Hand, Eye, Layers, Fingerprint, Baby, Heart, ShieldCheck, Moon, Microscope, ScanFace, Scale, Video, CloudRain, Wind, UserCheck, Flame, Infinity, Clapperboard, Film, Users2, Home, Shirt, UploadCloud, X, Footprints, Smile, UserPlus, Droplets, Target, ShoppingBag, History, Bandage, User, Wand2, ZoomIn, Cpu, Maximize2, Lightbulb, Scissors, Briefcase, Expand, PenTool, Wrench, Car, Sprout, Disc, Flower, Compass } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, FashionEditorialOptions, LogoMascotOptions, ArchitecturalVisionOptions, IndustrialDesignOptions, GenerationOptions, PersonalColorOptions, ModMotorOptions, ModCarOptions, SneakerLabOptions, NailArtOptions, TerrariumOptions, CeramicOptions, FloristOptions, UmrahHajjOptions } from '../types';
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

  // Mod Car States (Updated for 20 Blind Spots)
  const [carStyle, setCarStyle] = useState('jdm');
  const [carRim, setCarRim] = useState('te37');
  const [carSusp, setCarSusp] = useState('lowered');
  const [carFixes, setCarFixes] = useState({
    panelGap: true,
    reflectionMatch: true,
    symmetryLock: true,
    carbonScale: true,
    plateWarp: true,
    camberLogic: true,
    lugNutCount: true,
    brakeCaliper: true,
    tireTread: true,
    wheelWellDepth: true,
    headlightDetail: true,
    taillightDepth: true,
    indicatorColor: true,
    windowTrans: true,
    windshieldFix: true,
    shadowContact: true,
    exhaustHole: true,
    intercoolerVis: true,
    wiperLogic: true,
    groundClearance: true,
  });

  // Sneaker Lab States (New)
  const [sneakerStyle, setSneakerStyle] = useState('high-top');
  const [sneakerMaterial, setSneakerMaterial] = useState('leather');
  const [sneakerColor, setSneakerColor] = useState('panda');
  const [sneakerFixes, setSneakerFixes] = useState({
    laceLogic: true,
    solePhysics: true,
    logoIntegrity: true,
    materialDistinction: true,
    stitchFlow: true,
    collarSymmetry: true,
    toeBoxShape: true,
    eyeletAlign: true,
    midsoleTexture: true,
    tonguePlacement: true
  });

  // Nail Art States (New)
  const [nailStyle, setNailStyle] = useState('french-tip');
  const [nailLength, setNailLength] = useState('medium');
  const [nailFinish, setNailFinish] = useState('glossy');
  const [nailFixes, setNailFixes] = useState({
    fingerCount: true,
    cuticleClean: true,
    shapeConsistency: true,
    textureReality: true,
    glossReflection: true,
    thumbPerspective: true,
    skinRealistic: true,
    patternUniform: true,
    jewelrySeparation: true,
    lengthLogic: true
  });

  // Terrarium Builder States (New)
  const [terraContainer, setTerraContainer] = useState('jar');
  const [terraEco, setTerraEco] = useState('tropical');
  const [terraDecor, setTerraDecor] = useState('stones');
  const [terraFixes, setTerraFixes] = useState({
    glassPhysics: true,
    layerLogic: true,
    scaleConsistency: true,
    condensation: true,
    plantCollision: true,
    rootVisibility: true,
    lightingInterior: true,
    waterLevel: true,
    lidLogic: true,
    mossTexture: true
  });

  // Ceramic Pottery States (New)
  const [potItem, setPotItem] = useState('vase');
  const [potClay, setPotClay] = useState('terracotta');
  const [potGlaze, setPotGlaze] = useState('drip');
  const [potFixes, setPotFixes] = useState({
    radialSymmetry: true,
    glazeDripPhysics: true,
    textureMapping: true,
    rimThickness: true,
    bottomShadow: true,
    handleGeometry: true,
    kilnEffects: true,
    interiorLighting: true,
    baseFooting: true,
    reflectivity: true
  });

  // Florist Atelier States (New)
  const [floristStyle, setFloristStyle] = useState('hand-bouquet');
  const [floristFlower, setFloristFlower] = useState('roses');
  const [floristMaterial, setFloristMaterial] = useState('kraft-paper');
  const [floristFixes, setFloristFixes] = useState({
    petalTexture: true,
    waterRefraction: true,
    stemLogic: true,
    leafFreshness: true,
    wrappingPhysics: true,
    pollenDetail: true,
    colorHarmony: true,
    ribbonFlow: true,
    depthLayering: true,
    dewDrops: true,
  });

  // Umrah & Hajj Vision States (New)
  const [umrahPilgrim, setUmrahPilgrim] = useState('man');
  const [umrahLocation, setUmrahLocation] = useState('kaaba');
  const [umrahShot, setUmrahShot] = useState('portrait');
  const [umrahFixes, setUmrahFixes] = useState({
    ihramRealism: true,
    kaabaTexture: true,
    marbleReflect: true,
    hijabLayering: true,
    umbrellaMech: true,
    crowdFlow: true,
    handGesture: true,
    archAccuracy: true,
    ihramBelt: true,
    faceSerenity: true
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
  const isSneakerLab = config.id === AppMode.SNEAKER_LAB;
  const isNailArt = config.id === AppMode.NAIL_ART;
  const isTerrarium = config.id === AppMode.TERRARIUM_BUILDER;
  const isCeramic = config.id === AppMode.CERAMIC_POTTERY;
  const isFlorist = config.id === AppMode.FLORIST_ATELIER;
  const isUmrah = config.id === AppMode.UMRAH_HAJJ;

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
    } else if (isSneakerLab) {
        options = { style: sneakerStyle, material: sneakerMaterial, colorway: sneakerColor, fixes: sneakerFixes } as SneakerLabOptions;
    } else if (isNailArt) {
        options = { style: nailStyle, length: nailLength, finish: nailFinish, fixes: nailFixes } as NailArtOptions;
    } else if (isTerrarium) {
        options = { container: terraContainer, ecosystem: terraEco, decor: terraDecor, fixes: terraFixes } as TerrariumOptions;
    } else if (isCeramic) {
        options = { itemType: potItem, clayStyle: potClay, glazeStyle: potGlaze, fixes: potFixes } as CeramicOptions;
    } else if (isFlorist) {
        options = { style: floristStyle, flowerType: floristFlower, material: floristMaterial, fixes: floristFixes } as FloristOptions;
    } else if (isUmrah) {
        options = { pilgrimType: umrahPilgrim, location: umrahLocation, shotType: umrahShot, fixes: umrahFixes } as UmrahHajjOptions;
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
  const toggleSneakerFix = (key: keyof typeof sneakerFixes) => setSneakerFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleNailFix = (key: keyof typeof nailFixes) => setNailFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleTerraFix = (key: keyof typeof terraFixes) => setTerraFixes(prev => ({...prev, [key]: !prev[key]}));
  const togglePotFix = (key: keyof typeof potFixes) => setPotFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleFloristFix = (key: keyof typeof floristFixes) => setFloristFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleUmrahFix = (key: keyof typeof umrahFixes) => setUmrahFixes(prev => ({...prev, [key]: !prev[key]}));

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
                        {!isFamily && !isProduct && !isTerrarium && !isCeramic && !isFlorist && !isUmrah && (config.inputType === 'single-image' || config.inputType === 'dual-image') && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                    <ImageIcon size={14} className="text-indigo-500" />
                                    {isPhotoshoot ? 'Product Reference' : 
                                     (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar || isSneakerLab || isNailArt || isUmrah) 
                                     ? 'Input Image' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar || isSneakerLab || isNailArt || isUmrah) ? 'Upload Source' : 'Reference Image')}
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

                        {/* --- TERRARIUM BUILDER UI --- */}
                        {isTerrarium && (
                            <div className="bg-green-50/50 p-5 rounded-xl border border-green-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-green-800 uppercase tracking-widest flex items-center gap-2">
                                    <Sprout size={14} /> Mini Ecosystem Lab
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Container Shape</label>
                                        <select value={terraContainer} onChange={(e) => setTerraContainer(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="jar">Mason Jar (Vintage)</option>
                                            <option value="bulb">Light Bulb</option>
                                            <option value="geometric">Geometric Prism (Polyhedron)</option>
                                            <option value="aquarium">Mini Aquarium Cube</option>
                                            <option value="bottle">Wine Bottle (Narrow Neck)</option>
                                            <option value="teardrop">Teardrop Hanging Glass</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Ecosystem Type</label>
                                        <select value={terraEco} onChange={(e) => setTerraEco(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="tropical">Tropical (Moss, Ferns, Fittonia)</option>
                                            <option value="desert">Desert (Succulents, Cacti, Sand)</option>
                                            <option value="aquatic">Aquatic (Marimo, Water Plants)</option>
                                            <option value="carnivorous">Carnivorous Bog (Venus Flytrap)</option>
                                            <option value="forest">Temperate Forest (Bark, Lichen)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Decor Element</label>
                                        <select value={terraDecor} onChange={(e) => setTerraDecor(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="stones">River Stones / Pebbles</option>
                                            <option value="driftwood">Miniature Driftwood</option>
                                            <option value="crystals">Raw Crystals / Geodes</option>
                                            <option value="house">Tiny House / Cottage</option>
                                            <option value="figurine">Ghibli Style Figurine</option>
                                            <option value="ruins">Ancient Ruins</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-green-200/50">
                                    <h4 className="text-[10px] font-bold text-green-600 uppercase mb-2">Physics & Biology Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(terraFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleTerraFix(key as keyof typeof terraFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- CERAMIC POTTERY UI --- */}
                        {isCeramic && (
                            <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-2">
                                    <Disc size={14} /> Ceramic & Pottery Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Item Type</label>
                                        <select value={potItem} onChange={(e) => setPotItem(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="vase">Flower Vase</option>
                                            <option value="mug">Coffee Mug</option>
                                            <option value="bowl">Ramen Bowl</option>
                                            <option value="plate">Dinner Plate</option>
                                            <option value="plant-pot">Plant Pot (Planter)</option>
                                            <option value="tea-set">Tea Set (Teapot + Cups)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Clay Style</label>
                                        <select value={potClay} onChange={(e) => setPotClay(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="terracotta">Terracotta (Red Earthy)</option>
                                            <option value="porcelain">Porcelain (White Delicate)</option>
                                            <option value="stoneware">Stoneware (Speckled)</option>
                                            <option value="raku">Raku (Burnt/Iridescent)</option>
                                            <option value="black-clay">Black Clay</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Glaze Technique</label>
                                        <select value={potGlaze} onChange={(e) => setPotGlaze(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="drip">Drip Glaze (Lelehan)</option>
                                            <option value="crackle">Crackle Glaze (Retak Seribu)</option>
                                            <option value="matte">Matte Finish (No Shine)</option>
                                            <option value="celadon">Celadon (Jade Green)</option>
                                            <option value="crystalline">Crystalline (Starry)</option>
                                            <option value="unglazed">Unglazed (Raw)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-amber-200/50">
                                    <h4 className="text-[10px] font-bold text-amber-600 uppercase mb-2">Wheel & Kiln Physics Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(potFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => togglePotFix(key as keyof typeof potFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- FLORIST ATELIER UI --- */}
                        {isFlorist && (
                            <div className="bg-rose-50/50 p-5 rounded-xl border border-rose-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-rose-800 uppercase tracking-widest flex items-center gap-2">
                                    <Flower size={14} /> Florist Atelier
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Arrangement Style</label>
                                        <select value={floristStyle} onChange={(e) => setFloristStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="hand-bouquet">Hand Bouquet (Wrapped)</option>
                                            <option value="table-vase">Table Vase Arrangement</option>
                                            <option value="flower-box">Luxury Flower Box</option>
                                            <option value="standing">Standing Flower (Papan/Rak)</option>
                                            <option value="bridal">Bridal Bouquet (Compact)</option>
                                            <option value="boutonniere">Boutonniere (Jas Pria)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Flower</label>
                                        <select value={floristFlower} onChange={(e) => setFloristFlower(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="roses">Roses (Mawar)</option>
                                            <option value="tulips">Tulips (Belanda)</option>
                                            <option value="peonies">Peonies (Mewah)</option>
                                            <option value="lilies">Lilies (Besar)</option>
                                            <option value="wildflowers">Mixed Wildflowers (Rustic)</option>
                                            <option value="orchids">Orchids (Anggrek)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Wrapping / Vase</label>
                                        <select value={floristMaterial} onChange={(e) => setFloristMaterial(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="kraft-paper">Brown Kraft Paper (Rustic)</option>
                                            <option value="clear-glass">Clear Glass Vase</option>
                                            <option value="ceramic">White Ceramic Vase</option>
                                            <option value="velvet-box">Round Velvet Box</option>
                                            <option value="korean-paper">Korean Waterproof Paper (Pastel)</option>
                                            <option value="burlap">Burlap / Goni</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-rose-200/50">
                                    <h4 className="text-[10px] font-bold text-rose-600 uppercase mb-2">Botanical Realism Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(floristFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleFloristFix(key as keyof typeof floristFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- UMRAH & HAJJ VISION UI --- */}
                        {isUmrah && (
                            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                                    <Moon size={14} /> Umrah & Hajj Vision
                                </h3>
                                {/* Image Uploader for Face Swap */}
                                <div className="mb-4">
                                    <ImageUploader 
                                        label="Upload Face Photo (Selfie)"
                                        imageFile={image1}
                                        onFileChange={setImage1}
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2 text-center">
                                        *Upload a clear selfie to visualize yourself in the Holy Land.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Pilgrim Type</label>
                                        <select value={umrahPilgrim} onChange={(e) => setUmrahPilgrim(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="man">Man (Ihram Clothing)</option>
                                            <option value="woman">Woman (Abaya/Hijab)</option>
                                            <option value="couple">Couple (Husband & Wife)</option>
                                            <option value="family">Family (Parents + Kids)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Location</label>
                                        <select value={umrahLocation} onChange={(e) => setUmrahLocation(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="kaaba">Makkah - Kaaba (Mataf)</option>
                                            <option value="nabawi">Madinah - Masjid Nabawi</option>
                                            <option value="jabal-rahmah">Arafah - Jabal Rahmah</option>
                                            <option value="quba">Masjid Quba</option>
                                            <option value="taif">Taif Mountains</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Shot Type</label>
                                        <select value={umrahShot} onChange={(e) => setUmrahShot(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="portrait">Close-up Portrait (Peaceful)</option>
                                            <option value="dua">Raising Hands in Dua</option>
                                            <option value="walking">Walking / Tawaf</option>
                                            <option value="crowd">Amidst the Crowd</option>
                                            <option value="sujud">Sujud / Prostration</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-emerald-200/50">
                                    <h4 className="text-[10px] font-bold text-emerald-600 uppercase mb-2">Spiritual Accuracy & Physics Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(umrahFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleUmrahFix(key as keyof typeof umrahFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- SNEAKER LAB UI --- */}
                        {isSneakerLab && (
                            <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-orange-800 uppercase tracking-widest flex items-center gap-2">
                                    <Footprints size={14} /> Custom Sneaker Laboratory
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Silhouette Style</label>
                                        <select value={sneakerStyle} onChange={(e) => setSneakerStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="high-top">High-Top (Jordan Style)</option>
                                            <option value="low-top">Low-Top (Dunk Style)</option>
                                            <option value="runner">Retro Runner (New Balance Style)</option>
                                            <option value="chunky">Chunky / Dad Shoe</option>
                                            <option value="futuristic">Futuristic / YZY Style</option>
                                            <option value="skate">Skate Shoe (Vans Style)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Primary Material</label>
                                        <select value={sneakerMaterial} onChange={(e) => setSneakerMaterial(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="leather">Premium Leather</option>
                                            <option value="suede">Hairy Suede</option>
                                            <option value="knit">Flyknit / Primeknit</option>
                                            <option value="canvas">Canvas</option>
                                            <option value="patent">Patent Leather (Glossy)</option>
                                            <option value="mesh">Sport Mesh</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Colorway Theme</label>
                                        <select value={sneakerColor} onChange={(e) => setSneakerColor(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="panda">Black & White (Panda)</option>
                                            <option value="triple-black">Triple Black</option>
                                            <option value="triple-white">Triple White</option>
                                            <option value="chicago">Red/White/Black (Chicago)</option>
                                            <option value="pastel">Pastel / Easter</option>
                                            <option value="neon">Neon / Cyberpunk</option>
                                            <option value="earth">Earth Tones (Travis Style)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-orange-200/50">
                                    <h4 className="text-[10px] font-bold text-orange-600 uppercase mb-2">Quality Check (Blind Spot Fixes)</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(sneakerFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleSneakerFix(key as keyof typeof sneakerFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- NAIL ART STUDIO UI --- */}
                        {isNailArt && (
                            <div className="bg-pink-50/50 p-5 rounded-xl border border-pink-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-pink-800 uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={14} /> Nail Art Studio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Nail Style</label>
                                        <select value={nailStyle} onChange={(e) => setNailStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="solid">Solid Color</option>
                                            <option value="french-tip">French Tip (Classic/Modern)</option>
                                            <option value="ombre">Ombre / Gradient</option>
                                            <option value="chrome">Chrome / Metallic</option>
                                            <option value="cat-eye">Cat Eye (Magnetic)</option>
                                            <option value="3d-art">3D Art / Charms</option>
                                            <option value="marble">Marble Stone</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Shape & Length</label>
                                        <select value={nailLength} onChange={(e) => setNailLength(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="short-square">Short Square</option>
                                            <option value="short-oval">Short Oval</option>
                                            <option value="medium-almond">Medium Almond</option>
                                            <option value="medium-coffin">Medium Coffin</option>
                                            <option value="long-stiletto">Long Stiletto</option>
                                            <option value="long-coffin">Long Coffin</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Finish</label>
                                        <select value={nailFinish} onChange={(e) => setNailFinish(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="glossy">High Gloss (Gel)</option>
                                            <option value="matte">Matte / Velvet</option>
                                            <option value="shimmer">Shimmer / Pearl</option>
                                            <option value="glitter">Chunky Glitter</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2 pt-2 border-t border-pink-200/50">
                                    <h4 className="text-[10px] font-bold text-pink-600 uppercase mb-2">Anatomy & Physics Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(nailFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleNailFix(key as keyof typeof nailFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-pink-100 text-pink-800 border-pink-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
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
                                <div className="space-y-4 pt-2 border-t border-blue-200/50">
                                    {/* Group: Bodywork */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Bodywork & Paint</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['panelGap', 'reflectionMatch', 'symmetryLock', 'carbonScale', 'plateWarp'].map(key => (
                                                <button key={key} onClick={() => toggleCarFix(key as keyof typeof carFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${carFixes[key as keyof typeof carFixes] ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                    {carFixes[key as keyof typeof carFixes] ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Group: Wheels */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Wheels & Stance</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['camberLogic', 'lugNutCount', 'brakeCaliper', 'tireTread', 'wheelWellDepth'].map(key => (
                                                <button key={key} onClick={() => toggleCarFix(key as keyof typeof carFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${carFixes[key as keyof typeof carFixes] ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                    {carFixes[key as keyof typeof carFixes] ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Group: Lighting & Glass */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Lighting & Glass</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['headlightDetail', 'taillightDepth', 'indicatorColor', 'windowTrans', 'windshieldFix'].map(key => (
                                                <button key={key} onClick={() => toggleCarFix(key as keyof typeof carFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${carFixes[key as keyof typeof carFixes] ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                    {carFixes[key as keyof typeof carFixes] ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Group: Physics */}
                                    <div>
                                        <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2">Physics & Details</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['shadowContact', 'exhaustHole', 'intercoolerVis', 'wiperLogic', 'groundClearance'].map(key => (
                                                <button key={key} onClick={() => toggleCarFix(key as keyof typeof carFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${carFixes[key as keyof typeof carFixes] ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                    {carFixes[key as keyof typeof carFixes] ? <CheckIcon /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
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