import { GoogleGenAI, Type } from "@google/genai";
import { VocabularyWord } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface GenerationParams {
    vocabType: string;
    wordCount: number;
    includeExample: boolean;
    previouslyGeneratedWords: string[];
}

export const generateVocabulary = async ({ vocabType, wordCount, includeExample, previouslyGeneratedWords }: GenerationParams): Promise<VocabularyWord[]> => {
  try {
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        vocabulary: {
          type: Type.ARRAY,
          description: "A list of vocabulary words.",
          items: {
            type: Type.OBJECT,
            properties: {
              word: {
                type: Type.STRING,
                description: "The vocabulary word.",
              },
              definition: {
                type: Type.STRING,
                description: "A clear, concise, and precise one-sentence definition of the word.",
              },
              ...(includeExample && {
                example: {
                  type: Type.STRING,
                  description: "An example sentence using the word.",
                },
              }),
            },
            required: ["word", "definition", ...(includeExample ? ["example"] : [])],
          },
        },
      },
      required: ["vocabulary"],
    };

    const exampleInstruction = includeExample 
        ? "For each word, provide a clear, concise, and precise definition (one short sentence) and an interesting example sentence." 
        : "For each word, provide a clear, concise, and precise definition (one short sentence). Do not provide an example sentence.";
    
    const exclusionInstruction = previouslyGeneratedWords.length > 0 
        ? `Do not include any of these words, as they have been shown before: ${previouslyGeneratedWords.join(', ')}.` 
        : '';

    const prompt = `Generate a list of ${wordCount} unique, interesting, and non-trivial vocabulary words. The style of the words should be "${vocabType}". ${exampleInstruction} ${exclusionInstruction}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, 
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (parsedJson && Array.isArray(parsedJson.vocabulary)) {
        return parsedJson.vocabulary as VocabularyWord[];
    } else {
        throw new Error("Invalid response format from API. Expected a 'vocabulary' array.");
    }
  } catch (error) {
    console.error("Error generating vocabulary:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate vocabulary: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating vocabulary.");
  }
};