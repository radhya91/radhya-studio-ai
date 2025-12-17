export enum AppMode {
  // Studio Utama
  TEXT_TO_IMAGE = 'text-to-image',
  PHOTO_CAROUSEL = 'photo-carousel',
  PHOTOSHOOT_AI = 'photoshoot-ai',
  NEWBORN = 'newborn',
  PREWEDDING = 'prewedding',
  FAMILY = 'family',
  PRODUCT = 'product',
  RECOVERY = 'recovery',
  DETAILING = 'detailing',
  CINEMATIC_RELIGHTING = 'cinematic-relighting',
  ANALOG_FILM = 'analog-film',

  // Studio Pelukis
  PAINTING_GENERATOR = 'painting-generator',
  PAINTING_HERITAGE = 'painting-heritage',
  PAINTING_IMPASTO = 'painting-impasto',
  PAINTING_SUMIE = 'painting-sumie',
  PAINTING_ROYAL = 'painting-royal',
  PAINTING_ANACHRONISM = 'painting-anachronism',
  PAINTING_WATERCOLOR = 'painting-watercolor',
  PAINTING_STAINED_GLASS = 'painting-stained-glass',
  PAINTING_UKIYOE = 'painting-ukiyoe',
  PAINTING_SURREALISM = 'painting-surrealism',
  PAINTING_CHARCOAL = 'painting-charcoal',
  PAINTING_MOSAIC = 'painting-mosaic',
  PAINTING_STREET_ART = 'painting-street-art',
  PAINTING_PAPER_CUTOUT = 'painting-paper-cutout',
  PAINTING_DOODLE = 'painting-doodle',

  // Studio Pengeditan
  STYLE_TRANSFER = 'style-transfer',
  VARIATION = 'variation',
  INPAINTING = 'in-painting',
  OUTPAINTING = 'out-painting',
  BACKGROUND_REMOVAL = 'background-removal',
  SWAP_BACKGROUND = 'swap-background',
  FACESWAP = 'faceswap',
  ID_CARD = 'id-card',

  // Lifestyle
  HAIRSTYLE = 'hairstyle',
  TATTOO = 'tattoo',
  PET_STUDIO = 'pet-studio',
  FOOD_STYLIST = 'food-stylist',
  VEHICLE = 'vehicle',
  AVATAR_3D = 'avatar-3d',
  COSPLAY = 'cosplay',
  PIXEL_ART = 'pixel-art',
  JEWELRY = 'jewelry',
  COMIC = 'comic',

  // Bisnis & Seni
  MOCKUP = 'mockup',
  THUMBNAIL = 'thumbnail',
  VECTOR = 'vector',
  CHARSHEET = 'charsheet',
  COLORING = 'coloring',
  MAKEUP = 'makeup',
  POPART = 'popart',
  CYBERPUNK = 'cyberpunk',
  MEME = 'meme',
  PACKAGING_DESIGN = 'packaging-design',
  FASHION_SKETCH = 'fashion-sketch',

  // AI Tools
  PROMPT_IDEA = 'prompt-idea',
  IMAGE_DESC = 'image-desc',
  REVERSE_PROMPT = 'reverse-prompt',
  SOCIAL_MANAGER = 'social-manager',
  AI_CRITIC = 'ai-critic',
  COLOR_PALETTE = 'color-palette',
  STORYTELLER = 'storyteller',
  OCR = 'ocr',
  FOOD_TO_RECIPE = 'food-to-recipe',
  MATH_SOLVER = 'math-solver',
  PLANT_CARE = 'plant-care',
}

export interface ModeConfig {
  id: AppMode;
  label: string;
  category: string;
  description: string;
  inputType: 'none' | 'single-image' | 'dual-image' | 'multi-image'; // Added multi-image
  promptPlaceholder: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface GenerationResult {
  images: GeneratedImage[];
  text: string;
}

// Photo Carousel Options
export interface CarouselOptions {
  lighting: string;
  angle: string;
  fixes: {
    gravity: boolean;
    lensCorrection: boolean;
    textureBoost: boolean;
    colorFidelity: boolean;
    superSharp: boolean;
  };
}

// Photoshoot AI Options
export interface PhotoshootOptions {
  vibe: string;
  lighting: string;
  composition: string;
  modelGaze: string;
  gripType: string;
  fixes: {
    autoShadow: boolean;
    colorGrade: boolean;
    depthMatch: boolean;
    smartScale: boolean;
    displacementFix: boolean;
    spectralReflections: boolean;
    caustics: boolean;
    grainMatch: boolean;
    dynamicBlur: boolean;
    fabricDrape: boolean;
    clearBranding: boolean;
  };
}

// Newborn Options (New)
export interface NewbornOptions {
  pose: string;
  setting: string;
  skinTone: string;
  state: string; // Asleep vs Awake
  fixes: {
    // Basic
    softSkin: boolean;
    safetyComposite: boolean;
    squishLogic: boolean;
    reduceRedness: boolean;
    propScale: boolean;
    softFocus: boolean;
    
    // Expert (The 10 New Blind Spots)
    hipJointFix: boolean;
    diaperVolume: boolean;
    fabricTension: boolean;
    handScale: boolean;
    naturalHairline: boolean;
    umbilicalRealism: boolean;
    circulationColor: boolean;
    complexBokeh: boolean;
    eyeReflection: boolean;
    lipTexture: boolean;
  };
}

// Prewedding Options (New - 30 Blind Spots + Documentary Style)
export interface PreweddingOptions {
  visualStyle: 'cinematic' | 'documentary' | 'editorial'; // New Style Selector
  theme: string;
  timeOfDay: string;
  shotType: string;
  fixes: {
    // 1. Chemistry & Anatomy
    handContact: boolean;
    eyeContact: boolean;
    heightLogic: boolean;
    kissPhysics: boolean;
    ringDetail: boolean;
    
    // 2. Fashion & Physics
    windConsistency: boolean;
    fabricTexture: boolean;
    dressFlow: boolean;
    veilTransparency: boolean;
    groundContact: boolean;
    
    // 3. Environment & Light
    shadowSync: boolean;
    horizonFix: boolean;
    waterReflection: boolean;
    weatherInteraction: boolean;
    goldenHourRealism: boolean;

    // 4. Cinematic Technicals
    skinToneMatch: boolean;
    depthPlane: boolean;
    filmGrain: boolean;
    dynamicFraming: boolean;
    colorHarmony: boolean;

    // 5. Documentary / Storytelling Specials (New)
    candidMoment: boolean; // Anti-pose, looking away/laughing
    motionBlurArt: boolean; // Shutter drag effect
    rawImperfection: boolean; // Messy hair/clothes logic
    flashPhotography: boolean; // Direct flash style
  };
}

// Family Options (New for Big Family - 26 Total Blind Spots)
export interface FamilyOptions {
  familyType: 'nuclear' | 'big-family' | 'multi-gen';
  setting: string;
  outfitStyle: string;
  files?: File[]; // Support for multiple files
  fixes: {
    // 1. Composition & Group Dynamics (6)
    faceFidelityBackRow: boolean;
    heightSorting: boolean; // Tall in back
    eyeContactSync: boolean;
    uniformLighting: boolean;
    generationLogic: boolean; // Grandparents look old
    rowDepthLogic: boolean; // Back row slightly smaller/blurrier

    // 2. Anatomy & Identity (5)
    twinEffectFix: boolean; // Prevent copy-paste faces
    headSizeConsistency: boolean; // Heads relative to body size
    teethRealism: boolean; // Natural smiles, no piano keys
    handCountLogic: boolean; // Max 2 hands per person
    lazyEyeFix: boolean; // Symmetrical gaze

    // 3. Posing & Interaction (5)
    hoverHandFix: boolean; // Hands firmly on shoulders
    postureSlouchFix: boolean; // Elderly posture vs Kids
    kidInteraction: boolean; // Kids held or sitting, not floating
    chairLogic: boolean; // Sitting ON chairs, not floating
    footGrounding: boolean; // Feet firmly on floor

    // 4. Fashion & Details (5)
    shoeConsistency: boolean; // Everyone wearing shoes
    patternClashFix: boolean; // Avoid moire patterns
    jewelryHallucination: boolean; // No floating jewelry
    glassesGlareFix: boolean; // Eyes visible behind glasses
    fabricDrapeSitting: boolean; // Clothes fold when sitting

    // 5. Environment (5)
    shadowConsistency: boolean; // Shadows fall same way
    backgroundSeparation: boolean; // Hair vs dark background
    floorTexture: boolean; // Consistent carpet/wood
    atmosphereAiry: boolean; // Depth in room
    proportionLogic: boolean; // Adults vs Kids size ratio
  };
}

// Product Options (New - 30 Blind Spots)
export interface ProductOptions {
  materialType: string;
  lightingStyle: string;
  placement: string;
  files?: File[]; // Added support for multi-image
  fixes: {
    // Group 1: Physics & Geometry (6)
    gravityFix: boolean; // No floating products
    perspectiveCorrect: boolean; // Straight lines
    scaleLogic: boolean; // Relative size to props
    surfaceContact: boolean; // Realistic shadow base
    lensDistortionFix: boolean; // No fish-eye
    symmetryLock: boolean; // Perfectly symmetrical bottles

    // Group 2: Material & Texture (6)
    glassCaustics: boolean; // Light passing through glass
    metalAnisotropy: boolean; // Brushed metal realism
    liquidRefraction: boolean; // Liquid bending light
    plasticSubsurface: boolean; // Not looking painted
    fabricWeave: boolean; // High res fiber texture
    condensationDrops: boolean; // Cold drink droplets

    // Group 3: Light & Shadow (6)
    rimLighting: boolean; // Edge separation
    softboxSimulation: boolean; // Studio soft shadows
    hardSunlight: boolean; // Crisp directional shadows
    reflectionContinuity: boolean; // Env map reflection
    ambientOcclusion: boolean; // Deep corners darkening
    globalIllumination: boolean; // Bounce light

    // Group 4: Brand & Identity (6)
    logoPreservation: boolean; // Text clarity
    colorAccuracy: boolean; // Brand color fidelity
    labelFlatness: boolean; // Label curving on bottle
    negativeSpace: boolean; // Room for ad copy
    noHallucinations: boolean; // No extra objects
    cleanEdges: boolean; // Easy for cutout

    // Group 5: Composition & Aesthetics (6)
    goldenRatio: boolean; // Rule of thirds
    bokehControl: boolean; // Depth of field
    heroAngle: boolean; // Low angle dominance
    minimalistZen: boolean; // Less clutter
    colorGrading: boolean; // Commercial look
    sharpFocusStack: boolean; // Entire product in focus
  };
}

// Recovery Options (New - 20 Blind Spots)
export interface RecoveryOptions {
  damageLevel: string;
  colorMode: string;
  enhanceStrength: string;
  fixes: {
    // Group 1: Surface Damage
    scratchKiller: boolean; // Remove scratches
    tearPatching: boolean; // Fix rips/tears
    dustSpeckle: boolean; // Remove dots
    waterDamage: boolean; // Fix stains
    tapeMark: boolean; // Remove tape residue

    // Group 2: Face & Identity
    faceIdentityLock: boolean; // Don't change person
    irisClarity: boolean; // Fix eyes
    naturalTeeth: boolean; // Fix smile
    hairTexture: boolean; // Fix hair blobs
    earStructure: boolean; // Fix ears

    // Group 3: Color & Tone
    deepColorization: boolean; // B&W to Color
    sepiaNeutralizer: boolean; // Remove yellow
    fadedInk: boolean; // Boost contrast
    skinToneBalance: boolean; // Fix waxiness
    redEyeFix: boolean; // Flash repair

    // Group 4: Digital Quality
    motionBlur: boolean; // Fix shake
    softFocus: boolean; // Sharpening
    isoGrain: boolean; // De-noise
    jpegArtifacts: boolean; // De-block
    textureUpscale: boolean; // 4k Texture
  };
}

// Detailing Options (New - 25 Blind Spots)
export interface DetailingOptions {
  resolutionTarget: string; // 2K, 4K, 8K
  creativityLevel: string; // Faithful vs Hallucinate Detail
  sharpnessMode: string; // Soft, Natural, Razor
  fixes: {
    // Group 1: Skin & Biological (5)
    poreSynthesis: boolean; // Generate realistic pores
    irisPattern: boolean; // Complex eye details
    hairStrandSeparation: boolean; // No hair clumps
    nailTexture: boolean; // Realistic nail beds/shine
    wrinkleDepth: boolean; // Realistic aging (not flat)

    // Group 2: Material & Fabric (5)
    fabricWeaveMicro: boolean; // See the threads
    leatherGrain: boolean; // Organic leather texture
    metalBrushing: boolean; // Scratches on metal
    woodVeins: boolean; // Wood fiber details
    paperRoughness: boolean; // Paper texture

    // Group 3: Environment & Nature (5)
    foliageVeins: boolean; // Leaf structures
    brickMortar: boolean; // Stone/Brick texture
    asphaltGrain: boolean; // Road texture
    waterRipples: boolean; // Micro-surface tension
    cloudVolume: boolean; // Fluffy, not smoky

    // Group 4: Optical & Camera (5)
    chromaticAberrationFix: boolean; // Remove purple fringe
    cornerSharpness: boolean; // Fix lens softness
    sensorNoiseRemoval: boolean; // Remove digital static
    dynamicRangeBoost: boolean; // Recover shadow details
    whiteBalanceAuto: boolean; // Correct color cast

    // Group 5: Text & Geometry (5)
    textRestoration: boolean; // Fix blurry signs/logos
    straightLines: boolean; // Fix wobbly edges
    geometricPatternFix: boolean; // Fix moire/patterns
    silhouetteClean: boolean; // Crisp separation
    noArtifacts: boolean; // Remove AI hallucinations
  };
}

// Union Type for flexibility
export type GenerationOptions = CarouselOptions | PhotoshootOptions | NewbornOptions | PreweddingOptions | FamilyOptions | ProductOptions | RecoveryOptions | DetailingOptions;