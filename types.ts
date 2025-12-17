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
  inputType: 'none' | 'single-image' | 'dual-image';
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

// Photoshoot AI Options (New)
export interface PhotoshootOptions {
  vibe: string;
  lighting: string;
  composition: string;
  fixes: {
    autoShadow: boolean;
    colorGrade: boolean;
    depthMatch: boolean;
    smartScale: boolean;
  };
}

// Union Type for flexibility
export type GenerationOptions = CarouselOptions | PhotoshootOptions;