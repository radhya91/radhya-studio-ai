import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppMode, GenerationResult, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, FashionEditorialOptions, LogoMascotOptions, ArchitecturalVisionOptions, IndustrialDesignOptions, GenerationOptions, PersonalColorOptions, ModMotorOptions, ModCarOptions, SneakerLabOptions, NailArtOptions, TerrariumOptions, CeramicOptions, FloristOptions, UmrahHajjOptions } from '../types';
import { MODES } from '../constants';

// --- SYSTEM INSTRUCTIONS UNTUK TEXT TOOLS (AI TOOLS) ---
const getSystemInstruction = (mode: AppMode): string => {
  switch (mode) {
    case AppMode.PROMPT_IDEA:
      return "Anda adalah ahli brainstorming prompt AI. Berikan 4-5 prompt yang kreatif dan bervariasi berdasarkan input pengguna. Gunakan gaya deskriptif yang kaya. Format sebagai daftar berpoin.";
    case AppMode.IMAGE_DESC:
      return "Anda adalah komentator seni AI. Deskripsikan gambar secara rinci, fokus pada pencahayaan, komposisi, dan mood, dalam bahasa Indonesia yang menarik. Maksimal 3 paragraf. Gunakan format Markdown.";
    case AppMode.REVERSE_PROMPT:
      return "Anda adalah insinyur prompt AI. Berikan prompt AI terbaik yang bisa menghasilkan gambar yang diberikan. Sertakan aspek rasio dan gaya seni yang relevan. Tulis dalam bahasa Inggris.";
    case AppMode.SOCIAL_MANAGER:
      return "Anda adalah manajer media sosial ahli. Berikan 3 varian caption (pendek, sedang, panjang) dan 10-15 hashtag untuk gambar yang diberikan. Tulis dalam bahasa Indonesia. Format sebagai Markdown.";
    case AppMode.AI_CRITIC:
      return "Anda adalah kritikus seni fotografi profesional. Nilai gambar berdasarkan fokus, komposisi, pencahayaan, dan orisinalitas (skala 1-100). Berikan kritik yang konstruktif. Tulis dalam bahasa Indonesia. Format sebagai Markdown.";
    case AppMode.COLOR_PALETTE:
      return "Anda adalah ahli warna. Ekstrak palet warna dominan (minimal 5 warna) dari gambar. Berikan nama warna dan kode HEX-nya dalam format daftar Markdown.";
    case AppMode.STORYTELLER:
      return "Anda adalah penulis cerita. Buat cerita pendek atau puisi inspiratif (maksimal 500 kata) berdasarkan gambar yang diberikan dan genre yang diminta oleh pengguna. Tulis dalam bahasa Indonesia. Format sebagai Markdown.";
    case AppMode.OCR:
      return "Anda adalah sistem OCR presisi tinggi. Ekstrak semua teks dari gambar. Jika ada instruksi khusus dari pengguna, terapkan instruksi tersebut pada teks yang diekstrak. Keluarkan hanya teks yang diekstrak/diolah.";
    case AppMode.PLANT_CARE:
      return "Anda adalah dokter tanaman. Identifikasi tanaman pada gambar. Berikan tips perawatan umum dan jawab keluhan/pertanyaan pengguna. Tulis dalam bahasa Indonesia. Format sebagai Markdown.";
    case AppMode.FOOD_TO_RECIPE:
      return "Anda adalah chef profesional. Identifikasi makanan dalam gambar dan berikan resep lengkap, bahan-bahan, dan cara memasak. Tulis dalam Bahasa Indonesia.";
    case AppMode.MATH_SOLVER:
      return "Anda adalah guru matematika. Selesaikan soal matematika dalam gambar langkah demi langkah. Gunakan LaTeX untuk formula.";
    
    // --- NEW AI TOOLS INSTRUCTIONS ---
    case AppMode.UI_TO_CODE:
        return "Anda adalah Senior Frontend Developer. Tugas Anda adalah mengkonversi gambar desain UI (screenshot) menjadi kode yang bersih dan fungsional. Gunakan HTML semantik dan Tailwind CSS untuk styling. Jika diminta komponen React, gunakan syntax React functional component. Identifikasi elemen interaktif dan tata letak dengan presisi pixel-perfect. Output kode dalam blok markdown.";
    case AppMode.NUTRITION_TRACKER:
        return "Anda adalah Ahli Gizi Klinis. Analisis foto makanan ini. Identifikasi setiap komponen makanan, perkirakan ukuran porsi, dan hitung estimasi total Kalori, Protein (g), Lemak (g), dan Karbohidrat (g). Berikan juga penilaian singkat tentang keseimbangan nutrisinya. Format output sebagai tabel markdown rapi.";
    case AppMode.HANDWRITING_DECIPHER:
        return "Anda adalah ahli paleografi dan transkripsi. Tugas Anda adalah membaca dan menyalin tulisan tangan yang sulit dibaca pada gambar. Pertahankan ejaan asli jika itu adalah dokumen sejarah, atau perbaiki jika itu catatan modern yang typo. Berikan transkripsi teks lengkap.";
    case AppMode.DATA_ANALYST:
        return "Anda adalah Senior Data Analyst. Analisis visualisasi data (grafik, chart, atau tabel) pada gambar. 1. Jelaskan tren utama. 2. Identifikasi anomali atau outlier. 3. Berikan kesimpulan eksekutif atau insight bisnis yang dapat diambil dari data tersebut. Gunakan bahasa Indonesia profesional.";
    case AppMode.DIY_REPAIR:
        return "Anda adalah teknisi handal dan tukang profesional (Handyman). Analisis kerusakan pada foto. 1. Identifikasi masalahnya (diagnosis). 2. Berikan daftar alat dan bahan yang dibutuhkan. 3. Berikan panduan langkah-demi-langkah cara memperbaikinya dengan aman. Selalu sertakan peringatan keselamatan (Safety First).";
    case AppMode.VINTAGE_ID:
        return "Anda adalah penilai barang antik profesional (Appraiser). Identifikasi objek pada gambar. Perkirakan era pembuatan (tahun/dekade), gaya seni (misal: Art Deco, Victorian), material, dan kemungkinan asal-usulnya. Berikan estimasi kelangkaan (Common, Rare, Ultra Rare) berdasarkan database pengetahuan Anda.";
    case AppMode.CV_AUDITOR:
        return "Anda adalah Senior HR Recruiter di perusahaan teknologi top. Review resume/CV pada gambar. Berikan kritik yang jujur dan konstruktif mengenai: 1. Tata letak dan desain. 2. Kejelasan konten. 3. Penggunaan kata kunci (ATS Friendly). 4. Deteksi typo. Berikan skor 1-10 dan saran perbaikan konkret.";
    case AppMode.TRAVEL_GUIDE:
        return "Anda adalah pemandu wisata lokal yang berpengetahuan luas. Identifikasi landmark, gedung, atau lokasi pada gambar. Ceritakan sejarah singkatnya yang menarik. Berikan 3 rekomendasi aktivitas atau kuliner legendaris yang berada dalam radius berjalan kaki dari lokasi tersebut.";
    case AppMode.PERSONAL_COLOR:
        return `Anda adalah Konsultan Personal Color Analysis Profesional Tingkat Dunia. 
        Tugas Anda adalah melakukan analisis mendalam terhadap wajah pengguna untuk menentukan "Seasonal Color Palette" (Musim Warna) mereka.

        LANGKAH ANALISIS:
        1. **Analisis Undertone & Kontras:**
           - Tentukan apakah undertone kulit adalah Cool, Warm, atau Neutral.
           - Gunakan input data "Lighting Condition" yang diberikan untuk mengoreksi bias warna foto (White Balance Mental). Jangan tertipu oleh lampu kuning indoor.
           - Jika status rambut "Covered" (Hijab), abaikan rambut dan fokus pada kulit dan mata.
           - Jika status rambut "Dyed", fokus pada akar rambut asli atau alis.
        
        2. **Penentuan Musim (Seasonal Determination):**
           - Tentukan musim spesifik (misal: Light Spring, Deep Autumn, True Winter, dll).
           - Jelaskan alasan singkat berdasarkan data visual.

        3. **Rekomendasi Warna (Palette):**
           - **Best Colors (Fashion):** Berikan 5-7 warna terbaik dengan Kode HEX.
           - **Worst Colors (Avoid):** Berikan 3 warna yang harus dihindari.
           - **Makeup:** Rekomendasi warna Lipstik dan Blush On.
           - **Jewelry:** Silver vs Gold?

        FORMAT OUTPUT HARUS MENGGUNAKAN MARKDOWN:
        ### 🎨 Analisis Personal Color
        **Undertone:** [Cool/Warm/Neutral] | **Kontras:** [High/Medium/Low]
        **Musim:** [Nama Musim, misal: Deep Autumn]

        ### 👗 Palet Warna Terbaik (Fashion)
        | Warna | Kode Hex | Contoh Penggunaan |
        |-------|----------|-------------------|
        | Nama Warna | #RRGGBB | Atasan / Dress |
        ... (Minimal 5 warna)

        ### 💄 Rekomendasi Makeup & Aksesoris
        * **Lipstik:** [Warna]
        * **Blush:** [Warna]
        * **Perhiasan:** [Gold/Silver/Rose Gold]

        ### 🚫 Warna yang Harus Dihindari
        * [Warna 1] (Membuat kulit terlihat kusam)
        * [Warna 2] ...
        `;

    default:
      return "Anda adalah AI kreatif Radhya Studio. Ikuti instruksi pengguna dengan cermat dan berikan hasil terbaik. Tulis dalam bahasa Indonesia.";
  }
};

// --- SYSTEM INSTRUCTIONS UNTUK PROMPT ENHANCEMENT (STUDIO UTAMA) ---
const getPromptEnhancementInstruction = (mode: AppMode, options?: GenerationOptions): string => {
  const baseInstruction = "You are a world-class AI Prompt Engineer for a generative image model (Imagen). Your goal is to rewrite the user's simple input into a highly detailed, professional prompt. OUTPUT ONLY THE ENGLISH PROMPT.";

  switch (mode) {
    case AppMode.TEXT_TO_IMAGE:
      return `${baseInstruction} Focus on: Hyper-realism, 8k resolution, detailed textures, volumetric lighting, and strong composition. Remove any ambiguity.`;
    
    case AppMode.PHOTO_CAROUSEL: {
      const opts = options as CarouselOptions;
      let carouselInstruction = `${baseInstruction} 
      CONTEXT: COMMERCIAL PRODUCT PHOTOGRAPHY (E-COMMERCE CAROUSEL).
      
      USER SELECTED CONFIGURATION:
      - Lighting: ${opts?.lighting || 'softbox'}
      - Camera Angle: ${opts?.angle || 'eye-level'}
      
      ACTIVE BLIND SPOT FIXES (ENFORCE THESE STRICTLY):`;

      if (opts?.fixes.gravity) carouselInstruction += `\n- GRAVITY FIX: Ensure object sits solidly on surface with contact shadows. No floating.`;
      if (opts?.fixes.lensCorrection) carouselInstruction += `\n- LENS CORRECTION: Use 85mm-100mm lens. No fish-eye or wide-angle distortion.`;
      if (opts?.fixes.textureBoost) carouselInstruction += `\n- TEXTURE BOOST: Hyper-detailed material rendering (matte, gloss, fabric weave).`;
      if (opts?.fixes.colorFidelity) carouselInstruction += `\n- COLOR FIDELITY: Isolate product colors. No background color bleed onto product.`;
      if (opts?.fixes.superSharp) carouselInstruction += `\n- SUPER SHARP: f/11 aperture, entire product in focus.`;

      carouselInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
      A highly technical studio shot of [THE PRODUCT] in the setting: [USER PROMPT].
      Apply the Lighting and Angle defined above.
      Style: High-end commercial advertisement, Phase One IQ4, 8k.`;
      return carouselInstruction;
    }
    
    case AppMode.PHOTOSHOOT_AI: {
        const opts = options as PhotoshootOptions;
        let shootInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL LIFESTYLE & MODEL PHOTOSHOOT.
        OBJECTIVE: Seamlessly integrate the [PRODUCT] into a realistic [SCENE/MODEL] environment.
        
        USER CONFIGURATION:
        - Vibe/Atmosphere: ${opts?.vibe || 'luxury'}
        - Global Lighting: ${opts?.lighting || 'golden'}
        - Composition Type: ${opts?.composition || 'table'}
        - Model Gaze Direction: ${opts?.modelGaze || 'product'}
        - Grip Style (if held): ${opts?.gripType || 'soft'}
        
        CRITICAL BLENDING & PHYSICS FIXES (ADDRESS THESE BLIND SPOTS STRICTLY):`;

        // BASIC
        if (opts?.fixes.autoShadow) shootInstruction += `\n- CAST SHADOWS: The product MUST cast realistic shadows onto the environment surfaces. NO FLOATING.`;
        if (opts?.fixes.colorGrade) shootInstruction += `\n- COLOR GRADING: Unify the color temperature of the product and scene.`;
        if (opts?.fixes.depthMatch) shootInstruction += `\n- DEPTH OF FIELD: Match the bokeh. If background is blurry, product edges should not be razor sharp.`;
        if (opts?.fixes.smartScale) shootInstruction += `\n- SCALE LOGIC: The product size must be physically accurate relative to the human/scene.`;

        // ADVANCED BLIND SPOTS
        if (opts?.fixes.displacementFix) shootInstruction += `\n- SURFACE DISPLACEMENT: If product is on a soft surface (fabric/skin), show indentation/weight. It must sink in slightly.`;
        if (opts?.fixes.spectralReflections) shootInstruction += `\n- SPECTRAL REFLECTIONS: Glossy product parts must reflect the SPECIFIC environment (trees, sky, model), not a generic studio box.`;
        if (opts?.fixes.caustics) shootInstruction += `\n- CAUSTICS/TRANSPARENCY: For glass/liquid, light must pass through and color the surface below. No solid black shadows.`;
        if (opts?.fixes.grainMatch) shootInstruction += `\n- GRAIN MATCH: Add subtle film grain to the product to match the photograph's ISO. Avoid "digital sticker" look.`;
        if (opts?.fixes.dynamicBlur) shootInstruction += `\n- DYNAMIC BLUR: If the scene implies motion, add slight directional motion blur to the product.`;
        if (opts?.fixes.fabricDrape) shootInstruction += `\n- FABRIC INTERACTION: If near clothing, the fabric must fold or wrinkle around the product contact point.`;
        if (opts?.fixes.clearBranding) shootInstruction += `\n- BRAND SAFETY: Keep the product label/logo unobstructed by fingers, leaves, or lens flares.`;

        // GAZE & GRIP LOGIC
        if (opts?.composition === 'held') {
             shootInstruction += `\n- HAND ANATOMY: Use a ${opts?.gripType || 'soft'} grip. Fingers must look natural, not clipping through the object.`;
        }
        if (opts?.modelGaze === 'product') shootInstruction += `\n- GAZE: Model must look AT the product to guide viewer attention.`;
        else if (opts?.modelGaze === 'camera') shootInstruction += `\n- GAZE: Model makes eye contact with the camera.`;

        shootInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A master-quality lifestyle photograph featuring [THE PRODUCT] integrated into: [USER PROMPT].
        Style: Vogue Magazine, Cinematic Lighting, 85mm Portrait Lens.`;
        
        return shootInstruction;
    }
    
    // ... [Other existing cases: NEWBORN, PREWEDDING, FAMILY, PRODUCT, RECOVERY, DETAILING, CINEMATIC, ANALOG, HEADSHOT, STAGING, DOUBLE_EXPOSURE, HDR, GEN_FILL] ...

    case AppMode.NEWBORN:
        return `${baseInstruction} Context: Newborn photography. Pose: ${(options as NewbornOptions)?.pose}. Setting: ${(options as NewbornOptions)?.setting}. Style: Award winning, soft, dreamy.`; // Simplified for brevity in this update

    case AppMode.PREWEDDING:
        return `${baseInstruction} Context: Prewedding photography. Style: ${(options as PreweddingOptions)?.visualStyle}. Theme: ${(options as PreweddingOptions)?.theme}.`; 
        
    case AppMode.FAMILY:
        return `${baseInstruction} Context: Family portrait. Type: ${(options as FamilyOptions)?.familyType}. Setting: ${(options as FamilyOptions)?.setting}.`;

    case AppMode.PRODUCT:
        return `${baseInstruction} Context: Commercial product photography. Material: ${(options as ProductOptions)?.materialType}. Light: ${(options as ProductOptions)?.lightingStyle}.`;

    case AppMode.RECOVERY:
        return `${baseInstruction} Context: Photo restoration. Damage level: ${(options as RecoveryOptions)?.damageLevel}.`;

    case AppMode.DETAILING:
        return `${baseInstruction} Context: Image upscaling. Resolution: ${(options as DetailingOptions)?.resolutionTarget}.`;

    case AppMode.CINEMATIC_RELIGHTING:
        return `${baseInstruction} Context: Cinematic relighting. Style: ${(options as CinematicRelightingOptions)?.lightingStyle}. Grade: ${(options as CinematicRelightingOptions)?.colorGrade}.`;

    case AppMode.ANALOG_FILM:
        return `${baseInstruction} Context: Analog film simulation. Stock: ${(options as AnalogFilmOptions)?.filmStock}.`;
    
    case AppMode.PROFESSIONAL_HEADSHOT:
        return `${baseInstruction} Context: Professional headshot. Outfit: ${(options as HeadshotOptions)?.outfit}. Background: ${(options as HeadshotOptions)?.background}.`;

    case AppMode.VIRTUAL_STAGING:
        return `${baseInstruction} Context: Virtual staging. Room: ${(options as StagingOptions)?.roomType}. Style: ${(options as StagingOptions)?.style}.`;

    case AppMode.DOUBLE_EXPOSURE:
        return `${baseInstruction} Context: Double exposure art. Blend: ${(options as DoubleExposureOptions)?.blendMode}. Secondary: ${(options as DoubleExposureOptions)?.secondaryElement}.`;

    case AppMode.HDR_LANDSCAPE:
        return `${baseInstruction} Context: HDR Landscape. Style: ${(options as HDROptions)?.style}.`;

    case AppMode.GEN_FILL:
        return `${baseInstruction} Context: Outpainting. Direction: ${(options as GenFillOptions)?.direction}.`;

    // --- NEW FEATURE 2 REVISION: FASHION EDITORIAL ---
    case AppMode.FASHION_EDITORIAL: {
        const opts = options as FashionEditorialOptions;
        let edInstruction = `${baseInstruction}
        CONTEXT: HIGH-FASHION MAGAZINE EDITORIAL SHOOT.
        OBJECTIVE: Transform the subject into a supermodel in a high-concept fashion spread. Focus on mood, styling, and avant-garde aesthetics.
        
        USER CONFIGURATION:
        - Editorial Style: ${opts?.editorialStyle}
        - Location: ${opts?.location}
        - Era/Vibe: ${opts?.era}
        
        CREATIVE DIRECTION & BLIND SPOT FIXES:`;
        if (opts?.fixes.hauteCoutureFit) edInstruction += `\n- TAILORING: Clothes must look perfectly fitted and expensive (Haute Couture quality). No loose or generic fit.`;
        if (opts?.fixes.textileSimulation) edInstruction += `\n- TEXTILE REALISM: Emphasize the texture of materials (silk sheen, leather grain, embroidery depth).`;
        if (opts?.fixes.dynamicPosing) edInstruction += `\n- DYNAMIC ENERGY: Even if the input pose is static, imply movement through wind in hair, flowing fabric, or dramatic shadows.`;
        if (opts?.fixes.makeupHairSync) edInstruction += `\n- STYLING SYNC: Makeup and hair MUST match the '${opts?.editorialStyle}' theme (e.g., bold liner for Avant-Garde).`;
        if (opts?.fixes.magazineColorGrade) edInstruction += `\n- COLOR GRADING: Use a rich, cinematic color palette typical of Vogue or Harper's Bazaar editorials.`;

        edInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A cover-worthy fashion editorial shot featuring the subject.
        Attire: [USER PROMPT] designed in the ${opts?.editorialStyle} style.
        Environment: ${opts?.location} with a ${opts?.era} mood.
        Style: Masterpiece, Shot by Annie Leibovitz, 8k Resolution.`;
        return edInstruction;
    }

    // --- NEW FEATURE 4: LOGO & MASCOT WIZARD ---
    case AppMode.LOGO_MASCOT: {
        const opts = options as LogoMascotOptions;
        let logoInstruction = `${baseInstruction}
        CONTEXT: VECTOR LOGO DESIGN & MASCOT CREATION.
        OBJECTIVE: Create a clean, scalable, professional logo or mascot based on the user's brand name and description.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Complexity: ${opts?.complexity}
        
        DESIGN RULES (VECTOR OPTIMIZATION):`;
        if (opts?.fixes.vectorFlatness) logoInstruction += `\n- FLAT DESIGN: Use flat colors or simple gradients. No complex shading or realistic textures. Look like an Adobe Illustrator vector.`;
        if (opts?.fixes.negativeSpaceBalance) logoInstruction += `\n- BALANCE: Maintain clean negative space. Ensure the logo works in black and white.`;
        if (opts?.fixes.colorPaletteLimit) logoInstruction += `\n- PALETTE: Limit to 3-4 complementary brand colors. Strong contrast.`;
        if (opts?.fixes.printReadiness) logoInstruction += `\n- LINE WEIGHT: Use thick, consistent bold lines. Avoid tiny details that will be lost when printed small.`;
        
        if (opts?.style === 'mascot' && opts?.fixes.mascotExpressiveness) {
            logoInstruction += `\n- MASCOT: Character must have a strong, clear facial expression and iconic pose.`;
        }

        logoInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A ${opts?.complexity} ${opts?.style} logo design.
        Subject: [USER PROMPT].
        Background: Plain white #FFFFFF.
        Style: Dribbble, Vector Art, Professional Branding.`;
        return logoInstruction;
    }

    // --- NEW FEATURE: ARCHITECTURAL VISION ---
    case AppMode.ARCHITECTURAL_VISION: {
        const opts = options as ArchitecturalVisionOptions;
        let archInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL ARCHITECTURAL VISUALIZATION (ARCHVIZ).
        OBJECTIVE: Transform sketches, blueprints, or massing models into photorealistic 3D renders.
        
        USER CONFIGURATION:
        - Viewpoint: ${opts?.viewpoint}
        - Environment: ${opts?.environment}
        - Style: ${opts?.style}
        
        ARCHITECTURAL PHYSICS & RENDERING RULES:`;
        if (opts?.fixes.verticalCorrection) archInstruction += `\n- 2-POINT PERSPECTIVE: All vertical lines of the building MUST be perfectly straight up and down (shift lens correction). No converging verticals.`;
        if (opts?.fixes.materialRealism) archInstruction += `\n- PBR MATERIALS: Distinguish clearly between concrete, glass, wood, and steel. Glass must reflect the environment.`;
        if (opts?.fixes.environmentIntegration) archInstruction += `\n- CONTEXT: The building must sit grounded in the ${opts?.environment} environment. Shadows must match the sun angle of that time/weather.`;
        if (opts?.fixes.scaleAccuracy) archInstruction += `\n- SCALE: Human figures and cars must be perfectly scaled to the building dimensions to provide scale reference.`;
        if (opts?.fixes.interiorGlow) archInstruction += `\n- INTERIOR LIFE: If environment is dark/overcast, show warm artificial light glowing from inside the windows.`;

        archInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A photorealistic architectural render of a ${opts?.style} building based on the input sketch.
        Subject: [USER PROMPT].
        Lighting: ${opts?.environment}.
        View: ${opts?.viewpoint}.
        Style: ArchDaily, V-Ray Render, 8k.`;
        return archInstruction;
    }

    // --- NEW FEATURE: INDUSTRIAL DESIGN RENDER ---
    case AppMode.INDUSTRIAL_DESIGN: {
        const opts = options as IndustrialDesignOptions;
        let indInstruction = `${baseInstruction}
        CONTEXT: INDUSTRIAL DESIGN & PRODUCT VISUALIZATION.
        OBJECTIVE: Convert a conceptual sketch, wireframe, or rough drawing into a finished Manufacturer-Ready 3D Render.
        
        USER CONFIGURATION:
        - Material: ${opts?.material}
        - Style: ${opts?.style}
        - View: ${opts?.view}
        
        DESIGN & ENGINEERING RULES:`;
        if (opts?.fixes.materialInference) indInstruction += `\n- MATERIAL LOGIC: Interpret sketchy shading as realistic PBR textures (e.g. ${opts?.material}). Differentiate between rubber grips, plastic bodies, and metal accents.`;
        if (opts?.fixes.ergonomicSmoothing) indInstruction += `\n- GEOMETRY CLEANUP: Fix wobbly hand-drawn lines into perfect geometric curves (G2 continuity). Make it look manufactured, not drawn.`;
        if (opts?.fixes.explodedViewLogic && opts?.view === 'exploded') indInstruction += `\n- EXPLODED VIEW: Separate the internal components logically (PCB, battery, housing) floating in space with alignment lines.`;
        if (opts?.fixes.surfaceFinish) indInstruction += `\n- FINISH: Apply correct surface finish (Matte, Gloss, Satin) to the materials to catch light realistically.`;
        if (opts?.fixes.partLineDefinition) indInstruction += `\n- PARTING LINES: Show realistic shut lines and gaps between assembled parts.`;

        indInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A photorealistic 3D render of a ${opts?.style} product based on the sketch.
        Subject: [USER PROMPT].
        Material: ${opts?.material}.
        View: ${opts?.view}.
        Style: KeyShot Render, Behance Product Design, 8k.`;
        return indInstruction;
    }

    // --- NEW FEATURE: MOD MOTOR (CUSTOM BIKE) ---
    case AppMode.MOD_MOTOR: {
        const opts = options as ModMotorOptions;
        let motorInstruction = `${baseInstruction}
        CONTEXT: CUSTOM MOTORCYCLE BUILDER.
        OBJECTIVE: Transform the input motorcycle into a custom build (${opts?.style}). Focus on mechanical realism and correct proportions.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Exhaust: ${opts?.exhaustType}
        - Seat: ${opts?.seatStyle}
        
        MECHANICAL FIXES & BLIND SPOTS (10 CRITICAL CHECKS):`;
        if (opts?.fixes.chainRealism) motorInstruction += `\n- DRIVE CHAIN: Ensure the drive chain is continuous, connected to the rear sprocket, and located on the correct side (usually left). No broken chains.`;
        if (opts?.fixes.exhaustRouting) motorInstruction += `\n- EXHAUST ROUTING: Headers must bolt to the engine cylinder and flow organically to the ${opts?.exhaustType} muffler. No floating pipes.`;
        if (opts?.fixes.cableManagement) motorInstruction += `\n- CABLES: Visible brake and clutch cables must route from handlebars to calipers/engine. Clean routing, but present.`;
        if (opts?.fixes.brakeLogic) motorInstruction += `\n- BRAKE MOUNTING: Calipers must be bolted to the fork leg (front) or swingarm (rear) and clamped over the rotor. No floating calipers.`;
        if (opts?.fixes.suspensionMount) motorInstruction += `\n- SHOCK GEOMETRY: Rear shocks must connect the swingarm to the main frame. They cannot pierce through the seat or float in space.`;
        if (opts?.fixes.kickstandFix) motorInstruction += `\n- KICKSTAND: If parked, the kickstand must be down on the left side, supporting the bike's lean. If riding, up.`;
        if (opts?.fixes.tireClearance) motorInstruction += `\n- FENDER CLEARANCE: Tires must not clip through the fenders or frame. Maintain realistic suspension travel gap.`;
        if (opts?.fixes.engineAirflow) motorInstruction += `\n- INTAKE SYSTEM: Show carburetors or throttle bodies with air filters/pods attached to the rear of the cylinder head.`;
        if (opts?.fixes.footControlSym) motorInstruction += `\n- FOOT CONTROLS: Ensure footpegs, shifter (left), and brake lever (right) are present and positioned for a human rider.`;
        if (opts?.fixes.mirrorReflection) motorInstruction += `\n- MIRRORS: Mirrors should be symmetrical and reflect a plausible background (sky/road), not random textures.`;

        motorInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A fully custom ${opts?.style} motorcycle build based on the input bike.
        Mods: ${opts?.seatStyle} seat, ${opts?.exhaustType} exhaust system.
        Details: [USER PROMPT].
        Style: BikeEXIF Feature, Studio Photography, 8k.`;
        return motorInstruction;
    }

    // --- NEW FEATURE: MOD CAR (TUNING STUDIO) ---
    case AppMode.MOD_CAR: {
        const opts = options as ModCarOptions;
        let carInstruction = `${baseInstruction}
        CONTEXT: AUTOMOTIVE TUNING & MODIFICATION.
        OBJECTIVE: Modify the car with a specific tuning style (${opts?.style}), changing wheels, suspension, and body kit.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Wheels: ${opts?.rimType}
        - Suspension: ${opts?.suspension}
        
        AUTOMOTIVE REALISM & 20 BLIND SPOT FIXES:`;
        
        // Group A: Bodywork
        if (opts?.fixes.panelGap) carInstruction += `\n- PANEL GAPS: Ensure door lines, hood lines, and bumper seams are visible and defined (not melted together).`;
        if (opts?.fixes.reflectionMatch) carInstruction += `\n- REFLECTION MAP: Reflections on the car body must match the specific environment (sky on hood, ground on doors).`;
        if (opts?.fixes.symmetryLock) carInstruction += `\n- SYMMETRY: Mirrors, headlights, and body lines must be perfectly symmetrical on both sides.`;
        if (opts?.fixes.carbonScale) carInstruction += `\n- CARBON FIBER: If present, carbon fiber must show a realistic diagonal weave pattern scale, not generic noise.`;
        if (opts?.fixes.plateWarp) carInstruction += `\n- LICENSE PLATE: Ensure license plate area is flat and rectangular, not warped or melted into the bumper.`;

        // Group B: Wheels
        if (opts?.fixes.camberLogic) carInstruction += `\n- CAMBER/FITMENT: Wheels must fit inside the wheel wells. If lowered, use negative camber logic (wheels tilt in). No clipping.`;
        if (opts?.fixes.lugNutCount) carInstruction += `\n- LUG NUTS: Ensure distinct, counted lug nuts (4 or 5) in the center of the wheel.`;
        if (opts?.fixes.brakeCaliper) carInstruction += `\n- CALIPER STATIONARITY: Brake calipers must be stationary at 3 or 9 o'clock position, not spinning with the wheel.`;
        if (opts?.fixes.tireTread) carInstruction += `\n- TIRE TREAD: Tires must have directional tread patterns, not smooth slick surfaces (unless specified race car).`;
        if (opts?.fixes.wheelWellDepth) carInstruction += `\n- WHEEL WELLS: The area inside the fender must be dark/shadowed, showing suspension hints, not transparent.`;

        // Group C: Lighting
        if (opts?.fixes.headlightDetail) carInstruction += `\n- HEADLIGHT DEPTH: Show internal projectors, lenses, and chrome reflectors inside the headlight housing.`;
        if (opts?.fixes.taillightDepth) carInstruction += `\n- TAILLIGHTS: Taillights must look like translucent red plastic/glass with internal LEDs, not flat red paint.`;
        if (opts?.fixes.indicatorColor) carInstruction += `\n- INDICATORS: Turn signals should be orange/amber or clear, distinct from the brake lights.`;
        if (opts?.fixes.windowTrans) carInstruction += `\n- TINT/GLASS: Windows should be semi-transparent, hinting at the interior seats/steering wheel, not solid black.`;
        if (opts?.fixes.windshieldFix) carInstruction += `\n- WINDSHIELD: A-Pillars must be straight. Reflections on glass must be sharp.`;

        // Group D: Physics
        if (opts?.fixes.shadowContact) carInstruction += `\n- AMBIENT OCCLUSION: The car must cast a realistic contact shadow on the ground. It cannot float.`;
        if (opts?.fixes.exhaustHole) carInstruction += `\n- EXHAUST TIPS: Exhaust pipes must have a hollow black opening, not a flat metal cap.`;
        if (opts?.fixes.intercoolerVis) carInstruction += `\n- COOLING: For turbo cars, show the intercooler mesh behind the front bumper grill.`;
        if (opts?.fixes.wiperLogic) carInstruction += `\n- WIPERS: Wipers must sit flush at the bottom of the windshield, not floating or crossing pillars.`;
        if (opts?.fixes.groundClearance) carInstruction += `\n- UNDERCARRIAGE: Darken the area under the car to simulate chassis depth.`;

        carInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A modified car build in ${opts?.style} style.
        Mods: ${opts?.rimType} wheels, ${opts?.suspension} suspension setup.
        Details: [USER PROMPT].
        Style: Speedhunters, Top Gear Magazine, 8k Automotive Photography.`;
        return carInstruction;
    }

    // --- NEW FEATURE: CUSTOM SNEAKER LAB ---
    case AppMode.SNEAKER_LAB: {
        const opts = options as SneakerLabOptions;
        let sneakerInstruction = `${baseInstruction}
        CONTEXT: CUSTOM SNEAKER DESIGN LABORATORY.
        OBJECTIVE: Create a hyper-realistic product concept of a custom sneaker based on user preferences.
        
        USER CONFIGURATION:
        - Silhouette: ${opts?.style}
        - Material: ${opts?.material}
        - Colorway: ${opts?.colorway}
        
        BLIND SPOT FIXES (FOOTWEAR ANATOMY):`;
        if (opts?.fixes.laceLogic) sneakerInstruction += `\n- LACES: Shoelaces must physically pass THROUGH the eyelets and criss-cross logically. No broken or floating laces.`;
        if (opts?.fixes.solePhysics) sneakerInstruction += `\n- OUTSOLE: The bottom sole must be flat on the ground with a realistic traction pattern (herringbone/waffle).`;
        if (opts?.fixes.logoIntegrity) sneakerInstruction += `\n- LOGO: Brand logos/swoshes must follow the curve of the shoe panel and not be cut off by stitching unless intended.`;
        if (opts?.fixes.materialDistinction) sneakerInstruction += `\n- MATERIAL TEXTURE: Distinctly render ${opts?.material}. Suede = fuzzy, Leather = smooth grain, Knit = woven texture.`;
        if (opts?.fixes.stitchFlow) sneakerInstruction += `\n- STITCHING: Double stitching lines must be parallel and continuous along panel edges.`;
        if (opts?.fixes.collarSymmetry) sneakerInstruction += `\n- ANKLE COLLAR: The opening for the foot must be symmetrical and centered.`;
        if (opts?.fixes.toeBoxShape) sneakerInstruction += `\n- TOE BOX: The front of the shoe should have a natural curve, not too flat (duckbill) or too bulbous (clown).`;
        if (opts?.fixes.eyeletAlign) sneakerInstruction += `\n- EYELETS: Lace holes must be punched into the eyestay panel, not floating on top.`;
        if (opts?.fixes.midsoleTexture) sneakerInstruction += `\n- MIDSOLE: If using foam/boost, show the microporous texture. If rubber, show the smooth mold lines.`;
        if (opts?.fixes.tonguePlacement) sneakerInstruction += `\n- TONGUE: The tongue must be centered under the laces, visible at the top.`;

        sneakerInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A conceptual product shot of a custom ${opts?.style} sneaker.
        Material: ${opts?.material}. Colorway: ${opts?.colorway}.
        Details: [USER PROMPT].
        Style: Hypebeast, Studio Product Photography, 8k, Macro Detail.`;
        return sneakerInstruction;
    }

    // --- NEW FEATURE: NAIL ART STUDIO ---
    case AppMode.NAIL_ART: {
        const opts = options as NailArtOptions;
        let nailInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL NAIL ART & MANICURE VISUALIZATION.
        OBJECTIVE: Apply realistic nail art to a hand, maintaining correct anatomy and texture physics.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Shape/Length: ${opts?.length}
        - Finish: ${opts?.finish}
        
        BLIND SPOT FIXES (HAND & NAIL ANATOMY):`;
        if (opts?.fixes.fingerCount) nailInstruction += `\n- ANATOMY: The hand MUST have exactly 5 fingers (Thumb, Index, Middle, Ring, Pinky). No AI hallucinations.`;
        if (opts?.fixes.cuticleClean) nailInstruction += `\n- CUTICLES: The nail polish must stop cleanly at the cuticle line. Do not paint over the skin.`;
        if (opts?.fixes.shapeConsistency) nailInstruction += `\n- SHAPE: All nails must have the same ${opts?.length} shape. Don't mix squares and ovals.`;
        if (opts?.fixes.textureReality) nailInstruction += `\n- TEXTURE: If Glitter/Chrome, show individual particles or metallic reflection. If Matte, remove specular highlights.`;
        if (opts?.fixes.glossReflection) nailInstruction += `\n- REFLECTIONS: For Glossy finish, the "wet look" light reflection (bally) must be consistent on each curved nail surface.`;
        if (opts?.fixes.thumbPerspective) nailInstruction += `\n- THUMB: The thumb nail faces a different angle than the fingers. Render correct perspective.`;
        if (opts?.fixes.skinRealistic) nailInstruction += `\n- SKIN: Hand skin should have natural pores and knuckles, not look like smooth plastic or wax.`;
        if (opts?.fixes.patternUniform) nailInstruction += `\n- PATTERN SCALE: If a pattern is requested (e.g. French Tip), the thickness of the tip must be proportional on all fingers.`;
        if (opts?.fixes.jewelrySeparation) nailInstruction += `\n- JEWELRY: If rings are present, the nail/polish must clearly be separate and not merge into the metal.`;
        if (opts?.fixes.lengthLogic) nailInstruction += `\n- PHYSICS: Long nails should cast a small shadow on the finger tip if lighting is overhead.`;

        nailInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A close-up beauty shot of a hand with a fresh manicure.
        Nail Art: ${opts?.style}, ${opts?.length}, ${opts?.finish} finish.
        Details: [USER PROMPT].
        Style: High-end Beauty Campaign, Macro Photography, 8k.`;
        return nailInstruction;
    }

    // --- NEW FEATURE: TERRARIUM BUILDER ---
    case AppMode.TERRARIUM_BUILDER: {
        const opts = options as TerrariumOptions;
        let terrariumInstruction = `${baseInstruction}
        CONTEXT: MINIATURE TERRARIUM ECOSYSTEM DESIGN.
        OBJECTIVE: Create a hyper-realistic close-up of a closed or open terrarium with distinct layers and healthy plants.
        
        USER CONFIGURATION:
        - Container: ${opts?.container}
        - Ecosystem: ${opts?.ecosystem}
        - Decor: ${opts?.decor}
        
        BLIND SPOT FIXES (ECOSYSTEM & GLASS PHYSICS):`;
        if (opts?.fixes.glassPhysics) terrariumInstruction += `\n- GLASS REFRACTION: The glass container walls must show subtle refraction and thickness (dielectric material). Not invisible or plastic.`;
        if (opts?.fixes.layerLogic) terrariumInstruction += `\n- SOIL LAYERS: Visible cross-section of layers from bottom up: 1. Drainage Stones/Gravel -> 2. Activated Charcoal (thin black line) -> 3. Soil -> 4. Plants/Moss.`;
        if (opts?.fixes.scaleConsistency) terrariumInstruction += `\n- SCALE: Plants must look miniature relative to the ${opts?.container}. They cannot be giant houseplants stuffed in a jar.`;
        if (opts?.fixes.condensation) terrariumInstruction += `\n- HUMIDITY: If closed jar, add subtle condensation mist on the inner upper glass walls to indicate humidity.`;
        if (opts?.fixes.plantCollision) terrariumInstruction += `\n- NO CLIPPING: Leaves should press against the glass slightly or bend, not pass through the solid glass wall.`;
        if (opts?.fixes.rootVisibility) terrariumInstruction += `\n- ROOTS: White roots should be visible growing through the soil layer against the glass, realistic root systems.`;
        if (opts?.fixes.lightingInterior) terrariumInstruction += `\n- INTERIOR LIGHT: Light must penetrate the glass and illuminate the plants inside. Shadows fall on the soil surface.`;
        if (opts?.fixes.waterLevel) terrariumInstruction += `\n- WATER LOGIC: If aquatic, the water surface line must be flat and horizontal. If terrestrial, no standing water pool (unless bog).`;
        if (opts?.fixes.lidLogic) terrariumInstruction += `\n- LID/CORK: If jar/bottle, show the cork or glass lid sealing the top.`;
        if (opts?.fixes.mossTexture) terrariumInstruction += `\n- MOSS DETAIL: Moss must look fuzzy and soft (velvet texture), not like flat green ground paint.`;

        terrariumInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A macro studio shot of a ${opts?.container} terrarium containing a ${opts?.ecosystem} ecosystem.
        Decor: ${opts?.decor}.
        Details: [USER PROMPT].
        Style: Macro Nature Photography, 8k, Lush Greenery.`;
        return terrariumInstruction;
    }

    // --- NEW FEATURE: CERAMIC & POTTERY STUDIO ---
    case AppMode.CERAMIC_POTTERY: {
        const opts = options as CeramicOptions;
        let potteryInstruction = `${baseInstruction}
        CONTEXT: CERAMIC STUDIO & POTTERY DESIGN.
        OBJECTIVE: Visualize a handcrafted ceramic piece with realistic glaze chemistry and clay texture.
        
        USER CONFIGURATION:
        - Item: ${opts?.itemType}
        - Clay: ${opts?.clayStyle}
        - Glaze: ${opts?.glazeStyle}
        
        BLIND SPOT FIXES (KILN & CLAY PHYSICS):`;
        if (opts?.fixes.radialSymmetry) potteryInstruction += `\n- SYMMETRY: The ${opts?.itemType} must be wheel-thrown symmetrical (unless wabi-sabi specified). No warped rims.`;
        if (opts?.fixes.glazeDripPhysics) potteryInstruction += `\n- GLAZE DRIPS: If ${opts?.glazeStyle}, glaze drips must flow downwards with gravity and thicken at the bottom of the drip (meniscus).`;
        if (opts?.fixes.textureMapping) potteryInstruction += `\n- MATERIAL SEPARATION: Clearly distinguish between the raw matte ${opts?.clayStyle} clay body and the glassy/smooth glaze areas.`;
        if (opts?.fixes.rimThickness) potteryInstruction += `\n- RIM VOLUME: The rim of the pot/mug must have thickness/volume, not be a razor-thin paper edge.`;
        if (opts?.fixes.bottomShadow) potteryInstruction += `\n- CONTACT SHADOW: Heavy ambient occlusion where the pot meets the table. Ceramics are heavy objects.`;
        if (opts?.fixes.handleGeometry) potteryInstruction += `\n- HANDLE LOGIC: If mug/jug, the handle must be attached firmly and have a clear opening for fingers.`;
        if (opts?.fixes.kilnEffects) potteryInstruction += `\n- KILN MARKS: Add subtle reduction spots, scorch marks, or glaze bubbles characteristic of firing.`;
        if (opts?.fixes.interiorLighting) potteryInstruction += `\n- INTERIOR: The inside of the vessel must be visible (shadowed but detailed), not a void black hole.`;
        if (opts?.fixes.baseFooting) potteryInstruction += `\n- FOOT RING: The base must sit flat on a trimmed foot ring (typical of pottery).`;
        if (opts?.fixes.reflectivity) potteryInstruction += `\n- REFLECTION MAP: Glazed areas should catch sharp specular highlights (wet look), unglazed areas remain matte.`;

        potteryInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A studio photograph of a handcrafted ${opts?.clayStyle} ${opts?.itemType}.
        Finish: ${opts?.glazeStyle} glaze.
        Details: [USER PROMPT].
        Style: Ceramic Art Magazine, Studio Lighting, 8k.`;
        return potteryInstruction;
    }

    // --- NEW FEATURE: FLORIST ATELIER ---
    case AppMode.FLORIST_ATELIER: {
        const opts = options as FloristOptions;
        let floristInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL FLORIST ATELIER & FLORAL DESIGN.
        OBJECTIVE: Create a high-end floral arrangement with realistic botanical textures and artistic composition.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Flower Type: ${opts?.flowerType}
        - Material/Vase: ${opts?.material}
        
        BOTANICAL REALISM & PHYSICS FIXES (10 BLIND SPOTS):`;
        if (opts?.fixes.petalTexture) floristInstruction += `\n- PETAL TEXTURE: Distinguish between the velvet texture of roses, the waxy texture of lilies, and the delicate silk of poppies. No plastic look.`;
        if (opts?.fixes.waterRefraction) floristInstruction += `\n- WATER REFRACTION: If in a glass vase, flower stems must appear visually distorted/displaced by the water and glass refraction.`;
        if (opts?.fixes.stemLogic) floristInstruction += `\n- STEM LOGIC: Every flower head must have a traceable stem going down into the vase or wrapping. No floating flower heads.`;
        if (opts?.fixes.leafFreshness) floristInstruction += `\n- FOLIAGE QUALITY: Leaves should be lush green and turgid, without brown wilted edges, unless 'dried flower' style is requested.`;
        if (opts?.fixes.wrappingPhysics) floristInstruction += `\n- WRAPPING: Paper or fabric wrapping must crinkle naturally around the stems, showing volume and folds. Not a flat texture overlay.`;
        if (opts?.fixes.pollenDetail) floristInstruction += `\n- MACRO DETAILS: Show stamens, pistils, and pollen dust in the center of open flowers for macro realism.`;
        if (opts?.fixes.colorHarmony) floristInstruction += `\n- COLOR THEORY: Ensure the arrangement follows a pleasing color palette (monochromatic, analogous, or complementary). Avoid clashing random neon colors.`;
        if (opts?.fixes.ribbonFlow) floristInstruction += `\n- RIBBON PHYSICS: Ribbons should drape naturally with gravity, having soft curves, not stiff jagged lines.`;
        if (opts?.fixes.depthLayering) floristInstruction += `\n- 3D VOLUME: The arrangement must have depth. Some flowers are forward, some recessed in shadow. Not a flat wall of flowers.`;
        if (opts?.fixes.dewDrops) floristInstruction += `\n- DEW DROPS: Add subtle morning dew droplets on a few petals to indicate extreme freshness.`;

        floristInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A studio photograph of a luxury ${opts?.style} featuring ${opts?.flowerType}.
        Container/Wrapping: ${opts?.material}.
        Details: [USER PROMPT].
        Style: High-End Florist Portfolio, Soft Natural Lighting, 8k, Botanical Art.`;
        return floristInstruction;
    }

    // --- NEW FEATURE: UMRAH & HAJJ VISION ---
    case AppMode.UMRAH_HAJJ: {
        const opts = options as UmrahHajjOptions;
        let umrahInstruction = `${baseInstruction}
        CONTEXT: UMRAH & HAJJ PILGRIMAGE VISUALIZATION.
        OBJECTIVE: Create a spiritually resonant and physically accurate visualization of pilgrims in Makkah or Madinah.
        
        USER CONFIGURATION:
        - Pilgrim: ${opts?.pilgrimType}
        - Location: ${opts?.location}
        - Shot Type: ${opts?.shotType}
        
        ISLAMIC ARCHITECTURE & PILGRIM REALISM (10 BLIND SPOTS):`;
        
        if (opts?.fixes.ihramRealism) {
            umrahInstruction += `\n- IHRAM (MEN): If subject is male, he MUST wear two pieces of seamless white unstitched cloth (Izār and Ridā'). NO sewn shirts, NO collars, NO buttons. Right shoulder uncovered (Idtiba) if walking/Tawaf.`;
        } else {
            umrahInstruction += `\n- CLOTHING: Modest Islamic attire.`;
        }
        
        if (opts?.fixes.kaabaTexture) umrahInstruction += `\n- KAABA KISWAH: The black cloth (Kiswah) must feature distinct Gold Quranic Calligraphy embroidery in the correct Thuluth script band near the top.`;
        if (opts?.fixes.marbleReflect) umrahInstruction += `\n- COOL MARBLE: The floor of Masjid al-Haram is Thassos marble which reflects cool white light even in the sun. It is NOT yellow sand color.`;
        if (opts?.fixes.hijabLayering) umrahInstruction += `\n- HIJAB PHYSICS: Women's headscarves must drape naturally over the shoulders without defying gravity. Loose fitting Abaya, not tight.`;
        if (opts?.fixes.umbrellaMech) umrahInstruction += `\n- NABAWI UMBRELLAS: If in Madinah, the giant convertible umbrellas must have their specific architectural membrane structure and distinct decorative arm patterns.`;
        if (opts?.fixes.crowdFlow) umrahInstruction += `\n- TAWAF DIRECTION: The crowd circling the Kaaba moves counter-clockwise. Motion blur should reflect this direction.`;
        if (opts?.fixes.handGesture) umrahInstruction += `\n- DUA HANDS: Hands raised in supplication (Dua) should have palms facing UP and slightly inward, fingers natural. NOT clasped together.`;
        if (opts?.fixes.archAccuracy) umrahInstruction += `\n- ARCHITECTURE: Use correct Ottoman or Modern Islamic arches specific to the ${opts?.location}. Do not use generic Taj Mahal or Indian Mughal domes.`;
        if (opts?.fixes.ihramBelt) umrahInstruction += `\n- IHRAM BELT: Men in Ihram often wear a functional money belt/pouch around the waist to hold the lower cloth. This adds realism.`;
        if (opts?.fixes.faceSerenity) umrahInstruction += `\n- EXPRESSION: Faces should radiate peace, humility, and spiritual emotion (Khushoo).`;

        umrahInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A ${opts?.shotType} of a ${opts?.pilgrimType} performing pilgrimage at ${opts?.location}.
        Details: [USER PROMPT].
        Style: Cinematic Islamic Photography, Golden Hour or Bright Noon Lighting, 8k, Spiritual Atmosphere.`;
        return umrahInstruction;
    }

    default:
      return `${baseInstruction} Focus on: Artistic style consistency, high visual impact, correct anatomy/perspective, and detailed description of the medium (e.g., oil painting, digital art).`;
  }
};

const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const callGeminiText = async (modelName: string, prompt: string, base64Images: string[], systemInstruction: string): Promise<string> => {
    const parts: any[] = [];
    for (const img of base64Images) {
        const base64Data = img.split(',')[1];
        const mimeType = img.substring(img.indexOf(':') + 1, img.indexOf(';'));
        parts.push({ inlineData: { mimeType: mimeType, data: base64Data } });
    }
    parts.push({ text: prompt });

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: modelName,
            contents: { parts: parts },
            config: { systemInstruction: systemInstruction }
        });
        return response.text || "";
    } catch (error) {
        console.error("Gemini Text Error:", error);
        throw new Error(`Gemini Text Error: ${error instanceof Error ? error.message : 'Unknown'}`);
    }
};

// --- VALIDATION LOGIC ---
const validateSubject = async (base64Image: string, expectedSubject: 'baby'): Promise<boolean> => {
    const prompt = `Analyze this image strictly. Does it contain a human baby, infant, or newborn? 
    Even if the baby is wrapped in blankets, sleeping, or wearing a costume, answer YES.
    If it is a cat, dog, adult, or object, answer NO.
    
    Response format: JUST "YES" or "NO".`;

    const result = await callGeminiText('gemini-2.0-flash', prompt, [base64Image], "You are an AI Image Classifier.");
    return result.trim().toUpperCase().includes("YES");
};

const generateImageContent = async (prompt: string, aspectRatio: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 4,
        aspectRatio: aspectRatio,
        outputMimeType: 'image/jpeg',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No images generated.");
    }

    return response.generatedImages.map((img: any) => `data:image/jpeg;base64,${img.image.imageBytes}`);
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw new Error(`Failed to generate images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateCreativeContent = async (
  activeMode: AppMode,
  prompt: string,
  img1: File | null,
  img2: File | null,
  ratio: string,
  options?: GenerationOptions
): Promise<GenerationResult> => {
  
  const modeConfig = MODES.find(m => m.id === activeMode);
  const isImageGeneration = !modeConfig?.category.includes('AI Tools');

  // 1. Process Images
  const imagePromises = [];
  
  // Handle specific multi-image case for FAMILY and PRODUCT
  if ((activeMode === AppMode.FAMILY || activeMode === AppMode.PRODUCT) && options && 'files' in options && options.files && options.files.length > 0) {
      options.files.forEach(file => imagePromises.push(convertFileToBase64(file)));
  } else {
      // Standard handling for other modes
      if (img1) imagePromises.push(convertFileToBase64(img1));
      if (img2) imagePromises.push(convertFileToBase64(img2));
  }
  
  const base64Images = await Promise.all(imagePromises);

  if (isImageGeneration) {
    
    // --- VALIDATION LAYER (NEW) ---
    // Specifically for Newborn Mode, we check if there is a baby
    if (activeMode === AppMode.NEWBORN && base64Images.length > 0) {
        const isBaby = await validateSubject(base64Images[0], 'baby');
        if (!isBaby) {
            throw new Error("VALIDATION_NO_BABY_DETECTED");
        }
    }

    // --- INTELLIGENT PROMPT LAYER ---
    let enhancedPrompt = prompt;
    const enhancementInstruction = getPromptEnhancementInstruction(activeMode, options);
    
    if (base64Images.length > 0) {
        let contextPrompt = "";
        if (activeMode === AppMode.FAMILY) {
             contextPrompt = `Here are reference photos of the family members. Analyze their features (age, gender, hair). Write a prompt for a group photo that includes characters resembling these people in the user's requested style: "${prompt}". Ensure the composition rules defined in system instructions are followed.`;
        } else if (activeMode === AppMode.PRODUCT) {
             contextPrompt = `Here are reference photos of the product (multiple angles/details). Analyze the shape, material, label, and structure from all provided images to build a complete 3D understanding. Write a prompt to place this EXACT product into a new commercial scene described as: "${prompt}". Ensure specific product details (shape, logo placement) are described accurately for the new generation.`;
        } else if (activeMode === AppMode.RECOVERY) {
             contextPrompt = `Here is the damaged photo. Analyze the damage (scratches, blur, fading) and the content (people, setting). Write a prompt that describes the scene as if it were a high-quality, undamaged modern photo. Keep the original people's identities and the setting's details intact. User request: "${prompt}".`;
        } else if (activeMode === AppMode.DETAILING) {
             contextPrompt = `Here is a low-resolution or blurry photo. Analyze the subject and materials (skin, fabric, background). Write a prompt that describes this exact image but in 8K Ultra-HD resolution with hyper-realistic textures. Focus on the details that are currently missing or blurry. User request: "${prompt}".`;
        } else if (activeMode === AppMode.CINEMATIC_RELIGHTING) {
             contextPrompt = `Here is an input photo. Analyze the composition and subject. Write a prompt to RE-LIGHT and COLOR GRADE this exact scene to look like a high-budget movie shot. Apply the lighting style and color grade requested by the system instructions. User request: "${prompt}".`;
        } else if (activeMode === AppMode.ANALOG_FILM) {
             contextPrompt = `Here is a digital input photo. Analyze the content. Write a prompt to recreate this EXACT image but as if it was shot on the requested ANALOG FILM STOCK. Apply the specific grain, color shift, and chemical imperfections associated with that film. User request: "${prompt}".`;
        } else if (activeMode === AppMode.PROFESSIONAL_HEADSHOT) {
             contextPrompt = `Here is a casual photo of a person. Analyze their facial features, hair color, and ethnicity. Write a prompt to generate a HIGH-END PROFESSIONAL HEADSHOT of this person. Change their outfit to the requested style and place them in the requested background. Keep the face recognizable. User request: "${prompt}".`;
        } else if (activeMode === AppMode.VIRTUAL_STAGING) {
             contextPrompt = `Here is a photo of an empty or sparsely furnished room. Analyze the perspective, window position, and lighting. Write a prompt to fill this room with furniture in the requested style. Maintain the original room structure (walls/floors). User request: "${prompt}".`;
        } else if (activeMode === AppMode.DOUBLE_EXPOSURE) {
             contextPrompt = `Here is a portrait photo. Analyze the silhouette. Write a prompt to create a DOUBLE EXPOSURE art piece where this silhouette is filled with the requested scenery. User request: "${prompt}".`;
        } else if (activeMode === AppMode.HDR_LANDSCAPE) {
             contextPrompt = `Here is a landscape photo. Analyze the scene (mountains, sky, water). Write a prompt to re-generate this scene with HDR quality, enhanced lighting, and dramatic atmosphere. User request: "${prompt}".`;
        } else if (activeMode === AppMode.GEN_FILL) {
             contextPrompt = `Here is an input image. Analyze the content at the edges. Write a prompt to generate a WIDER version of this image, effectively 'zooming out' and inventing plausible scenery that continues seamlessly from the edges. User request: "${prompt}".`;
        } else if (activeMode === AppMode.FASHION_EDITORIAL) {
             contextPrompt = `Here is a photo of a person. Analyze their body pose, skin tone, and features. Write a prompt to transform this into a HIGH-FASHION MAGAZINE COVER. The person should be wearing "${prompt}" but styled in the requested editorial concept. Ensure the lighting, makeup, and background match the high-end magazine aesthetic.`;
        } else if (activeMode === AppMode.LOGO_MASCOT) {
             contextPrompt = `Analyze this reference sketch or image. Extract the core concept and composition. Write a prompt to generate a polished, professional vector logo/mascot based on this concept but in a cleaner, higher quality style described as: "${prompt}".`;
        } else if (activeMode === AppMode.ARCHITECTURAL_VISION) {
             contextPrompt = `Analyze this input sketch, blueprint, or massing model. Understand the structural geometry and perspective. Write a prompt to convert this into a PHOTOREALISTIC 3D RENDER. Apply the ${options && 'style' in options ? options.style : 'modern'} style and correct any perspective distortions to achieve a 2-point perspective look. User request: "${prompt}".`;
        } else if (activeMode === AppMode.INDUSTRIAL_DESIGN) {
             contextPrompt = `Analyze this design sketch or wireframe. Understand the product's intended function and form factor. Write a prompt to render this as a FINISHED PRODUCT in 3D. Apply the requested material (${(options as IndustrialDesignOptions)?.material}) and style (${(options as IndustrialDesignOptions)?.style}). Smooth out lines and add realistic lighting. User request: "${prompt}".`;
        } else if (activeMode === AppMode.MOD_MOTOR) {
             contextPrompt = `Analyze this motorcycle photo. Identify the model type and key features (tank, frame). Write a prompt to MODIFY this bike into a ${(options as ModMotorOptions)?.style} style custom build. Change the seat to a ${(options as ModMotorOptions)?.seatStyle} style and the exhaust to ${(options as ModMotorOptions)?.exhaustType}. Keep the engine details realistic but upgrade the aesthetics. User request: "${prompt}".`;
        } else if (activeMode === AppMode.MOD_CAR) {
             contextPrompt = `Analyze this car photo. Identify the body lines and model. Write a prompt to TUNE/MODIFY this car into a ${(options as ModCarOptions)?.style} build. Install ${(options as ModCarOptions)?.rimType} wheels and adjust suspension to ${(options as ModCarOptions)?.suspension}. Ensure realistic reflections and body kit integration. User request: "${prompt}".`;
        } else if (activeMode === AppMode.SNEAKER_LAB) {
             contextPrompt = `Analyze this reference image. Identify the shoe structure or the person's feet. Write a prompt to GENERATE a custom sneaker design in the ${(options as SneakerLabOptions)?.style} style. Apply ${(options as SneakerLabOptions)?.material} material and the ${(options as SneakerLabOptions)?.colorway} colorway. User request: "${prompt}".`;
        } else if (activeMode === AppMode.NAIL_ART) {
             contextPrompt = `Analyze this hand photo. Identify the fingers and nail beds. Write a prompt to APPLY a realistic manicure in the ${(options as NailArtOptions)?.style} style. Use ${(options as NailArtOptions)?.length} length and a ${(options as NailArtOptions)?.finish} finish. User request: "${prompt}".`;
        } else if (activeMode === AppMode.UMRAH_HAJJ) {
             contextPrompt = `Analyze this face photo. Identify the facial features, skin tone, and gender. Write a prompt to place this person in a SPIRITUAL PILGRIMAGE SCENE in ${(options as UmrahHajjOptions)?.location}. Dress them in accurate ${(options as UmrahHajjOptions)?.pilgrimType} attire (Ihram for men, Abaya for women). Keep the face recognizable but serene. User request: "${prompt}".`;
        } else {
             contextPrompt = `Analyze the visual content of the attached image(s). Then, write a NEW, highly detailed generation prompt based on the user's request: "${prompt}". Ensure you incorporate the style/subject of the reference image but apply the specific visual enhancements required by the current mode.`;
        }
        
        const result = await callGeminiText('gemini-2.0-flash', contextPrompt, base64Images, enhancementInstruction);
        if (result) enhancedPrompt = result;
    } else {
        const contextPrompt = `User request: "${prompt}". Rewrite this into a master-quality image generation prompt.`;
        const result = await callGeminiText('gemini-2.0-flash', contextPrompt, [], enhancementInstruction);
        if (result) enhancedPrompt = result;
    }

    console.log(`[Mode: ${activeMode}] Enhanced Prompt:`, enhancedPrompt);

    // 2. Generate Image with Enhanced Prompt
    const images = await generateImageContent(enhancedPrompt, ratio);
    
    return {
      images: images.map(url => ({ url, prompt: enhancedPrompt })),
      text: ''
    };

  } else {
    // --- TEXT / ANALYSIS TOOLS ---
    const systemInstruction = getSystemInstruction(activeMode);
    
    // Inject the advanced options into the text prompt context if available
    let finalPrompt = prompt;
    if (activeMode === AppMode.PERSONAL_COLOR && options && 'lighting' in options) {
        const opts = options as PersonalColorOptions;
        finalPrompt += `\n\n[ANALYSIS CONTEXT]\n` +
                       `Lighting Condition: ${opts.lighting}\n` +
                       `Hair Status: ${opts.hairStatus}\n` +
                       `Vein Color (Wrist): ${opts.veinColor}\n` +
                       `Eye Color (User Input): ${opts.eyeColor}\n` +
                       `Active Fixes: ${JSON.stringify(opts.fixes)}`;
    }

    const text = await callGeminiText('gemini-2.0-flash', finalPrompt, base64Images, systemInstruction);
    return {
      images: [],
      text: text
    };
  }
};