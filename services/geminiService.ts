import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppMode, GeneratedImage, GenerationOptions, KoreaTravelOptions, IndonesiaTravelOptions, UmrahHajjOptions } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function fileToPart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            resolve(reader.result.split(',')[1]);
        } else {
            reject(new Error('Failed to read file'));
        }
    };
    reader.readAsDataURL(file);
  });
  
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
}

export const generateCreativeContent = async (
  activeMode: AppMode,
  prompt: string,
  img1: File | null,
  img2: File | null,
  ratio: string,
  options?: GenerationOptions
): Promise<{ images: GeneratedImage[]; text: string }> => {
  
  const parts: any[] = [];
  let finalPrompt = prompt;
  
  // --- Prompt Construction Logic ---
  
  if (activeMode === AppMode.KOREA_TRAVEL) {
       const koreaOpts = options as KoreaTravelOptions;
       if (koreaOpts) {
           if (koreaOpts.shotType === 'landscape') {
               finalPrompt = `Analyze the style/composition. Generate a LANDSCAPE VIEW of ${koreaOpts.location}, South Korea. Atmosphere: ${koreaOpts.season}, Time: ${koreaOpts.timeOfDay}. No people. Context: "${prompt}".`;
           } else if (koreaOpts.files && koreaOpts.files.length > 0) {
              finalPrompt = `Reference photos provided. Generate a TRAVEL PHOTO of this group in ${koreaOpts.location}, South Korea. Attire: ${koreaOpts.attireStyle}. Season: ${koreaOpts.season}. Keep faces recognizable and mood joyful. Context: "${prompt}".`;
              for (const f of koreaOpts.files) parts.push(await fileToPart(f));
           } else {
              finalPrompt = `Reference photo provided. Place person in DREAM KOREA TRAVEL SCENE at ${koreaOpts.location}. Attire: ${koreaOpts.attireStyle}. Season: ${koreaOpts.season}. Keep face recognizable. Context: "${prompt}".`;
           }
       }
  } else if (activeMode === AppMode.INDONESIA_TRAVEL) {
       const indoOpts = options as IndonesiaTravelOptions;
       if (indoOpts) {
           if (indoOpts.shotType === 'landscape') {
               finalPrompt = `Analyze style. Generate LANDSCAPE VIEW of ${indoOpts.location}, Indonesia. Atmosphere: ${indoOpts.season}, Time: ${indoOpts.timeOfDay}. No people. Context: "${prompt}".`;
           } else if (indoOpts.files && indoOpts.files.length > 0) {
              finalPrompt = `Reference photos provided. Generate TRAVEL PHOTO of group in ${indoOpts.location}, Indonesia. Attire: ${indoOpts.attireStyle}. Season: ${indoOpts.season}. Keep faces recognizable and mood joyful. Context: "${prompt}".`;
              for (const f of indoOpts.files) parts.push(await fileToPart(f));
           } else {
              finalPrompt = `Reference photo provided. Place person in DREAM INDONESIA TRAVEL SCENE at ${indoOpts.location}. Attire: ${indoOpts.attireStyle}. Season: ${indoOpts.season}. Keep face recognizable. Context: "${prompt}".`;
           }
       }
  } else if (activeMode === AppMode.UMRAH_HAJJ) {
       const umrahOpts = options as UmrahHajjOptions;
       if (umrahOpts) {
           if (umrahOpts.shotType === 'landscape') {
               finalPrompt = `Analyze style. Generate a STUNNING LANDSCAPE/ARCHITECTURAL VIEW of ${umrahOpts.location}, Holy Land. Focus on the architecture, atmosphere, and spirituality. NO specific focus on individual pilgrims. Mood: Serene & Spiritual. Context: "${prompt}".`;
           } else if (umrahOpts.files && umrahOpts.files.length > 0) {
              finalPrompt = `Reference photos provided. Generate a SPIRITUAL JOURNEY PHOTO of this person/group in ${umrahOpts.location}, Holy Land. Pilgrim Type: ${umrahOpts.pilgrimType}. Action: ${umrahOpts.shotType}. Wear Ihram/Hijab appropriately. Mood: Serene & Spiritual. Context: "${prompt}".`;
              for (const f of umrahOpts.files) parts.push(await fileToPart(f));
           } else {
              finalPrompt = `Generate a REALISTIC UMRAH/HAJJ PHOTO in ${umrahOpts.location}. Subject: ${umrahOpts.pilgrimType}. Action: ${umrahOpts.shotType}. Wear appropriate Ihram/Hijab. Mood: Serene & Spiritual. Context: "${prompt}".`;
           }
       }
  } else {
       // Append ratio if generic generation
       if (ratio && activeMode === AppMode.TEXT_TO_IMAGE) {
           finalPrompt = `${prompt} (Aspect Ratio: ${ratio})`;
       }
  }

  // --- Add Standard Images ---
  // If we haven't already added files via specific mode logic above
  if (activeMode !== AppMode.KOREA_TRAVEL && activeMode !== AppMode.INDONESIA_TRAVEL && activeMode !== AppMode.UMRAH_HAJJ) {
      if (img1) parts.push(await fileToPart(img1));
      if (img2) parts.push(await fileToPart(img2));
  }
  
  // Add text part last
  parts.push({ text: finalPrompt });

  // --- Select Model ---
  // Use gemini-2.5-flash-image for general image generation/editing tasks
  let modelName = 'gemini-2.5-flash-image'; 
  
  // Use text model for text-based tools
  const isTextTool = [
      AppMode.UI_TO_CODE, AppMode.NUTRITION_TRACKER, AppMode.HANDWRITING_DECIPHER,
      AppMode.DATA_ANALYST, AppMode.DIY_REPAIR, AppMode.CV_AUDITOR,
      AppMode.TRAVEL_GUIDE, AppMode.PROMPT_IDEA, AppMode.IMAGE_DESC,
      AppMode.REVERSE_PROMPT, AppMode.SOCIAL_MANAGER, AppMode.AI_CRITIC,
      AppMode.STORYTELLER, AppMode.OCR, AppMode.FOOD_TO_RECIPE,
      AppMode.MATH_SOLVER, AppMode.PLANT_CARE
  ].includes(activeMode);
  
  if (isTextTool) {
      modelName = 'gemini-3-flash-preview'; 
  }

  try {
      const response: GenerateContentResponse = await ai.models.generateContent({
          model: modelName,
          contents: { parts },
      });

      const generatedImages: GeneratedImage[] = [];
      let textContent = '';

      if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                  generatedImages.push({
                      url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`,
                      prompt: finalPrompt
                  });
              } else if (part.text) {
                  textContent += part.text;
              }
          }
      }

      return { images: generatedImages, text: textContent };
  } catch (error) {
      console.error("Gemini API Generation Error:", error);
      throw error;
  }
};
