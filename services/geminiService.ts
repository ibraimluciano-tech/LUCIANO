import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const explainTopic = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Safety Instructor for warehouse workers. 
      Explain the following workplace safety topic simply and clearly in 2-3 sentences. 
      Focus on why it matters for a storekeeper/almoxarife.
      Topic: "${topic}"`,
    });
    return response.text || "Sorry, I couldn't explain this topic right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI tutor.";
  }
};

export const analyzeCaseStudyAnswer = async (scenario: string, userAnswer: string, idealAnswer: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Role: Safety Instructor.
      Task: Evaluate a student's answer to a safety scenario.
      
      Scenario: "${scenario}"
      
      Student Answer: "${userAnswer}"
      
      Ideal Answer (Reference): "${idealAnswer}"
      
      Instructions:
      1. Rate the answer as "Correct", "Partially Correct", or "Incorrect".
      2. Provide constructive feedback. If they missed something from the ideal answer, explain it gently.
      3. Keep the feedback under 100 words.`,
    });
    return response.text || "Could not analyze answer.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error analyzing answer.";
  }
};

export const getDeepDive = async (question: string, answer: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Explain why the answer "${answer}" is correct for the question: "${question}". Provide a real-world warehouse example if applicable.`
    });
    return response.text || "No additional details available.";
  } catch (error) {
      console.error(error);
      return "Could not load details.";
  }
}
