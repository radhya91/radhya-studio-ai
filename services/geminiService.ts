import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppMode, GenerationResult, CarouselOptions, PhotoshootOptions, NewbornOptions, PreweddingOptions, FamilyOptions, ProductOptions, RecoveryOptions, DetailingOptions, CinematicRelightingOptions, AnalogFilmOptions, HeadshotOptions, StagingOptions, DoubleExposureOptions, HDROptions, GenFillOptions, GenerationOptions } from '../types';
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
    
    case AppMode.NEWBORN: {
        const opts = options as NewbornOptions;
        let nbInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL NEWBORN PHOTOGRAPHY ART.
        
        USER CONFIGURATION:
        - Pose: ${opts?.pose || 'wrapped'}
        - Setting: ${opts?.setting || 'beanbag'}
        - Skin Tone: ${opts?.skinTone || 'fair'}
        - State: ${opts?.state || 'asleep'}
        
        CRITICAL "UNCANNY VALLEY" FIXES (ADDRESS THESE 20 BLIND SPOTS):
        - ANATOMY: Baby MUST have correct number of fingers/toes. No polydactyly.
        - AGE: Subject is 5-14 days old. DO NOT generate "old man" wrinkles.
        - EYES: If 'Asleep', eyes are fully closed with relaxed lids. If 'Awake', eyes have newborn haze, not sharp adult focus.
        - LIGHTING: Soft, large window light or softbox. NO HARSH FLASH. NO OILY SKIN.
        
        ACTIVE FIXES:`;

        // Basic Fixes
        if (opts?.fixes.softSkin) nbInstruction += `\n- SKIN TEXTURE: Add 'lanugo' (fine hair) and 'milia' (tiny milk spots) on nose. Skin should be creamy but NOT plastic/blur.`;
        if (opts?.fixes.safetyComposite) nbInstruction += `\n- HEAD SUPPORT: Neck must look supported. Head should not float. Poses must look physically safe and grounded.`;
        if (opts?.fixes.squishLogic) nbInstruction += `\n- GRAVITY SQUISH: Where the baby touches the fabric, the skin/cheek must flatten slightly due to gravity. No hovering.`;
        if (opts?.fixes.reduceRedness) nbInstruction += `\n- COLOR CORRECTION: Reduce newborn redness/blotchiness/purple feet. Even, creamy skin tone.`;
        if (opts?.fixes.propScale) nbInstruction += `\n- SCALE: Props (buckets, bows) must be proportional. A newborn fits comfortably inside a bucket, not overflowing or tiny.`;
        if (opts?.fixes.softFocus) nbInstruction += `\n- LENS: Use 50mm f/1.8 Macro. Focus on eyelashes/lips. Creamy bokeh falloff on background.`;

        // Expert Fixes (The new 10)
        if (opts?.fixes.hipJointFix) nbInstruction += `\n- HIP JOINT ANATOMY: Legs in 'froggy' or 'taco' poses must have natural rotation. No dislocated look.`;
        if (opts?.fixes.diaperVolume) nbInstruction += `\n- DIAPER PHYSICS: If 'bum-up', render the bulk of a diaper under the fabric. No unnaturally flat buttocks.`;
        if (opts?.fixes.fabricTension) nbInstruction += `\n- FABRIC TENSION: Wraps must show pull lines/stretching where tight. Patterns must distort with the curve.`;
        if (opts?.fixes.handScale) nbInstruction += `\n- PARENT HAND SCALE: If parents are present, their hands must look LARGE relative to the tiny baby.`;
        if (opts?.fixes.naturalHairline) nbInstruction += `\n- NATURAL HAIRLINE: Hairline must be sparse, wispy, and irregular. No solid/thick 'wig' lines.`;
        if (opts?.fixes.umbilicalRealism) nbInstruction += `\n- UMBILICAL DETAIL: If belly is visible, show realistic healed/healing umbilical area, not a smooth adult navel.`;
        if (opts?.fixes.circulationColor) nbInstruction += `\n- CIRCULATION REALISM: Feet/Hands should be slightly cooler/redder (Acrocyanosis) than the torso.`;
        if (opts?.fixes.complexBokeh) nbInstruction += `\n- COMPLEX BOKEH: Background blur should be swirly or cat-eye (Petzval style), not flat digital blur.`;
        if (opts?.fixes.eyeReflection) nbInstruction += `\n- EYE CATCHLIGHTS: Reflections in eyes must match the window/softbox shape. No random white dots.`;
        if (opts?.fixes.lipTexture) nbInstruction += `\n- LIP TEXTURE: Lips should have slight texture/peeling (milk blisters) typical of newborns, not smooth makeup look.`;

        nbInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A newborn baby [Pose: ${opts?.pose}] in [Setting: ${opts?.setting}]. [USER PROMPT].
        Skin: ${opts?.skinTone}, ${opts?.state}.
        Style: Award-winning newborn photography, soft pastel tones, dreamy atmosphere.`;

        return nbInstruction;
    }
    
    case AppMode.PREWEDDING: {
        const opts = options as PreweddingOptions;
        let pwInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL PREWEDDING & ENGAGEMENT PHOTOGRAPHY.
        
        USER CONFIGURATION:
        - Visual Style: ${opts?.visualStyle || 'cinematic'}
        - Theme: ${opts?.theme || 'casual'}
        - Time of Day: ${opts?.timeOfDay || 'golden-hour'}
        - Shot Type: ${opts?.shotType || 'wide'}
        
        STYLE DEFINITION:`;
        
        if (opts?.visualStyle === 'cinematic') {
            pwInstruction += `\n- CINEMATIC: Perfectionist, high-end editorial, perfect lighting, epic wide shots, posed perfection.`;
        } else if (opts?.visualStyle === 'documentary') {
            pwInstruction += `\n- DOCUMENTARY: 'Anti-Bride' aesthetic, raw emotion, candid, photojournalistic, imperfect, motion blur, direct flash, unposed.`;
        } else if (opts?.visualStyle === 'editorial') {
            pwInstruction += `\n- EDITORIAL: High fashion, avant-garde poses, direct gaze, sharp focus, magazine cover quality.`;
        }

        pwInstruction += `\n\nCRITICAL "UNCANNY VALLEY" FIXES (ADDRESS THESE 30 BLIND SPOTS):
        - ANATOMY: Couples must have chemistry. No dead stares. No hovering hands.
        - PHYSICS: Clothes and hair must obey the same wind direction.
        
        ACTIVE BLIND SPOT FIXES:`;

        // 1. Chemistry
        if (opts?.fixes.handContact) pwInstruction += `\n- HOVER HAND FIX: Male hand must firmly press against partner's waist/shoulder with visible pressure on fabric. No floating hands.`;
        if (opts?.fixes.eyeContact) {
             if (opts?.visualStyle === 'documentary') {
                 pwInstruction += `\n- EYE CONTACT: Focus on each other or laughing at a joke. Avoid perfect camera gaze. Natural interactions.`;
             } else {
                 pwInstruction += `\n- EYE CONTACT: Intense, focused connection. No dead stares.`;
             }
        }
        if (opts?.fixes.heightLogic) pwInstruction += `\n- HEIGHT LOGIC: If male is taller, he looks down slightly; she looks up. Poses must reflect natural height differences.`;
        if (opts?.fixes.kissPhysics) pwInstruction += `\n- KISS PHYSICS: If kissing, faces must not melt together. Noses tilt to avoid collision. Lips puckered naturally, not flat.`;
        if (opts?.fixes.ringDetail) pwInstruction += `\n- RING DETAIL: Engagement ring on left ring finger ONLY. Hands must have exactly 5 fingers. No swollen knuckles.`;

        // 2. Physics
        if (opts?.fixes.windConsistency) pwInstruction += `\n- WIND PHYSICS: Hair, veil, dress, and tie must blow in the SAME direction.`;
        if (opts?.fixes.fabricTexture) pwInstruction += `\n- FABRIC TEXTURE: Suit must look like wool/linen texture, not plastic. Dress must have tulle/lace opacity.`;
        if (opts?.fixes.dressFlow) pwInstruction += `\n- DRESS FLOW: Dress train must sit heavily on the ground (gravity) or flow dynamically. No merging with partner's legs.`;
        if (opts?.fixes.veilTransparency) pwInstruction += `\n- VEIL OPTICS: Veil must be translucent/sheer. We should see the face/hair faintly underneath it.`;
        if (opts?.fixes.groundContact) pwInstruction += `\n- GROUND CONTACT: Shoes must interact with the ground (sink slightly in grass, shadow on concrete). No floating feet.`;

        // 3. Env
        if (opts?.fixes.shadowSync) pwInstruction += `\n- SHADOW SYNC: If he blocks the light, she must be in shadow. Shadows must fall in the same direction.`;
        if (opts?.fixes.horizonFix) pwInstruction += `\n- HORIZON LINE: Horizon must NOT cut through the couple's neck or head. Use Rule of Thirds.`;
        if (opts?.fixes.waterReflection) pwInstruction += `\n- REFLECTION LOGIC: Reflections in water/glass must match the couple's pose and angle inverted.`;
        if (opts?.fixes.weatherInteraction) pwInstruction += `\n- WEATHER LOGIC: If rainy, hair/ground is wet. If windy, hair is messy. No dry people in a storm.`;
        if (opts?.fixes.goldenHourRealism) pwInstruction += `\n- GOLDEN HOUR: Low sun angle = long shadows. Warm, orange-gold rim lighting on hair.`;

        // 4. Tech
        if (opts?.fixes.skinToneMatch) pwInstruction += `\n- WHITE BALANCE: Skin tones of both subjects must match the scene's lighting temperature. No mismatched 'pasted' look.`;
        if (opts?.fixes.depthPlane) pwInstruction += `\n- DEPTH OF FIELD: Plane of focus is sharp on faces. If feet are behind them, they should be slightly blurred.`;
        if (opts?.fixes.filmGrain) pwInstruction += `\n- FILM GRAIN: Add subtle organic 35mm grain (Portra 400 style). No digital noise artifacts.`;
        if (opts?.fixes.dynamicFraming) pwInstruction += `\n- FRAMING SAFETY: Do not cut off hands/feet at the joints.`;
        if (opts?.fixes.colorHarmony) pwInstruction += `\n- COLOR HARMONY: Desaturate neon greens in nature. Use cinematic color grading (Teal & Orange or Matte).`;

        // 5. Documentary / Storytelling Specials
        if (opts?.fixes.candidMoment) pwInstruction += `\n- CANDID MOMENT: Capture 'in-between' moments. Laughter, movement, blurry hands, hair in face. NOT POSED.`;
        if (opts?.fixes.motionBlurArt) pwInstruction += `\n- MOTION BLUR ART: Use slow shutter speed (shutter drag). Add artistic motion blur to dress or hands to convey movement.`;
        if (opts?.fixes.rawImperfection) pwInstruction += `\n- RAW IMPERFECTION: Allow messy hair, wrinkled clothes, emotional expressions. Avoid plastic perfection.`;
        if (opts?.fixes.flashPhotography) pwInstruction += `\n- DIRECT FLASH: Use direct, hard on-camera flash style. High contrast, dark vignette background. Paparazzi style.`;

        pwInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A prewedding photo of a couple in [Theme: ${opts?.theme}]. [USER PROMPT].
        Shot: ${opts?.shotType}, Lighting: ${opts?.timeOfDay}, Visual Style: ${opts?.visualStyle}.
        Style Description: ${opts?.visualStyle === 'documentary' ? 'Raw, emotional, candid, unposed, documentary photography.' : 'Cinematic, romantic, high-end wedding photography.'}`;

        return pwInstruction;
    }
    
    case AppMode.FAMILY: {
        const opts = options as FamilyOptions;
        let famInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL FAMILY PORTRAIT PHOTOGRAPHY (MULTI-PERSON).
        
        USER CONFIGURATION:
        - Type: ${opts?.familyType || 'nuclear'}
        - Setting: ${opts?.setting || 'studio'}
        - Outfit: ${opts?.outfitStyle || 'white-jeans'}
        
        CRITICAL BIG GROUP FIXES (26 BLIND SPOTS):
        - COMPOSITION: Use MULTIPLE ROWS (Sitting front, Standing back) for groups > 5.
        - FACES: High resolution features for ALL members. No melted back row.
        `;
        
        // Group 1: Composition
        if (opts?.fixes.faceFidelityBackRow) famInstruction += `\n- BACK ROW FIDELITY: Ensure faces in the back row are as sharp as the front row. f/11 aperture.`;
        if (opts?.fixes.heightSorting) famInstruction += `\n- HEIGHT SORTING: Tallest members in back. Shortest in front. No heads blocked.`;
        if (opts?.fixes.eyeContactSync) famInstruction += `\n- EYE CONTACT: Every single person looks at the camera. No wandering eyes.`;
        if (opts?.fixes.uniformLighting) famInstruction += `\n- UNIFORM LIGHTING: Even lighting across the whole group. No dark edges.`;
        if (opts?.fixes.generationLogic) famInstruction += `\n- AGE LOGIC: Grandparents look 60+, Parents 30-40, Kids 5-10. Distinct aging features.`;
        if (opts?.fixes.rowDepthLogic) famInstruction += `\n- ROW DEPTH: People in back row should appear slightly smaller due to perspective, but fully sharp.`;

        // Group 2: Anatomy & Identity
        if (opts?.fixes.twinEffectFix) famInstruction += `\n- IDENTITY VARIATION: Ensure distinct facial features for every member. NO COPY-PASTE FACES or identical twins unless specified.`;
        if (opts?.fixes.headSizeConsistency) famInstruction += `\n- HEAD SIZE: Head sizes must be consistent and proportional to body size across rows.`;
        if (opts?.fixes.teethRealism) famInstruction += `\n- TEETH REALISM: Natural smiles with distinct teeth separation. No 'piano key' teeth or gum-only smiles.`;
        if (opts?.fixes.handCountLogic) famInstruction += `\n- HAND COUNT: Strictly 2 hands per person. Hands on shoulders must belong to a visible adjacent arm.`;
        if (opts?.fixes.lazyEyeFix) famInstruction += `\n- GAZE SYMMETRY: Both eyes of each person must point in the same direction. No strabismus.`;

        // Group 3: Posing
        if (opts?.fixes.hoverHandFix) famInstruction += `\n- FIRM CONTACT: Hands on shoulders must show weight/pressure on the fabric. No floating 'hover hands'.`;
        if (opts?.fixes.postureSlouchFix) famInstruction += `\n- POSTURE LOGIC: Elderly may hunch slightly; kids may wiggle; adults stand tall. Natural spine curvature.`;
        if (opts?.fixes.kidInteraction) famInstruction += `\n- KID HOLDING: Small children must be held securely or sitting firmly. No floating babies.`;
        if (opts?.fixes.chairLogic) famInstruction += `\n- CHAIR PHYSICS: People sitting must compress the cushion. Buttocks not floating above chair.`;
        if (opts?.fixes.footGrounding) famInstruction += `\n- FOOT GROUNDING: Feet must look planted on the floor with appropriate contact shadows.`;

        // Group 4: Fashion
        if (opts?.fixes.shoeConsistency) famInstruction += `\n- SHOE LOGIC: Everyone must wear shoes (or all barefoot). No mixed socks/shoes unless messy.`;
        if (opts?.fixes.patternClashFix) famInstruction += `\n- PATTERN SAFETY: Avoid complex moire-inducing patterns on shirts. Keep textures distinct.`;
        if (opts?.fixes.jewelryHallucination) famInstruction += `\n- JEWELRY LOGIC: Necklaces obey gravity. No random gold pixels floating near necks.`;
        if (opts?.fixes.glassesGlareFix) famInstruction += `\n- GLASSES CLEARANCE: If wearing glasses, eyes must be visible behind lenses. No opaque reflections.`;
        if (opts?.fixes.fabricDrapeSitting) famInstruction += `\n- SITTING FABRIC: Pants/Dresses must crease at the hip/knee when sitting. Fabric bunching logic.`;

        // Group 5: Environment
        if (opts?.fixes.shadowConsistency) famInstruction += `\n- SHADOW DIRECTION: All shadows must fall in the same direction from the main light source.`;
        if (opts?.fixes.backgroundSeparation) famInstruction += `\n- BG SEPARATION: Dark hair must be rim-lit to separate from dark backgrounds.`;
        if (opts?.fixes.floorTexture) famInstruction += `\n- FLOOR TEXTURE: Consistent wood grain or carpet texture. No morphing floor patterns.`;
        if (opts?.fixes.atmosphereAiry) famInstruction += `\n- ROOM DEPTH: Background wall should be slightly out of focus to create room depth.`;
        if (opts?.fixes.proportionLogic) famInstruction += `\n- PROPORTION: Adults must be significantly larger than children (1.5x - 2x height).`;
        
        famInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A high-resolution group photo of a [${opts?.familyType}] in a [${opts?.setting}]. [USER PROMPT].
        Outfits: ${opts?.outfitStyle}.
        Style: Commercial Family Photography, evenly lit, happy expressions, ultra-detailed 8k.`;
        
        return famInstruction;
    }
    
    case AppMode.PRODUCT: {
        const opts = options as ProductOptions;
        let prodInstruction = `${baseInstruction}
        CONTEXT: HIGH-END COMMERCIAL PRODUCT PHOTOGRAPHY (CGI LEVEL).
        
        USER CONFIGURATION:
        - Material: ${opts?.materialType || 'glass'}
        - Lighting: ${opts?.lightingStyle || 'softbox'}
        - Placement: ${opts?.placement || 'podium'}
        
        CRITICAL BLIND SPOT FIXES (30 CHECKS):
        The image must be indistinguishable from a Phase One IQ4 150MP photograph.
        `;

        // Group 1: Physics & Geometry
        if (opts?.fixes.gravityFix) prodInstruction += `\n- GRAVITY FIX: Product must sit firmly on the surface. Contact shadows must touch the base. No floating.`;
        if (opts?.fixes.perspectiveCorrect) prodInstruction += `\n- PERSPECTIVE: Vertical lines must be parallel (Shift lens). No converging verticals.`;
        if (opts?.fixes.scaleLogic) prodInstruction += `\n- SCALE: Props (e.g. fruit slices, leaves) must be physically proportional to the product size.`;
        if (opts?.fixes.surfaceContact) prodInstruction += `\n- SURFACE CONTACT: Occlusion shadows must appear where the product touches the ground.`;
        if (opts?.fixes.lensDistortionFix) prodInstruction += `\n- LENS DISTORTION: Zero lens distortion (100mm Macro lens). No fish-eye bowing.`;
        if (opts?.fixes.symmetryLock) prodInstruction += `\n- SYMMETRY: Bottles/Jars must be perfectly symmetrical on the Y-axis. No lopsided edges.`;

        // Group 2: Material & Texture
        if (opts?.fixes.glassCaustics) prodInstruction += `\n- CAUSTICS: If glass, light must pass through and cast colored light on the surface (Refractive Caustics).`;
        if (opts?.fixes.metalAnisotropy) prodInstruction += `\n- METAL: Brushed metal must show anisotropic highlights (streaks across the grain).`;
        if (opts?.fixes.liquidRefraction) prodInstruction += `\n- LIQUID IOR: Liquid inside glass must distort background (Index of Refraction ~1.33).`;
        if (opts?.fixes.plasticSubsurface) prodInstruction += `\n- PLASTIC SSS: Plastic material should have slight Subsurface Scattering. Not dull matte paint.`;
        if (opts?.fixes.fabricWeave) prodInstruction += `\n- FABRIC DETAIL: Visible micro-weave on textiles. No flat color fill.`;
        if (opts?.fixes.condensationDrops) prodInstruction += `\n- CONDENSATION: Add realistic, irregular water droplets on the surface (cold beverage look).`;

        // Group 3: Light & Shadow
        if (opts?.fixes.rimLighting) prodInstruction += `\n- RIM LIGHT: Use back-lighting to create a crisp white outline separating product from background.`;
        if (opts?.fixes.softboxSimulation) prodInstruction += `\n- SOFTBOX: Large diffuse light source. Soft shadow gradients. No hard black shadows.`;
        if (opts?.fixes.hardSunlight) prodInstruction += `\n- HARD SUN: Direct directional light. Sharp, high-contrast shadows (Goes pattern).`;
        if (opts?.fixes.reflectionContinuity) prodInstruction += `\n- REFLECTIONS: Glossy surfaces must reflect the environment (studio lights/cards). No broken reflections.`;
        if (opts?.fixes.ambientOcclusion) prodInstruction += `\n- AMBIENT OCCLUSION: Darken crevices and contact points deeply.`;
        if (opts?.fixes.globalIllumination) prodInstruction += `\n- BOUNCE LIGHT: Product color should bleed slightly onto the floor (Color Bleed).`;

        // Group 4: Brand & Identity
        if (opts?.fixes.logoPreservation) prodInstruction += `\n- TEXT FIDELITY: Prioritize readable text on labels. Do not generate gibberish if possible. Keep lines straight.`;
        if (opts?.fixes.colorAccuracy) prodInstruction += `\n- COLOR ACCURACY: Prevent color grading from shifting the product's brand identity colors.`;
        if (opts?.fixes.labelFlatness) prodInstruction += `\n- LABEL MAPPING: Label must wrap around the cylinder curvature correctly. No flat overlay.`;
        if (opts?.fixes.negativeSpace) prodInstruction += `\n- NEGATIVE SPACE: Leave clean empty space on top/side for potential ad copy.`;
        if (opts?.fixes.noHallucinations) prodInstruction += `\n- NO ARTIFACTS: Do not generate extra nozzles, handles, or caps that don't exist.`;
        if (opts?.fixes.cleanEdges) prodInstruction += `\n- CLEAN EDGES: Keep product outline sharp against background for easy masking.`;

        // Group 5: Aesthetics
        if (opts?.fixes.goldenRatio) prodInstruction += `\n- COMPOSITION: Align main subject to the Golden Ratio / Rule of Thirds grid.`;
        if (opts?.fixes.bokehControl) prodInstruction += `\n- BOKEH: Shallow depth of field for background props (f/2.8), but product stays sharp.`;
        if (opts?.fixes.heroAngle) prodInstruction += `\n- HERO ANGLE: Shot from slightly below eye level to make product look imposing and grand.`;
        if (opts?.fixes.minimalistZen) prodInstruction += `\n- MINIMALISM: Reduce clutter. Maximum 2-3 props. Focus on the hero object.`;
        if (opts?.fixes.colorGrading) prodInstruction += `\n- COLOR GRADE: High-end commercial grading. Punchy contrast, clean whites.`;
        if (opts?.fixes.sharpFocusStack) prodInstruction += `\n- FOCUS STACKING: The entire product from front label to back rim must be razor sharp (f/16 equivalent).`;

        prodInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A commercial product shot of [THE PRODUCT] on a [${opts?.placement}].
        Material: ${opts?.materialType}, Light: ${opts?.lightingStyle}. [USER PROMPT].
        Style: Ultra-High-End Advertising Photography, 8k Resolution, Octane Render style.`;

        return prodInstruction;
    }
    
    case AppMode.RECOVERY: {
        const opts = options as RecoveryOptions;
        let recInstruction = `${baseInstruction}
        CONTEXT: ADVANCED PHOTO RESTORATION AND UPSCALING.
        OBJECTIVE: Restore damaged/old photos to pristine 4K quality while preserving identity.
        
        USER CONFIGURATION:
        - Damage Level: ${opts?.damageLevel}
        - Color Restoration: ${opts?.colorMode}
        - Enhancement Strength: ${opts?.enhanceStrength}
        
        ACTIVE BLIND SPOT FIXES (20 POINTS):
        `;

        // Surface & Damage
        if (opts?.fixes.scratchKiller) recInstruction += `\n- SCRATCH KILLER: Identify and inpaint white/black scratch marks. Seamless texture filling.`;
        if (opts?.fixes.tearPatching) recInstruction += `\n- TEAR PATCHING: Reconstruct missing image parts from rips or tears using context aware fill.`;
        if (opts?.fixes.dustSpeckle) recInstruction += `\n- DUST REMOVAL: Clean micro-dust, dirt spots, and fungus specs.`;
        if (opts?.fixes.waterDamage) recInstruction += `\n- WATER DAMAGE FIX: Neutralize stained/discolored areas caused by water or humidity.`;
        if (opts?.fixes.tapeMark) recInstruction += `\n- TAPE REMOVAL: Remove yellow/translucent tape marks overlaying the photo.`;

        // Face & Identity
        if (opts?.fixes.faceIdentityLock) recInstruction += `\n- IDENTITY LOCK: CRITICAL. Do not generate a random generic face. Enhance the existing facial features strictly. Keep distinctive traits (nose shape, jawline).`;
        if (opts?.fixes.irisClarity) recInstruction += `\n- IRIS CLARITY: Sharpen the pupil and iris pattern. Add a catchlight to the eyes if dull.`;
        if (opts?.fixes.naturalTeeth) recInstruction += `\n- NATURAL TEETH: Fix teeth shape but do NOT apply blindingly white 'Hollywood' veneers. Keep it period-accurate.`;
        if (opts?.fixes.hairTexture) recInstruction += `\n- HAIR TEXTURE: Resolve muddy hair blobs into distinct strands.`;
        if (opts?.fixes.earStructure) recInstruction += `\n- EAR STRUCTURE: Reconstruct ear cartilage shape if blurred.`;

        // Color
        if (opts?.fixes.deepColorization) recInstruction += `\n- DEEP COLORIZATION: If B&W, predict historically accurate colors for clothes/background. Skin tones must vary naturally.`;
        if (opts?.fixes.sepiaNeutralizer) recInstruction += `\n- SEPIA NEUTRALIZER: Remove yellow/brown aging cast. Restore neutral white balance.`;
        if (opts?.fixes.fadedInk) recInstruction += `\n- INK BOOST: Restore deep blacks and contrast in faded prints.`;
        if (opts?.fixes.skinToneBalance) recInstruction += `\n- SKIN TEXTURE: Remove 'wax' effect. Skin must have pores and natural variation.`;
        if (opts?.fixes.redEyeFix) recInstruction += `\n- RED EYE FIX: Correct flash reflection in pupils.`;

        // Digital Quality
        if (opts?.fixes.motionBlur) recInstruction += `\n- DE-BLUR: Use deconvolution to sharpen motion blur or shake.`;
        if (opts?.fixes.softFocus) recInstruction += `\n- FOCUS FIX: Sharpen soft-focus areas without ringing artifacts.`;
        if (opts?.fixes.isoGrain) recInstruction += `\n- DE-NOISE: Remove film grain or sensor noise while keeping texture.`;
        if (opts?.fixes.jpegArtifacts) recInstruction += `\n- ARTIFACT CLEANER: Smooth out blocky JPEG compression squares.`;
        if (opts?.fixes.textureUpscale) recInstruction += `\n- 4K UPSCALE: Hallucinate high-frequency details (fabric weave, brick texture) to increase resolution.`;

        recInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        The IDEAL, RESTORED version of the user's photo. [USER PROMPT].
        Description: Crystal clear, 8k resolution, highly detailed faces, no damage.
        Format: ${opts?.colorMode === 'bw' ? 'Black and White Photography' : 'Color Photography'}.`;

        return recInstruction;
    }

    case AppMode.DETAILING: {
        const opts = options as DetailingOptions;
        let detInstruction = `${baseInstruction}
        CONTEXT: ULTRA-HIGH DEFINITION IMAGE UPSCALING & DETAILING.
        OBJECTIVE: Take the user's input image and reimagine it as if it was shot on a 150MP Phase One camera. Add missing high-frequency details.
        
        USER CONFIGURATION:
        - Target Resolution: ${opts?.resolutionTarget}
        - Creativity Level: ${opts?.creativityLevel} (Faithful vs Hallucination)
        - Sharpness Mode: ${opts?.sharpnessMode}
        
        ACTIVE ENHANCEMENT FIXES (25 POINTS):
        `;

        // Group 1: Skin & Biological
        if (opts?.fixes.poreSynthesis) detInstruction += `\n- PORE SYNTHESIS: Generate realistic micro-pores on skin. Avoid 'plastic' smooth skin.`;
        if (opts?.fixes.irisPattern) detInstruction += `\n- IRIS PATTERN: Sharpen the complex radial muscles in the eye iris.`;
        if (opts?.fixes.hairStrandSeparation) detInstruction += `\n- HAIR SEPARATION: Render individual hair strands instead of clumps.`;
        if (opts?.fixes.nailTexture) detInstruction += `\n- NAIL DETAIL: Add subtle ridges and natural sheen to fingernails.`;
        if (opts?.fixes.wrinkleDepth) detInstruction += `\n- WRINKLE DEPTH: Preserve and enhance character lines/wrinkles for realism. Do not botox.`;

        // Group 2: Material & Fabric
        if (opts?.fixes.fabricWeaveMicro) detInstruction += `\n- FABRIC WEAVE: Show the specific weave pattern (twill, satin, knit) of clothing.`;
        if (opts?.fixes.leatherGrain) detInstruction += `\n- LEATHER GRAIN: Enhance the organic pebbled texture of leather items.`;
        if (opts?.fixes.metalBrushing) detInstruction += `\n- METAL BRUSHING: Add anisotropic brushing lines to metal surfaces.`;
        if (opts?.fixes.woodVeins) detInstruction += `\n- WOOD VEINS: Sharpen the grain and knot details in wood.`;
        if (opts?.fixes.paperRoughness) detInstruction += `\n- PAPER TEXTURE: Add fiber texture to paper/cardboard surfaces.`;

        // Group 3: Environment
        if (opts?.fixes.foliageVeins) detInstruction += `\n- FOLIAGE VEINS: Visible veins on leaves and grass blades.`;
        if (opts?.fixes.brickMortar) detInstruction += `\n- BRICK & MORTAR: Distinct separation between bricks and the cement mortar.`;
        if (opts?.fixes.asphaltGrain) detInstruction += `\n- ASPHALT GRAIN: Rough, aggregate texture on roads.`;
        if (opts?.fixes.waterRipples) detInstruction += `\n- WATER RIPPLES: Complex micro-ripples and tension on water surfaces.`;
        if (opts?.fixes.cloudVolume) detInstruction += `\n- CLOUD VOLUME: Fluffy, volumetric clouds with soft edges, not flat smoke.`;

        // Group 4: Optical
        if (opts?.fixes.chromaticAberrationFix) detInstruction += `\n- CA REMOVAL: Remove purple/green fringing on high contrast edges.`;
        if (opts?.fixes.cornerSharpness) detInstruction += `\n- CORNER SHARPNESS: Ensure corners are as sharp as the center (flat field).`;
        if (opts?.fixes.sensorNoiseRemoval) detInstruction += `\n- SENSOR CLEAN: Remove ISO noise and hot pixels.`;
        if (opts?.fixes.dynamicRangeBoost) detInstruction += `\n- DYNAMIC RANGE: Recover details in deep shadows and blown-out highlights.`;
        if (opts?.fixes.whiteBalanceAuto) detInstruction += `\n- WHITE BALANCE: Correct any unnatural color casts (too blue/yellow).`;

        // Group 5: Text & Geom
        if (opts?.fixes.textRestoration) detInstruction += `\n- TEXT RESTORE: Make small background text/signs legible and sharp.`;
        if (opts?.fixes.straightLines) detInstruction += `\n- STRAIGHT LINES: Fix wobbly architectural lines (AI artifact removal).`;
        if (opts?.fixes.geometricPatternFix) detInstruction += `\n- PATTERN FIX: Resolve moire patterns or confused geometric repetitions.`;
        if (opts?.fixes.silhouetteClean) detInstruction += `\n- SILHOUETTE: Clean up the edges between subject and background.`;
        if (opts?.fixes.noArtifacts) detInstruction += `\n- NO HALLUCINATIONS: Do not add extra limbs, fingers, or objects that aren't there.`;

        detInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A ${opts?.resolutionTarget} Ultra-High-Definition photograph of the subject in the input image. [USER PROMPT].
        Details: Razor sharp, micro-texture visible, perfect lighting.
        Style: Commercial 8K Photography.`;

        return detInstruction;
    }
    
    case AppMode.CINEMATIC_RELIGHTING: {
        const opts = options as CinematicRelightingOptions;
        let cineInstruction = `${baseInstruction}
        CONTEXT: VIRTUAL DIRECTOR & COLORIST SUITE.
        OBJECTIVE: Completely transform the lighting, color grade, and atmosphere of the input image to match high-end cinema standards.
        
        USER CONFIGURATION:
        - Lighting Setup: ${opts?.lightingStyle}
        - Color Grading: ${opts?.colorGrade}
        - Lens Type: ${opts?.lensType}
        
        ACTIVE CINEMATOGRAPHY FIXES (25 POINTS):
        `;

        // Group 1: Lighting (The Gaffer)
        if (opts?.fixes.rembrandtTriangle) cineInstruction += `\n- LIGHTING SETUP: REMBRANDT. Create a distinct triangle of light on the shadowed side of the face.`;
        if (opts?.fixes.rimLightSeparation) cineInstruction += `\n- RIM LIGHT: Strong back-light to separate subject from background with a glowing edge.`;
        if (opts?.fixes.volumetricFog) cineInstruction += `\n- VOLUMETRICS: Add visible shafts of light (God Rays) cutting through atmospheric dust/haze.`;
        if (opts?.fixes.practicalLights) cineInstruction += `\n- PRACTICALS: Ensure light sources within the frame (lamps, neon) actually emit glow.`;
        if (opts?.fixes.catchlights) cineInstruction += `\n- CATCHLIGHTS: Add sharp reflection of the key light in the eyes to bring life to the subject.`;

        // Group 2: Color (The Colorist)
        if (opts?.fixes.tealOrangePush) cineInstruction += `\n- COLOR GRADE: TEAL & ORANGE. Push shadows towards teal/cyan and highlights towards warm orange/skin tones. High contrast separation.`;
        if (opts?.fixes.skinToneProtection) cineInstruction += `\n- SKIN TONE: Mask skin tones to remain natural while heavily grading the environment.`;
        if (opts?.fixes.deepBlacks) cineInstruction += `\n- CONTRAST: CRUSH BLACKS. Lower the black point for a moody, high-contrast Noir look.`;
        if (opts?.fixes.highlightRollOff) cineInstruction += `\n- ROLL-OFF: Soft, creamy highlight clipping (film simulation), not harsh digital white clipping.`;
        if (opts?.fixes.vibranceBoost) cineInstruction += `\n- VIBRANCE: Boost secondary colors without oversaturating skin tones.`;

        // Group 3: Atmosphere (The VFX)
        if (opts?.fixes.filmGrain) cineInstruction += `\n- TEXTURE: Add organic 35mm film grain structure. Not digital noise.`;
        if (opts?.fixes.anamorphicFlares) cineInstruction += `\n- LENS FLARE: Horizontal blue streak flares (Anamorphic lens characteristic) on bright light sources.`;
        if (opts?.fixes.halation) cineInstruction += `\n- HALATION: Add red/orange glow bleeding around bright highlights (film emulsion effect).`;
        if (opts?.fixes.vignette) cineInstruction += `\n- VIGNETTE: Darken corners to draw focus to the center subject.`;
        if (opts?.fixes.chromaticAbberation) cineInstruction += `\n- OPTICS: Slight color fringing on edges to simulate vintage lens glass.`;

        // Group 4: Shadows (The DP)
        if (opts?.fixes.softShadows) cineInstruction += `\n- SHADOW QUALITY: Soft, diffused shadow edges (Large light source). Avoid harsh lines unless specified.`;
        if (opts?.fixes.silhouetteDrama) cineInstruction += `\n- SILHOUETTE: Expose for the highlights, leaving the subject in near-total silhouette against a bright background.`;
        if (opts?.fixes.subsurfaceScattering) cineInstruction += `\n- SUBSURFACE SCATTERING: Ears/fingers should glow red where strong light passes through them.`;
        if (opts?.fixes.ambientOcclusion) cineInstruction += `\n- AMBIENT OCCLUSION: Deepen shadows in crevices and corners for 3D depth.`;
        if (opts?.fixes.depthOfField) cineInstruction += `\n- BOKEH: Shallow depth of field. Background should be creamy blur (f/1.4).`;

        // Group 5: Genre
        if (opts?.fixes.cyberpunkNeon) cineInstruction += `\n- STYLE: CYBERPUNK. Neon pink and blue lighting. Wet streets reflection. High contrast.`;
        if (opts?.fixes.horrorGloom) cineInstruction += `\n- STYLE: HORROR. Underexposed, greenish tint, heavy shadows, uneasy atmosphere.`;
        if (opts?.fixes.goldenHourWarmth) cineInstruction += `\n- STYLE: GOLDEN HOUR. Low sun angle, long shadows, warm gold/amber wash over the scene.`;
        if (opts?.fixes.moonlightCoolness) cineInstruction += `\n- STYLE: MOONLIGHT. Blue-tinted key light, deep shadows, night ambiance.`;
        if (opts?.fixes.dreamyGlow) cineInstruction += `\n- STYLE: DREAMY. Add a 'Pro-Mist' filter diffusion glow to highlights. Ethereal look.`;

        cineInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A cinematic movie shot of the subject in the input image. [USER PROMPT].
        Lighting: ${opts?.lightingStyle}, Lens: ${opts?.lensType}, Grade: ${opts?.colorGrade}.
        Style: Masterpiece Cinematography, Arri Alexa, Anamorphic.`;

        return cineInstruction;
    }
    
    case AppMode.ANALOG_FILM: {
        const opts = options as AnalogFilmOptions;
        let analogInstruction = `${baseInstruction}
        CONTEXT: VIRTUAL DARKROOM & ANALOG FILM SIMULATION.
        OBJECTIVE: Emulate the exact chemical color science, grain structure, and optical characteristics of specific analog film stocks.
        
        USER CONFIGURATION:
        - Film Stock: ${opts?.filmStock}
        - Format: ${opts?.filmFormat}
        
        ACTIVE ANALOG ARTIFACTS (25 POINTS):
        `;

        // Group 1: Chemistry
        if (opts?.fixes.halation) analogInstruction += `\n- HALATION: Add characteristic red-orange glow/bloom around bright highlights (Cinestill effect).`;
        if (opts?.fixes.filmGrain) analogInstruction += `\n- GRAIN: Apply realistic silver halide grain structure appropriate for the film ISO. Not digital noise.`;
        if (opts?.fixes.colorShift) analogInstruction += `\n- COLOR SHIFT: Apply the specific color bias of the film stock (e.g., Green for Fuji, Gold for Kodak).`;
        if (opts?.fixes.bleachBypass) analogInstruction += `\n- BLEACH BYPASS: High contrast, low saturation, retained silver look.`;
        if (opts?.fixes.crossProcess) analogInstruction += `\n- CROSS PROCESS: Shift colors unnaturally (e.g., blue shadows, yellow highlights) as if developed in wrong chemicals.`;

        // Group 2: Optical
        if (opts?.fixes.lightLeaks) analogInstruction += `\n- LIGHT LEAKS: Add random red/orange burns on the edges of the frame.`;
        if (opts?.fixes.vignette) analogInstruction += `\n- VIGNETTE: Natural lens light falloff at the corners.`;
        if (opts?.fixes.softFocus) analogInstruction += `\n- OPTICS: Soft vintage lens rendering, slightly reduced sharpness.`;
        if (opts?.fixes.chromaticAberration) analogInstruction += `\n- ABERRATION: Slight color separation/fringing at the frame edges.`;
        if (opts?.fixes.bloom) analogInstruction += `\n- BLOOM: Highlights should diffuse into shadows (Pro-Mist effect).`;

        // Group 3: Wear
        if (opts?.fixes.dustScratches) analogInstruction += `\n- DAMAGE: Add subtle white dust specks and micro-scratches on the negative.`;
        if (opts?.fixes.motionBlur) analogInstruction += `\n- SHUTTER: Slight motion blur to suggest slow shutter speed.`;
        if (opts?.fixes.dateStamp) analogInstruction += `\n- DATE STAMP: Add a glowing orange digital date stamp in the corner (e.g., '98 12 25').`;
        if (opts?.fixes.filmBorder) analogInstruction += `\n- BORDER: Include black film rebate/sprockets or white polaroid frame.`;
        if (opts?.fixes.fadedPrint) analogInstruction += `\n- AGING: Lift the blacks and desaturate colors to simulate an old print found in a shoebox.`;

        // Group 4: Exposure
        if (opts?.fixes.overexposure) analogInstruction += `\n- EXPOSURE: Overexposed. Blown out highlights, pastel colors, airy look.`;
        if (opts?.fixes.underexposure) analogInstruction += `\n- EXPOSURE: Underexposed. Crushed muddy shadows, gritty look.`;
        if (opts?.fixes.highContrast) analogInstruction += `\n- CONTRAST: Push processing. High contrast, deep blacks.`;
        if (opts?.fixes.lowContrast) analogInstruction += `\n- CONTRAST: Pull processing. Flat, low contrast, wide dynamic range.`;
        if (opts?.fixes.flashBurn) analogInstruction += `\n- FLASH: Direct, hard on-camera flash. Harsh shadows, bright foreground, dark background.`;

        analogInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        An analog photograph taken on ${opts?.filmStock} film in ${opts?.filmFormat} format. [USER PROMPT].
        Description: Authentic film look, organic grain, chemical color science.`;

        return analogInstruction;
    }

    case AppMode.PROFESSIONAL_HEADSHOT: {
        const opts = options as HeadshotOptions;
        let hsInstruction = `${baseInstruction}
        CONTEXT: PROFESSIONAL PROFILE PICTURE & HEADSHOT PHOTOGRAPHY.
        OBJECTIVE: Transform the input selfie/photo into a high-end studio headshot suitable for LinkedIn, Social Media, or Professional Profiles.
        
        USER CONFIGURATION:
        - Outfit: ${opts?.outfit}
        - Background: ${opts?.background}
        
        ACTIVE ENHANCEMENTS:`;
        if (opts?.fixes.skinTexture) hsInstruction += `\n- SKIN: Professional retouching. Even skin tone, remove blemishes, but keep natural pores. Matte finish (no oily shine).`;
        if (opts?.fixes.eyeContact) hsInstruction += `\n- EYES: Ensure sharp focus on irises. Direct, confident eye contact with the camera.`;
        if (opts?.fixes.lightingMatch) hsInstruction += `\n- LIGHTING: 'Rembrandt' or 'Butterfly' studio lighting setup. Soft shadows, defined jawline.`;
        if (opts?.fixes.hairCleanup) hsInstruction += `\n- HAIR: Neat and tidy hair. Remove flyaways. Professional styling.`;

        hsInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A high-quality profile picture of the person in the input image.
        Wearing: ${opts?.outfit}. Background: ${opts?.background}.
        Style: High-end professional photography, 85mm lens, f/2.8 bokeh, confidence, leadership.`;
        return hsInstruction;
    }

    case AppMode.VIRTUAL_STAGING: {
        const opts = options as StagingOptions;
        let stgInstruction = `${baseInstruction}
        CONTEXT: REAL ESTATE VIRTUAL STAGING.
        OBJECTIVE: Furnish the empty room in the input image with realistic, scale-accurate furniture.
        
        USER CONFIGURATION:
        - Room Type: ${opts?.roomType}
        - Interior Style: ${opts?.style}
        
        ACTIVE PHYSICS & DESIGN RULES:`;
        if (opts?.fixes.perspectiveMatch) stgInstruction += `\n- PERSPECTIVE: Furniture must align perfectly with the floor plane and vanishing points of the original room.`;
        if (opts?.fixes.shadowCast) stgInstruction += `\n- SHADOWS: Furniture must cast realistic contact shadows on the floor based on the room's window light direction.`;
        if (opts?.fixes.scaleLogic) stgInstruction += `\n- SCALE: Furniture size must be realistic relative to the room height and windows. No miniature sofas.`;
        if (opts?.fixes.colorHarmony) stgInstruction += `\n- HARMONY: Color palette of furniture should complement the existing wall/floor colors.`;

        stgInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A fully furnished ${opts?.roomType} with ${opts?.style} interior design.
        The room structure (walls, windows, floor) matches the input image exactly.
        Style: Architectural Digest, bright, airy, welcoming.`;
        return stgInstruction;
    }

    case AppMode.DOUBLE_EXPOSURE: {
        const opts = options as DoubleExposureOptions;
        let deInstruction = `${baseInstruction}
        CONTEXT: ARTISTIC DOUBLE EXPOSURE PHOTOGRAPHY.
        OBJECTIVE: Blend the subject's silhouette with a secondary scenery element.
        
        USER CONFIGURATION:
        - Blend Mode: ${opts?.blendMode}
        - Secondary Element: ${opts?.secondaryElement}
        
        ARTISTIC RULES:`;
        if (opts?.fixes.edgeDetection) deInstruction += `\n- SILHOUETTE: Keep the sharp outline of the main subject (profile/face). The scenery should fill the body area.`;
        if (opts?.fixes.contrastBoost) deInstruction += `\n- CONTRAST: High contrast between the subject and the white/clean background.`;
        if (opts?.fixes.colorGrade) deInstruction += `\n- COLOR: Unify the color palette of the subject and the nature element. Dreamy, surreal tones.`;

        deInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A double exposure art piece combining the person in the input image with ${opts?.secondaryElement}.
        Technique: ${opts?.blendMode}. [USER PROMPT].
        Style: Fine art photography, ethereal, moody, highly detailed.`;
        return deInstruction;
    }

    case AppMode.HDR_LANDSCAPE: {
        const opts = options as HDROptions;
        let hdrInstruction = `${baseInstruction}
        CONTEXT: LANDSCAPE PHOTOGRAPHY & HDR PROCESSING.
        OBJECTIVE: Maximize dynamic range, detail, and visual impact of the landscape photo.
        
        USER CONFIGURATION:
        - Style: ${opts?.style}
        - Sky Enhancement: ${opts?.skyEnhancement ? 'Active' : 'Inactive'}
        
        PROCESSING STEPS:`;
        if (opts?.fixes.shadowRecovery) hdrInstruction += `\n- SHADOWS: Lift crushed blacks to reveal details in dark areas (rocks, forests).`;
        if (opts?.fixes.highlightSave) hdrInstruction += `\n- HIGHLIGHTS: Recover blown-out skies or bright reflections.`;
        if (opts?.fixes.saturationBoost) hdrInstruction += `\n- COLOR: Vibrance boost. Make greens greener and skies bluer without neon artifacts.`;
        if (opts?.fixes.noiseReduction) hdrInstruction += `\n- CLEAN: Remove sensor noise from low-light areas.`;

        hdrInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        An award-winning landscape photograph of the scene in the input image.
        Style: ${opts?.style} HDR, National Geographic style, dramatic lighting, ultra-detailed.
        [USER PROMPT]`;
        return hdrInstruction;
    }

    case AppMode.GEN_FILL: {
        const opts = options as GenFillOptions;
        let gfInstruction = `${baseInstruction}
        CONTEXT: GENERATIVE EXPANSION (OUTPAINTING).
        OBJECTIVE: Expand the canvas of the input image, inventing new consistent scenery around it.
        
        USER CONFIGURATION:
        - Direction: ${opts?.direction}
        - Zoom: ${opts?.zoomLevel}
        
        CONSISTENCY RULES:`;
        if (opts?.fixes.seamlessTransition) gfInstruction += `\n- SEAMLESS: The border between old and new image must be invisible.`;
        if (opts?.fixes.resolutionMatch) gfInstruction += `\n- RESOLUTION: The new generated areas must match the grain and sharpness of the original photo.`;
        if (opts?.fixes.lightingConsistency) gfInstruction += `\n- LIGHTING: Continue the lighting direction and shadows from the original image into the new areas.`;

        gfInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A wide-angle view of the scene in the input image, zoomed out by ${opts?.zoomLevel}.
        Extend the scenery logically in ${opts?.direction} direction.
        [USER PROMPT].
        Style: Seamless extension, consistent texture.`;
        return gfInstruction;
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
    const text = await callGeminiText('gemini-2.0-flash', prompt, base64Images, systemInstruction);
    return {
      images: [],
      text: text
    };
  }
};