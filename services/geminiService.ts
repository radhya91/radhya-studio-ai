import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppMode, GenerationResult, CarouselOptions, PhotoshootOptions, GenerationOptions } from '../types';
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
// Ini memperbaiki "Blind Spots" dengan memaksa Gemini menulis prompt yang sangat spesifik untuk Imagen
const getPromptEnhancementInstruction = (mode: AppMode, options?: GenerationOptions): string => {
  const baseInstruction = "You are a world-class AI Prompt Engineer for a generative image model (Imagen 4.0). Your goal is to rewrite the user's simple input into a highly detailed, professional prompt. OUTPUT ONLY THE ENGLISH PROMPT.";

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
        
        CRITICAL BLENDING FIXES (ADDRESS THESE BLIND SPOTS):`;

        if (opts?.fixes.autoShadow) shootInstruction += `\n- CAST SHADOWS: The product MUST cast realistic shadows onto the environment surfaces based on the global lighting direction. NO FLOATING OBJECTS.`;
        if (opts?.fixes.colorGrade) shootInstruction += `\n- COLOR GRADING: Unify the color temperature of the product and scene. If the scene is warm, the product highlights must be warm.`;
        if (opts?.fixes.depthMatch) shootInstruction += `\n- DEPTH OF FIELD: Match the bokeh/blur. If the background is blurry, the product edges should not be razor sharp (slight lens roll-off).`;
        if (opts?.fixes.smartScale) shootInstruction += `\n- SCALE LOGIC: The product size must be physically accurate relative to the environment/model (e.g. a ring is small, a car is big).`;

        shootInstruction += `\n\nTHE PROMPT MUST DESCRIBE:
        A master-quality lifestyle photograph featuring [THE PRODUCT] integrated into: [USER PROMPT].
        Style: Vogue Magazine, Cinematic Lighting, 85mm Portrait Lens.`;
        
        return shootInstruction;
    }
    
    case AppMode.NEWBORN:
      return `${baseInstruction} Context: Newborn Photography. Focus on: Softness, safety, cozy textures (wool, fur blankets), pastel color palettes, warm lighting, angelic mood, macro details of features. Avoid harsh shadows or unnatural poses.`;
    
    case AppMode.PREWEDDING:
      return `${baseInstruction} Context: Pre-wedding/Engagement Session. Focus on: Romantic atmosphere, golden hour lighting, emotional connection, cinematic wide shots, dreamy color grading, scenic backgrounds.`;
    
    case AppMode.FAMILY:
      return `${baseInstruction} Context: Family Studio Portrait. Focus on: Balanced composition (no one blocked), even lighting (butterfly lighting), happy and natural expressions, sharp focus on all faces, high-resolution texture.`;
    
    case AppMode.PRODUCT:
      return `${baseInstruction} Context: High-End Product Commercial. Focus on: Materiality (glass, metal, leather rendering), dramatic lighting (rim light, reflections), macro details, advertising standard, 8k, crisp edges.`;
    
    case AppMode.RECOVERY:
      return `${baseInstruction} Context: Image Restoration. The user input describes a damaged/old photo. Rewrite a prompt that describes the IDEAL, RESTORED version of that image. Focus on: De-noise, de-blur, crystal clear facial features, removed scratches, high fidelity, 4k upscale.`;
    
    case AppMode.DETAILING:
      return `${baseInstruction} Context: Image Upscaling/Detailing. Focus on: Hallucinating realistic high-frequency details (pores, fabric weave, foliage) without changing the core subject. Sharpness, clarity, HDR.`;
    
    case AppMode.CINEMATIC_RELIGHTING:
      return `${baseInstruction} Context: Cinematic Movie Scene. Focus on: Dramatic lighting, color grading (teal & orange, noir, neon), atmospheric fog, storytelling shadows, cinematic aspect ratio feel, master shot.`;
    
    case AppMode.ANALOG_FILM:
      return `${baseInstruction} Context: Analog Photography Simulation. Focus on: Specific film stocks (Portra 400, Kodak Gold), authentic film grain, light leaks, slight chromatic aberration, vintage color cast, nostalgic mood.`;

    // Untuk mode pelukis & lainnya, gunakan general enhancement
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

// Fungsi utilitas untuk memanggil Gemini (Text)
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
  if (img1) imagePromises.push(convertFileToBase64(img1));
  if (img2) imagePromises.push(convertFileToBase64(img2));
  const base64Images = await Promise.all(imagePromises);

  if (isImageGeneration) {
    // --- INTELLIGENT PROMPT LAYER ---
    let enhancedPrompt = prompt;
    const enhancementInstruction = getPromptEnhancementInstruction(activeMode, options);
    
    // Jika user upload gambar, kita perlu Reverse Prompting + Enhancement
    if (base64Images.length > 0) {
        const contextPrompt = `Analyze the visual content of the attached image(s). Then, write a NEW, highly detailed generation prompt based on the user's request: "${prompt}". 
        Ensure you incorporate the style/subject of the reference image but apply the specific visual enhancements required by the current mode.`;
        
        const result = await callGeminiText('gemini-2.5-flash-latest', contextPrompt, base64Images, enhancementInstruction);
        if (result) enhancedPrompt = result;
    } 
    // Jika hanya text, kita Enhance text-nya saja
    else {
        // Jika prompt user terlalu pendek, kita minta Gemini berimprovisasi dengan bijak
        const contextPrompt = `User request: "${prompt}". Rewrite this into a master-quality image generation prompt.`;
        const result = await callGeminiText('gemini-2.5-flash-latest', contextPrompt, [], enhancementInstruction);
        if (result) enhancedPrompt = result;
    }

    console.log(`[Mode: ${activeMode}] Enhanced Prompt:`, enhancedPrompt); // Debugging purpose

    // 2. Generate Image with Enhanced Prompt
    const images = await generateImageContent(enhancedPrompt, ratio);
    
    return {
      images: images.map(url => ({ url, prompt: enhancedPrompt })), // Return enhanced prompt so user can see the magic
      text: ''
    };

  } else {
    // --- TEXT / ANALYSIS TOOLS ---
    const systemInstruction = getSystemInstruction(activeMode);
    const text = await callGeminiText('gemini-2.5-flash-latest', prompt, base64Images, systemInstruction);
    return {
      images: [],
      text: text
    };
  }
};