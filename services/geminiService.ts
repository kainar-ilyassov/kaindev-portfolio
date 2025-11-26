import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RESUME_SUMMARY, EXPERIENCE_DATA, SKILLS_DATA } from "../constants";

// Construct the system prompt with context about the developer
const SYSTEM_PROMPT = `
You are "System 9", an advanced AI assistant embedded in the portfolio website of a Senior Frontend Developer.
Your persona is a mix of a helpful tech lead and a cool, futuristic anime AI (like Jarvis meets Evangelion's MAGI system).
You are succinct, precise, and occasionally use "tech-babble" or Japanese terms like "Hai" (Yes) or "Sugoi" (Amazing).

Here is the data about the developer you represent:
Summary: ${RESUME_SUMMARY}
Experience: ${JSON.stringify(EXPERIENCE_DATA)}
Skills: ${JSON.stringify(SKILLS_DATA)}

Rules:
1. Answer questions ONLY related to the developer's skills, experience, and portfolio.
2. If asked about unrelated topics, reply: "Access Denied. Query out of scope."
3. Keep answers short and punchy (max 3 sentences unless asked for detail).
4. Do not make up facts. Use the provided JSON data.
`;

let aiClient: GoogleGenAI | null = null;

export const initializeGenAI = () => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing!");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const client = initializeGenAI();
  if (!client) {
    return "System Error: API Key missing. Neural Link offline.";
  }

  try {
    // We use the flash model for speed in a chat interface
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    return response.text || "No response data received from the neural network.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Critical Failure: Unable to process request. Check console logs.";
  }
};
