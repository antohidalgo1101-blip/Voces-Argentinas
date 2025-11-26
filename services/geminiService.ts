import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Recommendation } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const discoverArtists = async (userQuery: string): Promise<Recommendation[]> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return [
      {
        artistName: "Gustavo Cerati",
        reason: "Una leyenda del rock en español, ideal para empezar.",
        suggestedTrack: "Crimen"
      }
    ];
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          artistName: { type: Type.STRING },
          reason: { type: Type.STRING },
          suggestedTrack: { type: Type.STRING }
        },
        required: ["artistName", "reason", "suggestedTrack"]
      }
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: `El usuario está interesado en música argentina. Su consulta es: "${userQuery}".
      Recomienda 3 cantantes o bandas argentinas que encajen con esta descripción.
      Mantén las razones breves y apasionantes (máximo 20 palabras).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "Eres un experto en música argentina. Tu objetivo es conectar a la gente con el Rock Nacional, Tango, Folklore, y Pop argentino."
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Recommendation[];

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};