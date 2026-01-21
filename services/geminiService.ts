
import { GoogleGenAI } from "@google/genai";
import { Place } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Prefix to identify our app's images in LocalStorage
const CACHE_KEY_PREFIX = 'huelvalate_img_v1_';

// CIRCUIT BREAKER: If we hit a quota limit, stop trying to generate images for this session
let isQuotaExhausted = false;

// Helper to check if an error is related to Quota (429)
const isQuotaError = (error: any): boolean => {
  try {
    const errStr = JSON.stringify(error, Object.getOwnPropertyNames(error)).toLowerCase();
    return (
      errStr.includes('429') ||
      errStr.includes('quota') ||
      errStr.includes('resource_exhausted') ||
      error?.status === 429 ||
      error?.code === 429 ||
      (error?.message && error.message.includes('429'))
    );
  } catch (e) {
    return false;
  }
};

// Helper to generate a unique key for each place based on title and location
// Exported so Layout can use it to export data
export const getCacheKey = (title: string, location: string) => {
  // Sanitize strings to create a safe key
  const safeStr = `${title}_${location}`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return `${CACHE_KEY_PREFIX}${safeStr}`;
};

export const getCachedImage = (title: string, location: string): string | null => {
  try {
    const key = getCacheKey(title, location);
    return localStorage.getItem(key);
  } catch (e) {
    console.warn("Error reading from localStorage", e);
    return null;
  }
};

export const generatePlaceDetails = async (place: Place): Promise<string> => {
  if (isQuotaExhausted) {
    return "El asistente virtual está descansando por unos momentos. Por favor, disfruta de la información disponible.";
  }

  try {
    const modelId = 'gemini-3-flash-preview';
    
    const prompt = `
      Actúa como un guía turístico experto de la provincia de Huelva.
      El usuario quiere saber más sobre: "${place.title}" situado en "${place.location}".
      
      Proporciona un texto breve (máximo 2 párrafos) y atractivo que invite a visitarlo. 
      Destaca curiosidades, la mejor época para ir o qué se siente al estar allí.
      
      Usa un tono inspirador y cálido.
      Si es una playa, menciona el ambiente.
      Si es senderismo, menciona la naturaleza.
      Si es patrimonio, menciona la historia.
      Si es un evento (agenda), menciona qué esperar, horarios aproximados y por qué no perdérselo.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "No se pudo generar la descripción en este momento.";
  } catch (error: any) {
    console.error("Error generating place details:", error);
    if (isQuotaError(error)) {
      isQuotaExhausted = true;
      console.warn("Quota exhausted. Switching to static mode.");
      return "El asistente virtual está descansando por unos momentos. Por favor, disfruta de la información disponible.";
    }
    return "Lo sentimos, el asistente virtual no está disponible en este momento. ¡Pero te aseguramos que el lugar merece la pena!";
  }
};

export const generateImageForLocation = async (title: string, location: string, description: string): Promise<string | null> => {
  // --- DEVELOPMENT MODE ---
  // Return null immediately to stop AI image generation while developing.
  // This forces the app to use the static Unsplash images defined in constants.ts
  return null;

  /* 
  // ORIGINAL CODE DISABLED TEMPORARILY
  
  // 0. CHECK CIRCUIT BREAKER
  if (isQuotaExhausted) {
    return null;
  }

  // 1. CHECK CACHE FIRST
  const cacheKey = getCacheKey(title, location);
  try {
    const cachedImage = localStorage.getItem(cacheKey);
    if (cachedImage) {
      return cachedImage;
    }
  } catch (e) {
    console.warn("Could not read from localStorage", e);
  }

  // 2. GENERATE IF NOT IN CACHE
  try {
    // Using the economical 'nano banana' (Flash Image) model
    const modelId = 'gemini-2.5-flash-image';
    
    const prompt = `
      Genera una fotografía realista, de alta calidad y estilo profesional para una guía de viajes.
      Lugar: ${title}
      Ubicación: ${location}
      Contexto visual: ${description}
      
      La imagen debe ser atractiva, con buena iluminación (hora dorada o luz natural brillante), 
      sin texto superpuesto, enfocada en la belleza del paisaje o monumento.
      Si es comida, que sea apetecible.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [{ text: prompt }]
      },
    });

    // Iterate through parts to find the image
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const fullImageUri = `data:image/png;base64,${base64EncodeString}`;

          // 3. SAVE TO CACHE
          try {
            localStorage.setItem(cacheKey, fullImageUri);
          } catch (storageError) {
            console.warn("LocalStorage quota exceeded. Image could not be cached:", storageError);
          }

          return fullImageUri;
        }
      }
    }
    
    return null;
  } catch (error: any) {
    console.error("Error generating image:", error);
    // Check for 429 Quota Exceeded
    if (isQuotaError(error)) {
      isQuotaExhausted = true;
      console.warn("Quota exhausted. Stopping further image generation requests.");
    }
    return null; // Fallback will be handled by the component using the static image
  }
  */
};

export const searchPlacesWithAI = async (query: string, allPlaces: Place[]): Promise<string[]> => {
  const fallbackSearch = () => {
     const lowerQuery = query.toLowerCase();
     return allPlaces
      .filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
        p.location.toLowerCase().includes(lowerQuery)
      )
      .map(p => p.id);
  };

  if (isQuotaExhausted) {
     return fallbackSearch();
  }

  try {
    const modelId = 'gemini-3-flash-preview';

    // 1. Create a lightweight context of the data to avoid token limits and save cost
    const placesContext = allPlaces.map(p => ({
      id: p.id,
      title: p.title,
      tags: p.tags,
      desc: p.shortDescription,
      loc: p.location
    }));

    const prompt = `
      Eres un motor de búsqueda semántico para una app de turismo en Huelva.
      
      DATOS DISPONIBLES (JSON):
      ${JSON.stringify(placesContext)}
      
      CONSULTA DEL USUARIO: "${query}"
      
      TAREA:
      1. Analiza la intención del usuario (ej: "sitios para comer", "naturaleza", "romántico", "historia").
      2. Busca coincidencias en los títulos, descripciones, tags o ubicaciones.
      3. Devuelve un array JSON de STRINGS con los IDs de los lugares más relevantes.
      4. Ordena por relevancia.
      5. Si no hay coincidencias claras, intenta inferir (ej: "agua" -> playas o ríos).
      
      Devuelve SOLO el array JSON. Ejemplo: ["s-1", "p-3"]
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];

    // Parse the JSON array
    const ids = JSON.parse(text);
    return Array.isArray(ids) ? ids : [];

  } catch (error: any) {
    console.error("Error searching with AI:", error);
    
    if (isQuotaError(error)) {
      isQuotaExhausted = true;
    }

    // Fallback: Simple text search if AI fails
    return fallbackSearch();
  }
};

interface DirectionsResponse {
  text: string;
  groundingChunks: any[];
}

export const getDirectionsToPlace = async (userLocation: {lat: number, lng: number}, placeTitle: string, placeLocation: string): Promise<DirectionsResponse> => {
  if (isQuotaExhausted) {
    return { text: "El servicio de rutas no está disponible temporalmente.", groundingChunks: [] };
  }

  try {
    // REQUIRED: Must use gemini-2.5 series for Maps Grounding.
    // We add googleSearch to allow distance calculation which googleMaps tool alone cannot do.
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      El usuario está en las coordenadas: ${userLocation.lat}, ${userLocation.lng}.
      Quiere ir a: "${placeTitle}" en "${placeLocation}, Huelva, España".
      
      Usa la herramienta de Búsqueda de Google (googleSearch) para encontrar la distancia de conducción real y el tiempo estimado desde la ubicación del usuario.
      
      Responde BREVEMENTE con:
      1. La distancia y tiempo (ej: "Aprox. 45 min (50 km) en coche").
      2. La vía principal recomendada (ej: "Tomando la A-49").
      
      No des instrucciones paso a paso detalladas, solo el resumen.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleMaps: {}, googleSearch: {} }]
      }
    });

    return {
      text: response.text || "No se pudo calcular la ruta.",
      // Extract grounding chunks as required by policy
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };

  } catch (error: any) {
    console.error("Error getting directions:", error);
    if (isQuotaError(error)) {
      isQuotaExhausted = true;
    }
    return { text: "Error al conectar con el servicio de mapas.", groundingChunks: [] };
  }
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const chatWithTravelAssistant = async (history: ChatMessage[], userMessage: string): Promise<string> => {
  if (isQuotaExhausted) {
    return "Lo siento, estoy tomando un descanso. Intenta más tarde.";
  }

  try {
    const modelId = 'gemini-3-flash-preview';

    // Format history for the API
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const systemInstruction = `
      Eres "Tartessos", un asistente virtual experto y amigable especializado en turismo de la provincia de Huelva, España.
      Tu objetivo es ayudar a los turistas a planificar su viaje, recomendar restaurantes, rutas, playas y eventos.
      
      Reglas:
      1. Respuestas concisas, útiles y con un tono cálido ("sur", acogedor).
      2. Si te preguntan por comida, recomienda siempre productos locales (jamón, gambas, chocos, vinos del condado).
      3. Si te preguntan por playas, distingue entre familiares (Matalascañas) y salvajes (Cuesta Maneli).
      4. Si no sabes algo específico, sugiere consultar la oficina de turismo local.
      5. Intenta siempre vender la belleza de Huelva.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "No tengo una respuesta para eso ahora mismo.";

  } catch (error: any) {
    console.error("Error chatting with AI:", error);
    if (isQuotaError(error)) {
      isQuotaExhausted = true;
    }
    return "Tuve un pequeño problema de conexión. ¿Podrías repetirlo?";
  }
};
