
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getGreeting(name: string): Promise<string> {
    if (!API_KEY) {
        return "Kaabọ! Welcome to Yoruba Liberty Radio.";
    }
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a short, warm, and inspiring welcome message for a listener of 'Yoruba Liberty Radio'. The message should be one or two sentences, starting with a Yoruba greeting like 'Kaabọ!'. The message should evoke themes of liberty, truth, and cultural pride. It must end with the exact sentence: "Let your spirit be inspired for a liberated tomorrow."`,
        });

        const text = response.text;
        if (!text) {
          throw new Error('No text in response');
        }
        return text.trim();
    } catch (error) {
        console.error("Error generating greeting:", error);
        // Fallback message
        return "Kaabọ! Welcome to Yoruba Liberty Radio, your voice for liberty and truth.";
    }
}

export async function getYorubaProverb(): Promise<{ yoruba: string; translation: string; meaning: string }> {
    if (!API_KEY) {
         return {
            yoruba: "Odò tí ó gbé gbe kì í gbé òkúta.",
            translation: "The river that carries away the drying rack does not carry away the stone.",
            meaning: "Resilience and stability allow one to withstand challenges that sweep others away."
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a random Yoruba proverb (Owe). Return the response in this JSON format: { "yoruba": "The proverb in Yoruba", "translation": "English literal translation", "meaning": "Brief explanation of the meaning" }. Do not use markdown code blocks.`,
             config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response");
        return JSON.parse(text);
    } catch (error) {
        console.error("Error generating proverb:", error);
         return {
            yoruba: "Ìwà lẹwà.",
            translation: "Character is beauty.",
            meaning: "Good character is the essence of true beauty."
        };
    }
}
