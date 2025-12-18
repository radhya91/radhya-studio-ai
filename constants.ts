import { AppMode, ModeConfig } from './types';

export const MODES: ModeConfig[] = [
  // ==========================================================================================
  // 1. STUDIO UTAMA (20 Core Features)
  // ==========================================================================================
  { 
    id: AppMode.TEXT_TO_IMAGE, 
    label: 'Text to Image', 
    category: 'Studio Utama', 
    description: 'Generasi gambar AI kualitas tinggi dari deskripsi teks sederhana.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the image you want to create...' 
  },
  { 
    id: AppMode.PROFESSIONAL_HEADSHOT, 
    label: 'Professional Headshot', 
    category: 'Studio Utama', 
    description: 'Buat foto profil bisnis profesional (LinkedIn/CV) dari selfie biasa.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe outfit (e.g., navy blue suit) and background...' 
  },
  { 
    id: AppMode.VIRTUAL_STAGING, 
    label: 'Virtual Staging', 
    category: 'Studio Utama', 
    description: 'Isi ruangan kosong dengan furnitur interior modern atau klasik.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the interior style (e.g. Modern, Scandinavian, Industrial)...' 
  },
  { 
    id: AppMode.PHOTO_CAROUSEL, 
    label: 'Photo Carousel', 
    category: 'Studio Utama', 
    description: 'Buat variasi angle produk untuk e-commerce showcase.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the product setting and ambiance...' 
  },
  { 
    id: AppMode.PHOTOSHOOT_AI, 
    label: 'Photoshoot AI', 
    category: 'Studio Utama', 
    description: 'Studio foto virtual untuk model atau produk tanpa fotografer fisik.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the shoot vibe (e.g., Luxury, Outdoor, Studio)...' 
  },
  { 
    id: AppMode.VARIATION, 
    label: 'Image Variation', 
    category: 'Studio Utama', 
    description: 'Buat variasi visual baru dari gambar referensi dengan komposisi serupa.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe changes (e.g., make it snowy, change time to night)...' 
  },
  { 
    id: AppMode.INPAINTING, 
    label: 'Magic Eraser / Fill', 
    category: 'Studio Utama', 
    description: 'Hapus objek atau isi area spesifik dengan konten baru.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe what to fill or remove...' 
  },
  { 
    id: AppMode.OUTPAINTING, 
    label: 'Outpainting (Uncrop)', 
    category: 'Studio Utama', 
    description: 'Perluas gambar di luar batas kanvas aslinya (Zoom Out).', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the surroundings to generate...' 
  },
  { 
    id: AppMode.BACKGROUND_REMOVAL, 
    label: 'Remove Background', 
    category: 'Studio Utama', 
    description: 'Hapus latar belakang gambar secara instan dan presisi.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Type "remove background" to confirm...' 
  },
  { 
    id: AppMode.SWAP_BACKGROUND, 
    label: 'Swap Background', 
    category: 'Studio Utama', 
    description: 'Ganti latar belakang foto produk/orang dengan lokasi baru.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the new background location...' 
  },
  { 
    id: AppMode.FACESWAP, 
    label: 'Face Swap', 
    category: 'Studio Utama', 
    description: 'Tukar wajah dalam foto dengan wajah target secara realistis.', 
    inputType: 'dual-image', 
    promptPlaceholder: 'Describe the desired result...' 
  },
  { 
    id: AppMode.ID_CARD, 
    label: 'ID Card Photo', 
    category: 'Studio Utama', 
    description: 'Buat pas foto resmi (latar merah/biru) dari foto kasual.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe background color (e.g., Red or Blue)...' 
  },
  { 
    id: AppMode.AVATAR_3D, 
    label: 'Avatar 3D Generator', 
    category: 'Studio Utama', 
    description: 'Ubah foto diri menjadi karakter 3D (Pixar/Disney Style).', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the 3D character style...' 
  },
  { 
    id: AppMode.LOGO_MASCOT, 
    label: 'Logo & Mascot', 
    category: 'Studio Utama', 
    description: 'Desain logo brand atau maskot karakter unik.', 
    inputType: 'none', 
    promptPlaceholder: 'Describe the brand identity and mascot...' 
  },
  { 
    id: AppMode.VECTOR, 
    label: 'Vector Art', 
    category: 'Studio Utama', 
    description: 'Konversi atau buat gambar gaya vektor flat illustration.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the vector illustration...' 
  },
  { 
    id: AppMode.ARCHITECTURAL_VISION, 
    label: 'Architectural Vision', 
    category: 'Studio Utama', 
    description: 'Visualisasi konsep arsitektur eksterior bangunan.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the building style (e.g., Futuristic, Eco-Green)...' 
  },
  { 
    id: AppMode.INDUSTRIAL_DESIGN, 
    label: 'Industrial Design', 
    category: 'Studio Utama', 
    description: 'Desain produk industri dan gadget futuristik.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the object design...' 
  },
  { 
    id: AppMode.FASHION_EDITORIAL, 
    label: 'Fashion Editorial', 
    category: 'Studio Utama', 
    description: 'Fotografi mode high-end untuk majalah atau katalog.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the fashion look and pose...' 
  },
  { 
    id: AppMode.PIXEL_ART, 
    label: 'Pixel Art', 
    category: 'Studio Utama', 
    description: 'Generasi seni piksel retro 8-bit/16-bit.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the pixel art scene...' 
  },
  { 
    id: AppMode.STYLE_TRANSFER, 
    label: 'Style Transfer', 
    category: 'Studio Utama', 
    description: 'Terapkan gaya artistik (lukisan/art) ke foto Anda.', 
    inputType: 'dual-image', 
    promptPlaceholder: 'Describe the artistic style transfer...' 
  },

  // ==========================================================================================
  // 2. STUDIO PENGEDITAN (Technical Edits)
  // ==========================================================================================
  { 
    id: AppMode.RECOVERY, 
    label: 'Photo Recovery', 
    category: 'Studio Pengeditan', 
    description: 'Restorasi foto lama yang rusak, sobek, atau buram.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the damage to fix...' 
  },
  { 
    id: AppMode.DETAILING, 
    label: 'Ultra Upscale', 
    category: 'Studio Pengeditan', 
    description: 'Tingkatkan resolusi dan detail foto (4K/8K Upscaling).', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe details to enhance...' 
  },
  { 
    id: AppMode.CINEMATIC_RELIGHTING, 
    label: 'Cinematic Relighting', 
    category: 'Studio Pengeditan', 
    description: 'Ubah pencahayaan foto menjadi dramatis atau sinematik.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the new lighting (e.g., Neon, Golden Hour)...' 
  },
  { 
    id: AppMode.ANALOG_FILM, 
    label: 'Analog Film', 
    category: 'Studio Pengeditan', 
    description: 'Simulasi efek kamera film analog (Grain, Light Leaks).', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the film look (e.g., Kodak Portra, Vintage)...' 
  },
  { 
    id: AppMode.HDR_LANDSCAPE, 
    label: 'HDR Landscape', 
    category: 'Studio Pengeditan', 
    description: 'Optimalkan foto pemandangan dengan rentang dinamis tinggi.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe the landscape enhancements...' 
  },
  { 
    id: AppMode.GEN_FILL, 
    label: 'Generative Fill', 
    category: 'Studio Pengeditan', 
    description: 'Isi area kosong cerdas berdasarkan konteks gambar.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Describe what to fill...' 
  },

  // ==========================================================================================
  // 3. STUDIO PELUKIS (Artistic Styles)
  // ==========================================================================================
  { id: AppMode.PAINTING_GENERATOR, label: 'Custom Painting', category: 'Studio Pelukis', description: 'Buat lukisan dengan gaya kustom Anda sendiri.', inputType: 'none', promptPlaceholder: 'Describe the painting style...' },
  { id: AppMode.PAINTING_HERITAGE, label: 'Indonesian Heritage', category: 'Studio Pelukis', description: 'Gaya lukisan klasik nusantara (Raden Saleh, Bali Traditional).', inputType: 'none', promptPlaceholder: 'Describe the scene...' },
  { id: AppMode.PAINTING_IMPASTO, label: 'Impasto (Thick Paint)', category: 'Studio Pelukis', description: 'Teknik cat minyak tebal dengan tekstur timbul.', inputType: 'none', promptPlaceholder: 'Describe the painting...' },
  { id: AppMode.PAINTING_WATERCOLOR, label: 'Watercolor', category: 'Studio Pelukis', description: 'Lukisan cat air yang lembut dan transparan.', inputType: 'none', promptPlaceholder: 'Describe the scene...' },
  { id: AppMode.PAINTING_SUMIE, label: 'Sumi-e Ink', category: 'Studio Pelukis', description: 'Lukisan tinta cuci gaya Asia Timur.', inputType: 'none', promptPlaceholder: 'Describe the subject...' },
  { id: AppMode.PAINTING_UKIYOE, label: 'Ukiyo-e Woodblock', category: 'Studio Pelukis', description: 'Seni cukil kayu Jepang klasik.', inputType: 'none', promptPlaceholder: 'Describe the scene...' },
  { id: AppMode.PAINTING_SURREALISM, label: 'Surrealism', category: 'Studio Pelukis', description: 'Gaya mimpi surealis (Dali/Magritte).', inputType: 'none', promptPlaceholder: 'Describe the dreamlike scene...' },
  { id: AppMode.PAINTING_CHARCOAL, label: 'Charcoal Sketch', category: 'Studio Pelukis', description: 'Sketsa arang hitam putih yang dramatis.', inputType: 'none', promptPlaceholder: 'Describe the sketch...' },
  { id: AppMode.PAINTING_MOSAIC, label: 'Mosaic Art', category: 'Studio Pelukis', description: 'Seni susunan pecahan kaca atau keramik.', inputType: 'none', promptPlaceholder: 'Describe the mosaic pattern...' },
  { id: AppMode.PAINTING_STREET_ART, label: 'Street Art / Graffiti', category: 'Studio Pelukis', description: 'Seni jalanan urban dan mural.', inputType: 'none', promptPlaceholder: 'Describe the graffiti...' },
  { id: AppMode.PAINTING_PAPER_CUTOUT, label: 'Paper Cutout', category: 'Studio Pelukis', description: 'Seni lapisan kertas potong 3D.', inputType: 'none', promptPlaceholder: 'Describe the paper craft...' },
  { id: AppMode.PAINTING_DOODLE, label: 'Doodle Art', category: 'Studio Pelukis', description: 'Seni corat-coret yang menyenangkan dan rumit.', inputType: 'none', promptPlaceholder: 'Describe the doodle...' },
  { id: AppMode.PAINTING_STAINED_GLASS, label: 'Stained Glass', category: 'Studio Pelukis', description: 'Desain kaca patri jendela gereja.', inputType: 'none', promptPlaceholder: 'Describe the glass design...' },
  { id: AppMode.PAINTING_ROYAL, label: 'Royal Portrait', category: 'Studio Pelukis', description: 'Potret bangsawan klasik abad pertengahan.', inputType: 'single-image', promptPlaceholder: 'Describe the royal attire...' },
  { id: AppMode.PAINTING_ANACHRONISM, label: 'Anachronism', category: 'Studio Pelukis', description: 'Objek modern dalam lukisan klasik kuno.', inputType: 'single-image', promptPlaceholder: 'Describe the modern object in old setting...' },

  // ==========================================================================================
  // 4. LIFESTYLE (Hobbies & Travel)
  // ==========================================================================================
  { 
    id: AppMode.UMRAH_HAJJ, 
    label: 'Umrah & Hajj Vision', 
    category: 'Lifestyle', 
    description: 'Visualisasi di Tanah Suci Makkah/Madinah dengan pakaian Ihram.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Suasana yang diinginkan...' 
  },
  { 
    id: AppMode.KOREA_TRAVEL, 
    label: 'Korea Traveling', 
    category: 'Lifestyle', 
    description: 'Foto liburan di Korea Selatan (Hanbok/Modern).', 
    inputType: 'single-image', 
    promptPlaceholder: 'Deskripsi momen...' 
  },
  { 
    id: AppMode.INDONESIA_TRAVEL, 
    label: 'Indonesia Traveling', 
    category: 'Lifestyle', 
    description: 'Foto liburan di destinasi wisata Indonesia.', 
    inputType: 'single-image', 
    promptPlaceholder: 'Deskripsi momen...' 
  },
  { id: AppMode.NEWBORN, label: 'Newborn Photography', category: 'Lifestyle', description: 'Fotografi bayi baru lahir yang menggemaskan.', inputType: 'single-image', promptPlaceholder: 'Describe pose and setting...' },
  { id: AppMode.PREWEDDING, label: 'Prewedding', category: 'Lifestyle', description: 'Konsep foto prewedding romantis.', inputType: 'dual-image', promptPlaceholder: 'Describe the romantic scene...' },
  { id: AppMode.FAMILY, label: 'Family Portrait', category: 'Lifestyle', description: 'Foto keluarga harmonis di studio atau outdoor.', inputType: 'single-image', promptPlaceholder: 'Describe the family setting...' },
  { id: AppMode.COSPLAY, label: 'Cosplay Generator', category: 'Lifestyle', description: 'Ubah diri Anda menjadi karakter anime/game.', inputType: 'single-image', promptPlaceholder: 'Describe the character...' },
  { id: AppMode.HAIRSTYLE, label: 'Hairstyle Changer', category: 'Lifestyle', description: 'Coba gaya rambut dan warna baru.', inputType: 'single-image', promptPlaceholder: 'Describe the hairstyle...' },
  { id: AppMode.TATTOO, label: 'Tattoo Designer', category: 'Lifestyle', description: 'Desain tato pada bagian tubuh.', inputType: 'single-image', promptPlaceholder: 'Describe the tattoo design...' },
  { id: AppMode.SNEAKER_LAB, label: 'Sneaker Lab', category: 'Lifestyle', description: 'Desain sepatu sneakers kustom.', inputType: 'none', promptPlaceholder: 'Describe your custom sneaker...' },
  { id: AppMode.NAIL_ART, label: 'Nail Art', category: 'Lifestyle', description: 'Inspirasi seni kuku (Nail Art).', inputType: 'single-image', promptPlaceholder: 'Describe the nail design...' },
  { id: AppMode.CERAMIC_POTTERY, label: 'Ceramic Pottery', category: 'Lifestyle', description: 'Desain keramik dan tembikar.', inputType: 'none', promptPlaceholder: 'Describe the pottery...' },
  { id: AppMode.FLORIST_ATELIER, label: 'Florist Atelier', category: 'Lifestyle', description: 'Rangkaian bunga artistik.', inputType: 'none', promptPlaceholder: 'Describe the floral arrangement...' },
  { id: AppMode.TERRARIUM_BUILDER, label: 'Terrarium Builder', category: 'Lifestyle', description: 'Desain ekosistem tanaman dalam kaca.', inputType: 'none', promptPlaceholder: 'Describe the terrarium...' },
  { id: AppMode.MOD_MOTOR, label: 'Mod Motor', category: 'Lifestyle', description: 'Modifikasi desain motor.', inputType: 'single-image', promptPlaceholder: 'Describe modifications...' },
  { id: AppMode.MOD_CAR, label: 'Mod Car', category: 'Lifestyle', description: 'Modifikasi desain mobil (Tuning/Stance).', inputType: 'single-image', promptPlaceholder: 'Describe modifications...' },
  { id: AppMode.PET_STUDIO, label: 'Pet Studio', category: 'Lifestyle', description: 'Foto studio artistik untuk hewan peliharaan.', inputType: 'single-image', promptPlaceholder: 'Describe the pet photo...' },
  { id: AppMode.FOOD_STYLIST, label: 'Food Stylist', category: 'Lifestyle', description: 'Fotografi makanan yang menggugah selera.', inputType: 'single-image', promptPlaceholder: 'Describe the dish...' },
  { id: AppMode.JEWELRY, label: 'Jewelry Design', category: 'Lifestyle', description: 'Desain perhiasan cincin, kalung, dll.', inputType: 'none', promptPlaceholder: 'Describe the jewelry...' },

  // ==========================================================================================
  // 5. BISNIS & SENI (Commercial & Pop Art)
  // ==========================================================================================
  { id: AppMode.PRODUCT, label: 'Product Photography', category: 'Bisnis & Seni', description: 'Fotografi produk komersial high-end.', inputType: 'single-image', promptPlaceholder: 'Describe the product shot...' },
  { id: AppMode.MOCKUP, label: 'Mockup Generator', category: 'Bisnis & Seni', description: 'Terapkan desain pada mockup (kaos, mug, layar).', inputType: 'single-image', promptPlaceholder: 'Describe the mockup object...' },
  { id: AppMode.THUMBNAIL, label: 'YouTube Thumbnail', category: 'Bisnis & Seni', description: 'Desain thumbnail YouTube yang menarik klik.', inputType: 'single-image', promptPlaceholder: 'Describe the video topic...' },
  { id: AppMode.CHARSHEET, label: 'Character Sheet', category: 'Bisnis & Seni', description: 'Lembar desain karakter (depan, samping, belakang).', inputType: 'none', promptPlaceholder: 'Describe the character...' },
  { id: AppMode.COMIC, label: 'Comic / Manga Page', category: 'Bisnis & Seni', description: 'Halaman komik atau manga dengan panel.', inputType: 'none', promptPlaceholder: 'Describe the comic scene...' },
  { id: AppMode.PACKAGING_DESIGN, label: 'Packaging Design', category: 'Bisnis & Seni', description: 'Desain kemasan produk (kotak, botol).', inputType: 'none', promptPlaceholder: 'Describe the packaging...' },
  { id: AppMode.FASHION_SKETCH, label: 'Fashion Sketch', category: 'Bisnis & Seni', description: 'Sketsa desain busana mode.', inputType: 'none', promptPlaceholder: 'Describe the dress/outfit...' },
  { id: AppMode.POPART, label: 'Pop Art', category: 'Bisnis & Seni', description: 'Seni gaya Pop Art (Warhol/Lichtenstein).', inputType: 'single-image', promptPlaceholder: 'Describe the pop art style...' },
  { id: AppMode.CYBERPUNK, label: 'Cyberpunk Aesthetic', category: 'Bisnis & Seni', description: 'Gaya futuristik neon Cyberpunk.', inputType: 'single-image', promptPlaceholder: 'Describe the cyberpunk scene...' },
  { id: AppMode.DOUBLE_EXPOSURE, label: 'Double Exposure', category: 'Bisnis & Seni', description: 'Gabungan dua gambar artistik.', inputType: 'dual-image', promptPlaceholder: 'Describe elements to blend...' },
  { id: AppMode.COLORING, label: 'Coloring Book', category: 'Bisnis & Seni', description: 'Halaman mewarnai garis hitam putih.', inputType: 'none', promptPlaceholder: 'Describe the coloring page...' },
  { id: AppMode.MAKEUP, label: 'Makeup Artist', category: 'Bisnis & Seni', description: 'Inspirasi tata rias wajah.', inputType: 'single-image', promptPlaceholder: 'Describe the makeup look...' },
  { id: AppMode.MEME, label: 'Meme Generator', category: 'Bisnis & Seni', description: 'Buat gambar meme lucu.', inputType: 'single-image', promptPlaceholder: 'Describe the meme context...' },

  // ==========================================================================================
  // 6. AI TOOLS (Utilities & Text)
  // ==========================================================================================
  { id: AppMode.UI_TO_CODE, label: 'UI to Code', category: 'AI Tools', description: 'Konversi tangkapan layar UI menjadi kode (HTML/React).', inputType: 'single-image', promptPlaceholder: 'Describe interactions...' },
  { id: AppMode.NUTRITION_TRACKER, label: 'Nutrition Tracker', category: 'AI Tools', description: 'Analisis kalori dan nutrisi dari foto makanan.', inputType: 'single-image', promptPlaceholder: 'Any dietary details?' },
  { id: AppMode.HANDWRITING_DECIPHER, label: 'Handwriting Decipher', category: 'AI Tools', description: 'Baca dan transkripsi tulisan tangan.', inputType: 'single-image', promptPlaceholder: 'Context hint...' },
  { id: AppMode.DATA_ANALYST, label: 'Data Analyst', category: 'AI Tools', description: 'Analisis grafik dan data visual.', inputType: 'single-image', promptPlaceholder: 'What insights needed?' },
  { id: AppMode.DIY_REPAIR, label: 'DIY Repair', category: 'AI Tools', description: 'Panduan perbaikan barang rusak.', inputType: 'single-image', promptPlaceholder: 'Describe the issue...' },
  { id: AppMode.CV_AUDITOR, label: 'CV Auditor', category: 'AI Tools', description: 'Analisis dan saran perbaikan CV/Resume.', inputType: 'single-image', promptPlaceholder: 'Target job role...' },
  { id: AppMode.PERSONAL_COLOR, label: 'Personal Color', category: 'AI Tools', description: 'Analisis palet warna pribadi (Season Color).', inputType: 'single-image', promptPlaceholder: 'Describe lighting...' },
  { id: AppMode.TRAVEL_GUIDE, label: 'Travel Guide', category: 'AI Tools', description: 'Info wisata dari foto landmark.', inputType: 'single-image', promptPlaceholder: 'Ask about this place...' },
  { id: AppMode.PROMPT_IDEA, label: 'Prompt Generator', category: 'AI Tools', description: 'Bantu buat prompt AI yang detail.', inputType: 'none', promptPlaceholder: 'Describe brief idea...' },
  { id: AppMode.IMAGE_DESC, label: 'Image Describer', category: 'AI Tools', description: 'Deskripsikan isi gambar secara detail.', inputType: 'single-image', promptPlaceholder: 'Focus on...' },
  { id: AppMode.REVERSE_PROMPT, label: 'Reverse Prompt', category: 'AI Tools', description: 'Dapatkan prompt dari gambar referensi.', inputType: 'single-image', promptPlaceholder: 'Analyze style...' },
  { id: AppMode.SOCIAL_MANAGER, label: 'Social Media Caption', category: 'AI Tools', description: 'Buat caption menarik untuk sosmed.', inputType: 'single-image', promptPlaceholder: 'Platform & Tone...' },
  { id: AppMode.AI_CRITIC, label: 'Art Critic', category: 'AI Tools', description: 'Kritik dan saran perbaikan karya seni.', inputType: 'single-image', promptPlaceholder: 'What feedback needed?' },
  { id: AppMode.COLOR_PALETTE, label: 'Palette Generator', category: 'AI Tools', description: 'Ekstrak palet warna hex dari gambar.', inputType: 'single-image', promptPlaceholder: 'Number of colors...' },
  { id: AppMode.STORYTELLER, label: 'Storyteller', category: 'AI Tools', description: 'Buat cerita pendek dari gambar.', inputType: 'single-image', promptPlaceholder: 'Genre & Theme...' },
  { id: AppMode.OCR, label: 'OCR (Text Extractor)', category: 'AI Tools', description: 'Ekstrak teks dari gambar dokumen.', inputType: 'single-image', promptPlaceholder: 'Language...' },
  { id: AppMode.FOOD_TO_RECIPE, label: 'Food to Recipe', category: 'AI Tools', description: 'Dapatkan resep masak dari foto makanan.', inputType: 'single-image', promptPlaceholder: 'Serving size...' },
  { id: AppMode.MATH_SOLVER, label: 'Math Solver', category: 'AI Tools', description: 'Selesaikan soal matematika dari foto.', inputType: 'single-image', promptPlaceholder: 'Show steps?' },
  { id: AppMode.PLANT_CARE, label: 'Plant Care Doctor', category: 'AI Tools', description: 'Diagnosa penyakit tanaman dan tips perawatan.', inputType: 'single-image', promptPlaceholder: 'Describe symptoms...' },
];
