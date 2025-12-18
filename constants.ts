import { AppMode, ModeConfig } from './types';

export const MODES: ModeConfig[] = [
  // --- Studio Utama ---
  { 
    id: AppMode.TEXT_TO_IMAGE, 
    label: 'Text to Image', 
    category: 'Studio Utama', 
    description: 'Generate high-quality images from text prompts.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the image you want to create...' 
  },
  { 
    id: AppMode.PROFESSIONAL_HEADSHOT, 
    label: 'Professional Headshot', 
    category: 'Studio Utama', 
    description: 'Generate professional business headshots.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe outfit and background...' 
  },
  { 
    id: AppMode.VIRTUAL_STAGING, 
    label: 'Virtual Staging', 
    category: 'Studio Utama', 
    description: 'Stage empty rooms with furniture and decor.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the interior style (e.g. Modern, Scandinavian)...' 
  },
  { 
    id: AppMode.PHOTO_CAROUSEL, 
    label: 'Photo Carousel', 
    category: 'Studio Utama', 
    description: 'Create a carousel of product photos.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the product setting...' 
  },
  { 
    id: AppMode.PHOTOSHOOT_AI, 
    label: 'Photoshoot AI', 
    category: 'Studio Utama', 
    description: 'Virtual photoshoot for products or models.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the shoot vibe...' 
  },

  // --- Lifestyle ---
  { 
    id: AppMode.UMRAH_HAJJ, 
    label: 'Umrah & Hajj Vision', 
    category: 'Lifestyle', 
    description: 'Visualisasikan diri Anda atau keluarga di Tanah Suci (Makkah/Madinah) dengan pakaian Ihram/Syar\'i yang akurat dan suasana spiritual.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Suasana yang diinginkan (misal: Berdoa khusyuk di depan Ka\'bah)...' 
  },
  { 
    id: AppMode.KOREA_TRAVEL, 
    label: 'Korea Traveling', 
    category: 'Lifestyle', 
    description: 'Liburan impian ke Korea Selatan. Foto keluarga/pasangan dengan Hanbok di istana kerajaan atau gaya modern di Gangnam.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Deskripsi momen (misal: Piknik musim semi di bawah pohon Sakura)...' 
  },
  { 
    id: AppMode.INDONESIA_TRAVEL, 
    label: 'Indonesia Traveling', 
    category: 'Lifestyle', 
    description: 'Jelajahi keindahan Nusantara. Foto di Borobudur, Bali, atau Raja Ampat dengan pakaian Batik, Kebaya, atau gaya liburan tropis.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Deskripsi momen (misal: Sunset di pantai Kuta dengan kelapa muda)...' 
  },
  { 
    id: AppMode.TERRARIUM_BUILDER, 
    label: 'Terrarium Builder', 
    category: 'Lifestyle', 
    description: 'Desain ekosistem miniatur di wadah kaca (botol/toples) dengan lapisan tanah dan tanaman detail.', 
    inputType: 'none', 
    promptPlaceholder: 'Konsep terrarium (misal: Hutan tropis dalam toples selai)...' 
  },
  { 
    id: AppMode.NEWBORN, 
    label: 'Newborn Photography', 
    category: 'Lifestyle', 
    description: 'Adorable newborn photography styles.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the baby pose and setting...' 
  },
  { 
    id: AppMode.PREWEDDING, 
    label: 'Prewedding', 
    category: 'Lifestyle', 
    description: 'Romantic prewedding photo concepts.', 
    inputType: 'dual-image', 
    promptPlaceholder: 'Describe the romantic scene...' 
  },
  { 
    id: AppMode.FAMILY, 
    label: 'Family Portrait', 
    category: 'Lifestyle', 
    description: 'Create harmonious family portraits.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the family setting...' 
  },
  { 
    id: AppMode.SNEAKER_LAB, 
    label: 'Sneaker Lab', 
    category: 'Lifestyle', 
    description: 'Design custom sneakers.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe your custom sneaker design...' 
  },
  { 
    id: AppMode.NAIL_ART, 
    label: 'Nail Art', 
    category: 'Lifestyle', 
    description: 'Visualize nail art designs.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the nail art style...' 
  },
  { 
    id: AppMode.CERAMIC_POTTERY, 
    label: 'Ceramic Pottery', 
    category: 'Lifestyle', 
    description: 'Design ceramic pottery.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the pottery shape and glaze...' 
  },
  { 
    id: AppMode.FLORIST_ATELIER, 
    label: 'Florist Atelier', 
    category: 'Lifestyle', 
    description: 'Arrange floral compositions.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the floral arrangement...' 
  },
  { 
    id: AppMode.MOD_MOTOR, 
    label: 'Mod Motor', 
    category: 'Lifestyle', 
    description: 'Modify motorcycle designs.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe modifications...' 
  },
  { 
    id: AppMode.MOD_CAR, 
    label: 'Mod Car', 
    category: 'Lifestyle', 
    description: 'Modify car designs.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe modifications...' 
  },

  // --- Business & Art ---
  { 
    id: AppMode.PRODUCT, 
    label: 'Product Photography', 
    category: 'Bisnis & Seni', 
    description: 'High-end product photography.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the product shot...' 
  },
  { 
    id: AppMode.LOGO_MASCOT, 
    label: 'Logo & Mascot', 
    category: 'Bisnis & Seni', 
    description: 'Create logos and brand mascots.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the brand identity...' 
  },
  { 
    id: AppMode.ARCHITECTURAL_VISION, 
    label: 'Architectural Vision', 
    category: 'Bisnis & Seni', 
    description: 'Visualize architectural concepts.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the building style...' 
  },
  { 
    id: AppMode.INDUSTRIAL_DESIGN, 
    label: 'Industrial Design', 
    category: 'Bisnis & Seni', 
    description: 'Product and industrial design visualization.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the object design...' 
  },
  { 
    id: AppMode.FASHION_EDITORIAL, 
    label: 'Fashion Editorial', 
    category: 'Bisnis & Seni', 
    description: 'High fashion editorial shots.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the fashion look...' 
  },
  { 
    id: AppMode.DOUBLE_EXPOSURE, 
    label: 'Double Exposure', 
    category: 'Bisnis & Seni', 
    description: 'Artistic double exposure effects.', 
    inputType: 'dual-image', 
    promptPlaceholder: 'Describe the two elements to blend...' 
  },

  // --- Studio Pengeditan ---
  { 
    id: AppMode.RECOVERY, 
    label: 'Photo Recovery', 
    category: 'Studio Pengeditan', 
    description: 'Restore old or damaged photos.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the damage to fix...' 
  },
  { 
    id: AppMode.DETAILING, 
    label: 'Ultra Detailing', 
    category: 'Studio Pengeditan', 
    description: 'Enhance details and resolution.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe details to enhance...' 
  },
  { 
    id: AppMode.CINEMATIC_RELIGHTING, 
    label: 'Cinematic Relighting', 
    category: 'Studio Pengeditan', 
    description: 'Change lighting and atmosphere.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the new lighting...' 
  },
  { 
    id: AppMode.ANALOG_FILM, 
    label: 'Analog Film', 
    category: 'Studio Pengeditan', 
    description: 'Apply analog film aesthetics.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the film look...' 
  },
  { 
    id: AppMode.HDR_LANDSCAPE, 
    label: 'HDR Landscape', 
    category: 'Studio Pengeditan', 
    description: 'High Dynamic Range landscapes.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the landscape enhancements...' 
  },
  { 
    id: AppMode.GEN_FILL, 
    label: 'Generative Fill', 
    category: 'Studio Pengeditan', 
    description: 'Fill missing parts or expand images.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe what to fill...' 
  },

  // --- AI Tools ---
  { 
    id: AppMode.UI_TO_CODE, 
    label: 'UI to Code', 
    category: 'AI Tools', 
    description: 'Convert UI images to code.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the desired interactivity...' 
  },
  { 
    id: AppMode.NUTRITION_TRACKER, 
    label: 'Nutrition Tracker', 
    category: 'AI Tools', 
    description: 'Analyze food images for nutrition info.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Any specific dietary questions?' 
  },
  { 
    id: AppMode.HANDWRITING_DECIPHER, 
    label: 'Handwriting Decipher', 
    category: 'AI Tools', 
    description: 'Transcribe handwritten text.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Any specific context?' 
  },
  { 
    id: AppMode.DATA_ANALYST, 
    label: 'Data Analyst', 
    category: 'AI Tools', 
    description: 'Analyze charts and data images.', 
    inputType: 'single-image', 
    promptPlaceholder: 'What insights do you need?' 
  },
  { 
    id: AppMode.DIY_REPAIR, 
    label: 'DIY Repair', 
    category: 'AI Tools', 
    description: 'Get repair instructions for items.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the issue...' 
  },
  { 
    id: AppMode.CV_AUDITOR, 
    label: 'CV Auditor', 
    category: 'AI Tools', 
    description: 'Analyze and improve your CV.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Target job role...' 
  },
  { 
    id: AppMode.PERSONAL_COLOR, 
    label: 'Personal Color', 
    category: 'AI Tools', 
    description: 'Analyze personal color palette.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe lighting conditions...' 
  },
  { 
    id: AppMode.TRAVEL_GUIDE, 
    label: 'Travel Guide', 
    category: 'AI Tools', 
    description: 'Get travel info from landmark photos.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Ask about this place...' 
  },
  
  // Fillers for others to avoid crashes
  { id: AppMode.PAINTING_GENERATOR, label: 'Painting Generator', category: 'Studio Pelukis', description: 'Generate paintings.', inputType: 'none', promptPlaceholder: 'Describe the painting...' },
  { id: AppMode.STYLE_TRANSFER, label: 'Style Transfer', category: 'Studio Pengeditan', description: 'Transfer styles.', inputType: 'dual-image', promptPlaceholder: 'Describe style...' },
];