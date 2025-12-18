import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Type, Square, RectangleHorizontal, RectangleVertical, Settings2, Trash2, Camera, Sun, Zap, Crosshair, Box, Palette, Aperture, Users, Mountain, Building2, Armchair, Hand, Eye, Layers, Fingerprint, Baby, Heart, ShieldCheck, Moon, Microscope, ScanFace, Scale, Video, CloudRain, Wind, UserCheck, Flame, Infinity, Clapperboard, Film, Users2, Home, Shirt, UploadCloud, X, Footprints, Smile, UserPlus, Droplets, Target, ShoppingBag, History, Bandage, User, Wand2, ZoomIn, Cpu, Maximize2, Lightbulb, Scissors, Briefcase, Expand, PenTool, Wrench, Car, Sprout, Disc, Flower, Compass, Plane, Check, MapPin } from 'lucide-react';
import { ModeConfig, GeneratedImage, AppMode, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, FashionEditorialOptions, LogoMascotOptions, ArchitecturalVisionOptions, IndustrialDesignOptions, GenerationOptions, PersonalColorOptions, ModMotorOptions, ModCarOptions, SneakerLabOptions, NailArtOptions, TerrariumOptions, CeramicOptions, FloristOptions, UmrahHajjOptions, KoreaTravelOptions, IndonesiaTravelOptions } from '../types';
import ImageUploader from './ImageUploader';
import Gallery from './Gallery';

// Alias CheckIcon to Check
const CheckIcon = Check;

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

  // Multi-Image State for Umrah Family Mode
  const [umrahImages, setUmrahImages] = useState<File[]>([]);
  const umrahFileInputRef = useRef<HTMLInputElement>(null);

  // Multi-Image State for Korea Travel Mode
  const [koreaImages, setKoreaImages] = useState<File[]>([]);
  const koreaFileInputRef = useRef<HTMLInputElement>(null);

  // Multi-Image State for Indonesia Travel Mode
  const [indoImages, setIndoImages] = useState<File[]>([]);
  const indoFileInputRef = useRef<HTMLInputElement>(null);

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
    gravityFix: true,
    perspectiveCorrect: true,
    scaleLogic: true,
    surfaceContact: true,
    lensDistortionFix: true,
    symmetryLock: true,
    glassCaustics: true,
    metalAnisotropy: true,
    liquidRefraction: true,
    plasticSubsurface: true,
    fabricWeave: true,
    condensationDrops: false,
    rimLighting: true,
    softboxSimulation: true,
    hardSunlight: false,
    reflectionContinuity: true,
    ambientOcclusion: true,
    globalIllumination: true,
    logoPreservation: true,
    colorAccuracy: true,
    labelFlatness: true,
    negativeSpace: false,
    noHallucinations: true,
    cleanEdges: true,
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
  const [hsOutfit, setHsOutfit] = useState('suit');
  const [hsBackground, setHsBackground] = useState('office');
  const [hsFixes, setHsFixes] = useState({
    skinTexture: true,
    eyeContact: true,
    lightingMatch: true,
    hairCleanup: true
  });

  const [stgRoom, setStgRoom] = useState('living');
  const [stgStyle, setStgStyle] = useState('modern');
  const [stgFixes, setStgFixes] = useState({
    perspectiveMatch: true,
    shadowCast: true,
    scaleLogic: true,
    colorHarmony: true
  });

  const [deBlend, setDeBlend] = useState('silhouette');
  const [deSecond, setDeSecond] = useState('nature');
  const [deFixes, setDeFixes] = useState({
    edgeDetection: true,
    contrastBoost: true,
    colorGrade: true
  });

  const [hdrStyle, setHdrStyle] = useState('natural');
  const [hdrSky, setHdrSky] = useState(true);
  const [hdrFixes, setHdrFixes] = useState({
    shadowRecovery: true,
    highlightSave: true,
    saturationBoost: true,
    noiseReduction: true
  });

  const [gfDir, setGfDir] = useState('horizontal');
  const [gfZoom, setGfZoom] = useState('1.5x');
  const [gfFixes, setGfFixes] = useState({
    seamlessTransition: true,
    resolutionMatch: true,
    lightingConsistency: true
  });

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

  const [logoStyle, setLogoStyle] = useState('mascot');
  const [logoComplexity, setLogoComplexity] = useState('simple');
  const [logoFixes, setLogoFixes] = useState({
    vectorFlatness: true,
    negativeSpaceBalance: true,
    colorPaletteLimit: true,
    mascotExpressiveness: true,
    printReadiness: true
  });

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

  const [koreaGroup, setKoreaGroup] = useState('solo');
  const [koreaLocation, setKoreaLocation] = useState('gyeongbokgung');
  const [koreaSeason, setKoreaSeason] = useState('spring');
  const [koreaTime, setKoreaTime] = useState('day');
  const [koreaShot, setKoreaShot] = useState('portrait');
  const [koreaAttire, setKoreaAttire] = useState('auto');
  const [koreaFixes, setKoreaFixes] = useState({
    glassSkin: true,
    hanbokVolume: true,
    dancheongPattern: true,
    cherryBlossomDensity: true,
    fingerHeart: false,
    coupleHarmony: true,
    architecturalScale: true,
    bokehCity: true,
    hairStyleLogic: true,
    naturalLighting: true,
  });

  // Indonesia Travel States
  const [indoGroup, setIndoGroup] = useState('solo');
  const [indoLocation, setIndoLocation] = useState('borobudur');
  const [indoSeason, setIndoSeason] = useState('dry-season');
  const [indoTime, setIndoTime] = useState('day');
  const [indoShot, setIndoShot] = useState('portrait');
  const [indoAttire, setIndoAttire] = useState('auto');
  const [indoFixes, setIndoFixes] = useState({
    tropicalLighting: true,
    batikDetail: true,
    skinTexture: true,
    lushGreenery: true,
    waterRefraction: true,
    cloudVolume: true,
    architecturalDetail: true,
    sunGlare: true,
    naturalVibe: true,
    heatHaze: false,
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
  const isKoreaTravel = config.id === AppMode.KOREA_TRAVEL;
  const isIndonesiaTravel = config.id === AppMode.INDONESIA_TRAVEL;

  useEffect(() => {
    // Reset inputs only when mode changes, not when generating
    setPrompt('');
    setImage1(null);
    setImage2(null);
    setFamilyImages([]);
    setProductImages([]);
    setUmrahImages([]);
    setKoreaImages([]);
    setIndoImages([]);
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
        options = { pilgrimType: umrahPilgrim, location: umrahLocation, shotType: umrahShot, files: umrahImages, fixes: umrahFixes } as UmrahHajjOptions;
    } else if (isKoreaTravel) {
        options = { groupType: koreaGroup, location: koreaLocation, season: koreaSeason, timeOfDay: koreaTime, shotType: koreaShot, attireStyle: koreaAttire, files: koreaImages, fixes: koreaFixes } as KoreaTravelOptions;
    } else if (isIndonesiaTravel) {
        options = { groupType: indoGroup, location: indoLocation, season: indoSeason, timeOfDay: indoTime, shotType: indoShot, attireStyle: indoAttire, files: indoImages, fixes: indoFixes } as IndonesiaTravelOptions;
    }

    onGenerate(prompt, image1, image2, aspectRatio, options);
  };

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
  const toggleKoreaFix = (key: keyof typeof koreaFixes) => setKoreaFixes(prev => ({...prev, [key]: !prev[key]}));
  const toggleIndoFix = (key: keyof typeof indoFixes) => setIndoFixes(prev => ({...prev, [key]: !prev[key]}));

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

  // Multi-Image Handler for Umrah Family
  const handleUmrahFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setUmrahImages(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 10); // Limit to 10 for now
        });
    }
  };

  const removeUmrahImage = (index: number) => {
    setUmrahImages(prev => prev.filter((_, i) => i !== index));
  };

  // Multi-Image Handler for Korea Travel
  const handleKoreaFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setKoreaImages(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 15); // Limit to 15
        });
    }
  };

  const removeKoreaImage = (index: number) => {
    setKoreaImages(prev => prev.filter((_, i) => i !== index));
  };

  // Multi-Image Handler for Indonesia Travel
  const handleIndoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setIndoImages(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 15); // Limit to 15
        });
    }
  };

  const removeIndoImage = (index: number) => {
    setIndoImages(prev => prev.filter((_, i) => i !== index));
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
                         {/* Standard Image Inputs (hidden for Multi-Upload Modes: Family & Product & Umrah & Korea & Indonesia) */}
                        {!isFamily && !isProduct && !isTerrarium && !isCeramic && !isFlorist && !isUmrah && !isKoreaTravel && !isIndonesiaTravel && (config.inputType === 'single-image' || config.inputType === 'dual-image') && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider">
                                    <ImageIcon size={14} className="text-indigo-500" />
                                    {isPhotoshoot ? 'Product Reference' : 
                                     (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar || isSneakerLab || isNailArt || isUmrah || isKoreaTravel || isIndonesiaTravel) 
                                     ? 'Input Image' : 'Reference Content'}
                                </label>
                            
                                <div className={`grid gap-4 ${config.inputType === 'dual-image' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                    <ImageUploader
                                        label={isPhotoshoot ? "Product Image" : (config.inputType === 'dual-image' ? 'First Image' : (isRecovery || isDetailing || isCinematicRelighting || isAnalogFilm || isHeadshot || isStaging || isDoubleExposure || isHDR || isGenFill || isFashionEditorial || isArchViz || isIndustrial || isUiToCode || isNutrition || isHandwriting || isDataAnalyst || isDiy || isVintage || isCv || isTravel || isPersonalColor || isModMotor || isModCar || isSneakerLab || isNailArt || isUmrah || isKoreaTravel || isIndonesiaTravel) ? 'Upload Source' : 'Reference Image')}
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

                        {/* --- KOREA TRAVELING VISION UI --- */}
                        {isKoreaTravel && (
                            <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-sky-800 uppercase tracking-widest flex items-center gap-2">
                                    <Plane size={14} /> Korea Traveling Vision
                                </h3>
                                
                                {/* Dynamic Uploader: Show only if NOT landscape */}
                                {koreaShot !== 'landscape' && (
                                    <>
                                        {['small-family', 'big-family', 'couple'].includes(koreaGroup) ? (
                                            <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider mb-3">
                                                    <Users size={14} className="text-sky-600" />
                                                    Upload Travelers
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                    <div 
                                                        onClick={() => koreaFileInputRef.current?.click()}
                                                        className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-sky-400 transition-colors"
                                                    >
                                                        <UserPlus size={24} className="text-gray-400 mb-1" />
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Add Photo</span>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        ref={koreaFileInputRef} 
                                                        className="hidden" 
                                                        multiple 
                                                        accept="image/*"
                                                        onChange={handleKoreaFiles}
                                                    />
                                                    {koreaImages.map((file, index) => (
                                                        <div key={index} className="aspect-square relative group rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                                            <img src={URL.createObjectURL(file)} alt="Traveler" className="w-full h-full object-cover" />
                                                            <button 
                                                                onClick={() => removeKoreaImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-2">*Upload clear face photos of everyone (Max 15).</p>
                                            </div>
                                        ) : (
                                            <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                                                <ImageUploader 
                                                    label="Upload Your Photo"
                                                    imageFile={image1}
                                                    onFileChange={setImage1}
                                                />
                                                <p className="text-[10px] text-gray-400 mt-2 text-center">
                                                    *Upload a clear selfie/portrait.
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Shot Type</label>
                                        <select value={koreaShot} onChange={(e) => setKoreaShot(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="portrait">Close-up Portrait</option>
                                            <option value="candid">Candid Moment</option>
                                            <option value="full-body">Full Body OOTD</option>
                                            <option value="landscape">Landscape Only (No People)</option>
                                        </select>
                                    </div>

                                    {/* Group Type (Disabled if Landscape) */}
                                    <div className={`space-y-2 ${koreaShot === 'landscape' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Group Type</label>
                                        <select value={koreaGroup} onChange={(e) => setKoreaGroup(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="solo">Solo Traveler</option>
                                            <option value="couple">Couple (Romantic)</option>
                                            <option value="small-family">Small Family (3-4)</option>
                                            <option value="big-family">Big Family (5+)</option>
                                        </select>
                                    </div>
                                    
                                    {/* Attire (Disabled if Landscape) */}
                                    <div className={`space-y-2 ${koreaShot === 'landscape' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Attire</label>
                                        <select value={koreaAttire} onChange={(e) => setKoreaAttire(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="auto">Auto-Match Location</option>
                                            <option value="hanbok">Traditional Hanbok</option>
                                            <option value="modern">Modern K-Fashion</option>
                                            <option value="school">K-Drama School Uniform</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Location</label>
                                        <select value={koreaLocation} onChange={(e) => setKoreaLocation(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <optgroup label="Seoul (Capital)">
                                                <option value="gyeongbokgung">Gyeongbokgung Palace</option>
                                                <option value="bukchon">Bukchon Hanok Village</option>
                                                <option value="gangnam-street">Gangnam Modern Street</option>
                                                <option value="starfield">Starfield Library (Coex)</option>
                                                <option value="hongdae">Hongdae Hipster Street</option>
                                                <option value="han-river">Han River Park (Picnic)</option>
                                                <option value="n-seoul-tower">N Seoul Tower (Namsan)</option>
                                                <option value="lotte-world-tower">Lotte World Tower (Sky Bridge)</option>
                                                <option value="ddp">Dongdaemun Design Plaza (DDP)</option>
                                                <option value="ihwa-mural">Ihwa Mural Village</option>
                                                <option value="olympic-park">Olympic Park (Lone Tree)</option>
                                            </optgroup>
                                            <optgroup label="Busan (Coastal City)">
                                                <option value="gamcheon">Gamcheon Culture Village</option>
                                                <option value="haeundae">Haeundae Beach</option>
                                                <option value="gwangalli">Gwangalli Bridge (Night View)</option>
                                                <option value="yonggungsa">Haedong Yonggungsa Temple</option>
                                                <option value="huinnyeoul">Huinnyeoul Culture Village</option>
                                            </optgroup>
                                            <optgroup label="Jeju Island (Nature)">
                                                <option value="jeju-flower">Jeju Canola/Hydrangea Field</option>
                                                <option value="seongsan">Seongsan Ilchulbong (Sunrise Peak)</option>
                                                <option value="hallasan">Hallasan National Park (Snow/Nature)</option>
                                                <option value="seopjikoji">Seopjikoji Coast</option>
                                                <option value="camellia-hill">Camellia Hill</option>
                                            </optgroup>
                                            <optgroup label="Gyeongju (Ancient History)">
                                                <option value="bulguksa">Bulguksa Temple</option>
                                                <option value="donggung-wolji">Donggung Palace & Wolji Pond</option>
                                                <option value="cheomseongdae">Cheomseongdae Observatory</option>
                                                <option value="daereungwon">Daereungwon Ancient Tombs</option>
                                            </optgroup>
                                            <optgroup label="Other Famous Spots">
                                                <option value="nami">Nami Island (Winter Sonata)</option>
                                                <option value="jeonju-hanok">Jeonju Hanok Village</option>
                                                <option value="suwon-hwaseong">Suwon Hwaseong Fortress</option>
                                                <option value="boseong-tea">Boseong Green Tea Fields</option>
                                                <option value="damyang-bamboo">Damyang Bamboo Forest</option>
                                                <option value="garden-morning-calm">Garden of Morning Calm</option>
                                                <option value="seoraksan">Seoraksan National Park</option>
                                                <option value="pocheon-art">Pocheon Art Valley</option>
                                            </optgroup>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Season</label>
                                        <select value={koreaSeason} onChange={(e) => setKoreaSeason(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="spring">Spring (Cherry Blossom)</option>
                                            <option value="autumn">Autumn (Maple/Ginkgo)</option>
                                            <option value="winter">Winter (Snowy)</option>
                                            <option value="summer">Summer (Lush Green)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Time of Day</label>
                                        <select value={koreaTime} onChange={(e) => setKoreaTime(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="day">Bright Daylight</option>
                                            <option value="sunset">Sunset (Golden Hour)</option>
                                            <option value="sunrise">Sunrise (Blue Hour)</option>
                                            <option value="night">Night Cityscape</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-sky-200/50">
                                    <h4 className="text-[10px] font-bold text-sky-600 uppercase mb-2">K-Culture Realism Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(koreaFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleKoreaFix(key as keyof typeof koreaFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-sky-100 text-sky-800 border-sky-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon size={12} /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- INDONESIA TRAVELING VISION UI --- */}
                        {isIndonesiaTravel && (
                            <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200/50 space-y-5">
                                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin size={14} /> Indonesia Traveling Vision
                                </h3>
                                
                                {/* Dynamic Uploader: Show only if NOT landscape */}
                                {indoShot !== 'landscape' && (
                                    <>
                                        {['small-family', 'big-family', 'couple'].includes(indoGroup) ? (
                                            <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                                                <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider mb-3">
                                                    <Users size={14} className="text-emerald-600" />
                                                    Upload Travelers
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                    <div 
                                                        onClick={() => indoFileInputRef.current?.click()}
                                                        className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-emerald-400 transition-colors"
                                                    >
                                                        <UserPlus size={24} className="text-gray-400 mb-1" />
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase">Add Photo</span>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        ref={indoFileInputRef} 
                                                        className="hidden" 
                                                        multiple 
                                                        accept="image/*"
                                                        onChange={handleIndoFiles}
                                                    />
                                                    {indoImages.map((file, index) => (
                                                        <div key={index} className="aspect-square relative group rounded-xl overflow-hidden shadow-sm border border-gray-200">
                                                            <img src={URL.createObjectURL(file)} alt="Traveler" className="w-full h-full object-cover" />
                                                            <button 
                                                                onClick={() => removeIndoImage(index)}
                                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-[10px] text-gray-400 mt-2">*Upload clear face photos of everyone (Max 15).</p>
                                            </div>
                                        ) : (
                                            <div className="mb-4 animate-in fade-in slide-in-from-top-2">
                                                <ImageUploader 
                                                    label="Upload Your Photo"
                                                    imageFile={image1}
                                                    onFileChange={setImage1}
                                                />
                                                <p className="text-[10px] text-gray-400 mt-2 text-center">
                                                    *Upload a clear selfie/portrait.
                                                </p>
                                            </div>
                                        )}
                                    </>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Shot Type</label>
                                        <select value={indoShot} onChange={(e) => setIndoShot(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="portrait">Close-up Portrait</option>
                                            <option value="candid">Candid Moment</option>
                                            <option value="full-body">Full Body OOTD</option>
                                            <option value="landscape">Landscape Only (No People)</option>
                                        </select>
                                    </div>

                                    {/* Group Type (Disabled if Landscape) */}
                                    <div className={`space-y-2 ${indoShot === 'landscape' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Group Type</label>
                                        <select value={indoGroup} onChange={(e) => setIndoGroup(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="solo">Solo Traveler</option>
                                            <option value="couple">Couple (Romantic)</option>
                                            <option value="small-family">Small Family (3-4)</option>
                                            <option value="big-family">Big Family (5+)</option>
                                        </select>
                                    </div>
                                    
                                    {/* Attire (Disabled if Landscape) */}
                                    <div className={`space-y-2 ${indoShot === 'landscape' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Attire</label>
                                        <select value={indoAttire} onChange={(e) => setIndoAttire(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="auto">Auto-Match Location</option>
                                            <option value="batik">Traditional Batik</option>
                                            <option value="kebaya">Kebaya Modern</option>
                                            <option value="tropical">Tropical Casual (Bali Style)</option>
                                            <option value="hiking">Hiking Gear (Mountain)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Location</label>
                                        <select value={indoLocation} onChange={(e) => setIndoLocation(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <optgroup label="Bali (Island of Gods)">
                                                <option value="tanah-lot">Tanah Lot Temple (Sunset)</option>
                                                <option value="uluwatu">Uluwatu Temple (Cliff)</option>
                                                <option value="tegallalang">Tegallalang Rice Terrace (Ubud)</option>
                                                <option value="lempuyang">Lempuyang Temple (Gates of Heaven)</option>
                                                <option value="kelingking">Kelingking Beach (Nusa Penida)</option>
                                                <option value="ulun-danu">Ulun Danu Beratan Temple</option>
                                            </optgroup>
                                            <optgroup label="Java (Heritage & City)">
                                                <option value="borobudur">Borobudur Temple (Magelang)</option>
                                                <option value="prambanan">Prambanan Temple (Yogyakarta)</option>
                                                <option value="bromo">Mount Bromo (Sunrise)</option>
                                                <option value="kawah-ijen">Kawah Ijen (Blue Fire)</option>
                                                <option value="malioboro">Malioboro Street (Yogyakarta)</option>
                                                <option value="monas">Monas (Jakarta)</option>
                                                <option value="kota-tua">Kota Tua (Jakarta Old Town)</option>
                                            </optgroup>
                                            <optgroup label="Sumatra & Nature">
                                                <option value="toba">Lake Toba (Samosir)</option>
                                                <option value="bukittinggi">Jam Gadang (Bukittinggi)</option>
                                                <option value="belitung">Tanjung Tinggi Beach (Laskar Pelangi)</option>
                                            </optgroup>
                                            <optgroup label="Eastern Indonesia (Exotic)">
                                                <option value="raja-ampat">Raja Ampat (Wayag Islands)</option>
                                                <option value="komodo">Komodo Island (Pink Beach)</option>
                                                <option value="padar">Padar Island (Labuan Bajo)</option>
                                                <option value="toraja">Tana Toraja (Tongkonan House)</option>
                                                <option value="wakatobi">Wakatobi (Underwater/Beach)</option>
                                            </optgroup>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Season</label>
                                        <select value={indoSeason} onChange={(e) => setIndoSeason(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="dry-season">Dry Season (Sunny & Bright)</option>
                                            <option value="rainy-season">Rainy Season (Overcast/Mist)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Time of Day</label>
                                        <select value={indoTime} onChange={(e) => setIndoTime(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="day">Bright Daylight</option>
                                            <option value="sunset">Sunset (Golden Hour)</option>
                                            <option value="sunrise">Sunrise (Misty)</option>
                                            <option value="night">Night Ambiance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-emerald-200/50">
                                    <h4 className="text-[10px] font-bold text-emerald-600 uppercase mb-2">Tropical Realism Fixes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(indoFixes).map(([key, active]) => (
                                            <button key={key} onClick={() => toggleIndoFix(key as keyof typeof indoFixes)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${active ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-white text-gray-400 border-gray-200'}`}>
                                                {active ? <CheckIcon size={12} /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-400"></div>} {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- SNEAKER LAB UI --- */}
                        {isSneakerLab && (
                             <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-5">
                                <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-widest flex items-center gap-2">
                                    <Footprints size={14} /> Sneaker Lab
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                     <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Style</label>
                                        <select value={sneakerStyle} onChange={(e) => setSneakerStyle(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="high-top">High Top</option>
                                            <option value="low-top">Low Top</option>
                                            <option value="chunky">Chunky</option>
                                        </select>
                                     </div>
                                      <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Material</label>
                                        <select value={sneakerMaterial} onChange={(e) => setSneakerMaterial(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="leather">Leather</option>
                                            <option value="suede">Suede</option>
                                            <option value="knit">Knit</option>
                                        </select>
                                     </div>
                                      <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Colorway</label>
                                        <select value={sneakerColor} onChange={(e) => setSneakerColor(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-gray-200">
                                            <option value="panda">Panda (B&W)</option>
                                            <option value="triple-white">Triple White</option>
                                            <option value="bred">Bred</option>
                                        </select>
                                     </div>
                                </div>
                             </div>
                        )}
                        
                        {/* Prompt Input Area */}
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wider mb-3">
                                <Sparkles size={14} className="text-indigo-500" />
                                {isImageOutput ? 'Creative Prompt' : 'Instruction / Query'}
                            </label>
                            
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={config.promptPlaceholder}
                                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all resize-none text-sm leading-relaxed"
                            />
                            
                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                <span className="text-[10px] text-gray-400 font-medium">{prompt.length} chars</span>
                            </div>
                        </div>

                         {/* Action Button */}
                        <div className="pt-2">
                            <button
                                onClick={handleGenerateClick}
                                disabled={isGenerating || (!prompt && !image1 && !image2 && familyImages.length === 0)}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                                    isGenerating 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                                }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>PROCESSING...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 size={18} />
                                        <span>GENERATE MASTERPIECE</span>
                                    </>
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                {/* Right Col: Gallery (if split view) or below on mobile */}
                {/* Note: In this layout, results are shown below or in a modal, currently handled by parent app passing props to Gallery component */}
            </div>

            {/* Results Section */}
            {(hasResults || isGenerating) && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                            <Layers size={16} className="text-indigo-600"/>
                            Generation Results
                        </h3>
                    </div>
                    
                    <Gallery 
                        images={generatedImages} 
                        textContent={textContent} 
                        onImageClick={onImageClick}
                        isLoading={isGenerating}
                    />
                </div>
            )}
        </div>
    </div>
  );
};

export default InputPanel;
