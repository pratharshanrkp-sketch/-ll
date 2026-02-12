
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLensIdeas = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Act as a creative AR designer. Based on this prompt: "${prompt}", generate 3 innovative AR lens concepts. 
               Include a title, a brief description of the visual effects, and a suggested category (Face, World, or Portal).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING }
          },
          required: ["title", "description", "category"]
        }
      }
    }
  });
  
  return JSON.parse(response.text || '[]');
};

export const applyAIFilterToImage = async (base64Image: string, filterDescription: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/png',
          },
        },
        {
          text: `Modify this image as if an AR lens was applied to it. The lens effect is described as: "${filterDescription}". 
                 Add vibrant, futuristic augmented reality elements, neon glows, or digital distortions. Keep the person's face visible but enhanced.`,
        },
      ],
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
