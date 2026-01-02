import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiVersion: 'v1', apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { prompt, Todos, currentDate, userName, progressData } = await req.json();  // Parse body from fetch
        if (!prompt) return Response.json({ error: "Prompt required" }, { status: 400 });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{
                parts: [{
                    text: `
You are a calm, wise, and empathetic productivity mentor helping ${userName} inside a priority-based todo app built on the Eisenhower Matrix.

Context:

Quadrants:
Imp_Urg = Do immediately (important and urgent)
Imp_nUrg = Schedule (important but not urgent)
nImp_Urg = Delegate or minimize
nImp_nUrg = Eliminate or avoid

Todos for today: ${Todos[currentDate]}

Each todo includes an isDone flag

Overall progress: ${progressData}

Current date: ${currentDate}

User query: ${prompt}

Instructions:

Analyze only unfinished tasks first, grouped by quadrant

Answer user query first priority

Length must be 20–25 words

Output plain text only (no markdown, no symbols, no bullet points)

Do not include any undefined characters or extra text at the end

Goal:
Help the user feel clear, motivated, and confident about what to do next while reinforcing efficient, stress-free prioritization.
` }]
            }],
        });
        console.log(response.candidates[0]?.content?.parts[0]?.text)

        return Response.json({ response: (response.candidates[0]?.content?.parts[0]?.text || "No response generated").trim() });
    } catch (error) {
        console.log("Gemini API Error:", error);
        return Response.json({ error: "Failed to generate response" }, { status: 500 });
    }
}
