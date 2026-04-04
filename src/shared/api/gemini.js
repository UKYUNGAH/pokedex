import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const askPokemon = async (pokemonName, koreanName, message) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
    너는 포켓몬 ${koreanName}(${pokemonName})이야.
    ${koreanName}의 성격과 특징에 맞게 1인칭으로 대답해줘.
    귀엽고 친근하게 한국어로 대답해줘.
    짧고 간결하게 2~3문장으로 대답해줘.
    포켓몬과 관련없는 질문은 "나는 포켓몬에 대한 것만 알아!" 라고 대답해줘.
    질문: ${message}
`,
    });
    return response.text;
};
