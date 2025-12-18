
export enum AppMode {
  TEXT_TO_IMAGE = 'text-to-image',
  INDUSTRIAL_DESIGN = 'industrial-design',
  ARCHITECTURAL_VISION = 'architectural-vision',
  FASHION_EDITORIAL = 'fashion-editorial',
  PROFESSIONAL_HEADSHOT = 'professional-headshot',
  VIRTUAL_STAGING = 'virtual-staging',
  LOGO_MASCOT = 'logo-mascot',
  DOUBLE_EXPOSURE = 'double-exposure',
  HDR_LANDSCAPE = 'hdr-landscape',
  GEN_FILL = 'gen-fill',
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
  
  // Painter
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

  // Editor
  STYLE_TRANSFER = 'style-transfer',
  VARIATION = 'variation',
  INPAINTING = 'inpainting',
  OUTPAINTING = 'outpainting',
  BACKGROUND_REMOVAL = 'background-removal',
  SWAP_BACKGROUND = 'swap-background',
  FACESWAP = 'faceswap',
  ID_CARD = 'id-card',

  // Lifestyle
  UMRAH_HAJJ = 'umrah-hajj',
  KOREA_TRAVEL = 'korea-travel',
  INDONESIA_TRAVEL = 'indonesia-travel',
  TERRARIUM_BUILDER = 'terrarium-builder',
  CERAMIC_POTTERY = 'ceramic-pottery',
  FLORIST_ATELIER = 'florist-atelier',
  SNEAKER_LAB = 'sneaker-lab',
  NAIL_ART = 'nail-art',
  MOD_MOTOR = 'mod-motor',
  MOD_CAR = 'mod-car',
  HAIRSTYLE = 'hairstyle',
  TATTOO = 'tattoo',
  PET_STUDIO = 'pet-studio',
  FOOD_STYLIST = 'food-stylist',
  AVATAR_3D = 'avatar-3d',
  COSPLAY = 'cosplay',
  PIXEL_ART = 'pixel-art',
  JEWELRY = 'jewelry',
  COMIC = 'comic',

  // Business & Art
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
  UI_TO_CODE = 'ui-to-code',
  NUTRITION_TRACKER = 'nutrition-tracker',
  HANDWRITING_DECIPHER = 'handwriting-decipher',
  DATA_ANALYST = 'data-analyst',
  DIY_REPAIR = 'diy-repair',
  VINTAGE_ID = 'vintage-id',
  CV_AUDITOR = 'cv-auditor',
  TRAVEL_GUIDE = 'travel-guide',
  PERSONAL_COLOR = 'personal-color',
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
  inputType: 'none' | 'single-image' | 'dual-image' | 'multi-image';
  promptPlaceholder: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface CarouselOptions { lighting: string; angle: string; fixes: Record<string, boolean>; }
export interface PhotoshootOptions { vibe: string; lighting: string; composition: string; modelGaze: string; gripType: string; fixes: Record<string, boolean>; }
export interface NewbornOptions { pose: string; setting: string; skinTone: string; state: string; fixes: Record<string, boolean>; }
export interface PreweddingOptions { visualStyle: string; theme: string; timeOfDay: string; shotType: string; fixes: Record<string, boolean>; }
export interface FamilyOptions { familyType: string; setting: string; outfitStyle: string; files?: File[]; fixes: Record<string, boolean>; }
export interface ProductOptions { materialType: string; lightingStyle: string; placement: string; files?: File[]; fixes: Record<string, boolean>; }
export interface RecoveryOptions { damageLevel: string; colorMode: string; enhanceStrength: string; fixes: Record<string, boolean>; }
export interface DetailingOptions { resolutionTarget: string; creativityLevel: string; sharpnessMode: string; fixes: Record<string, boolean>; }
export interface CinematicRelightingOptions { lightingStyle: string; colorGrade: string; lensType: string; fixes: Record<string, boolean>; }
export interface AnalogFilmOptions { filmStock: string; filmFormat: string; fixes: Record<string, boolean>; }
export interface HeadshotOptions { outfit: string; background: string; fixes: Record<string, boolean>; }
export interface StagingOptions { roomType: string; style: string; fixes: Record<string, boolean>; }
export interface DoubleExposureOptions { blendMode: string; secondaryElement: string; fixes: Record<string, boolean>; }
export interface HDROptions { style: string; skyEnhancement: boolean; fixes: Record<string, boolean>; }
export interface GenFillOptions { direction: string; zoomLevel: string; fixes: Record<string, boolean>; }
export interface FashionEditorialOptions { editorialStyle: string; location: string; era: string; fixes: Record<string, boolean>; }
export interface LogoMascotOptions { style: string; complexity: string; fixes: Record<string, boolean>; }
export interface ArchitecturalVisionOptions { viewpoint: string; environment: string; style: string; fixes: Record<string, boolean>; }
export interface IndustrialDesignOptions { material: string; style: string; view: string; fixes: Record<string, boolean>; }
export interface PersonalColorOptions { lighting: string; hairStatus: string; veinColor: string; eyeColor: string; fixes: Record<string, boolean>; }
export interface ModMotorOptions { style: string; exhaustType: string; seatStyle: string; fixes: Record<string, boolean>; }
export interface ModCarOptions { style: string; rimType: string; suspension: string; fixes: Record<string, boolean>; }
export interface SneakerLabOptions { style: string; material: string; colorway: string; fixes: Record<string, boolean>; }
export interface NailArtOptions { style: string; length: string; finish: string; fixes: Record<string, boolean>; }
export interface TerrariumOptions { container: string; ecosystem: string; decor: string; fixes: Record<string, boolean>; }
export interface CeramicOptions { itemType: string; clayStyle: string; glazeStyle: string; fixes: Record<string, boolean>; }
export interface FloristOptions { style: string; flowerType: string; material: string; fixes: Record<string, boolean>; }
export interface UmrahHajjOptions { pilgrimType: string; location: string; shotType: string; files?: File[]; fixes: Record<string, boolean>; }
export interface KoreaTravelOptions { groupType: string; location: string; season: string; timeOfDay: string; shotType: string; attireStyle: string; files?: File[]; fixes: Record<string, boolean>; }
export interface IndonesiaTravelOptions { groupType: string; location: string; season: string; timeOfDay: string; shotType: string; attireStyle: string; files?: File[]; fixes: Record<string, boolean>; }


export type GenerationOptions = 
    | CarouselOptions 
    | PhotoshootOptions 
    | NewbornOptions 
    | PreweddingOptions 
    | FamilyOptions 
    | ProductOptions 
    | RecoveryOptions 
    | DetailingOptions 
    | CinematicRelightingOptions 
    | AnalogFilmOptions 
    | HeadshotOptions 
    | StagingOptions 
    | DoubleExposureOptions 
    | HDROptions 
    | GenFillOptions 
    | FashionEditorialOptions 
    | LogoMascotOptions 
    | ArchitecturalVisionOptions 
    | IndustrialDesignOptions 
    | PersonalColorOptions 
    | ModMotorOptions 
    | ModCarOptions 
    | SneakerLabOptions 
    | NailArtOptions 
    | TerrariumOptions 
    | CeramicOptions 
    | FloristOptions 
    | UmrahHajjOptions
    | KoreaTravelOptions
    | IndonesiaTravelOptions;
