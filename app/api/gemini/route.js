import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    console.log(response.text);
}
export async function Post(req) {
    try {
        const { prompt, Todos, currentDate, userName , progressData} = await req.json();  // Parse body from fetch
        if (!prompt) return Response.json({ error: "Prompt required" }, { status: 400 });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert, empathetic guide for ${userName} in a priority-based todo app using Eisenhower's matrix: Imp_Urg (do now: urgent/important), Imp_nUrg (schedule: important/not urgent), nImp_Urg (delegate: not important/urgent), nImp_nUrg (eliminate: neither). User's todos: ${Todos[currentDate]} (check 'isDone' for completion status) and progress status is ${progressData}. Current date: ${currentDate}. Query: ${prompt}. Respond personally (40-50 words) with advice from a wise mentor who knows the todos well—analyze unfinished tasks by quadrant, suggest next steps (e.g., "Complete Imp_Urg first"), celebrate progress on done items, and offer tips for productivity. Be encouraging, specific, and tied to the app's focus on efficiency. and add emojes don't but any special char as only text is the resposive i don't give undefined character at the end`,
        });

        return Response.json({ response: response.text });
    } catch (error) {
        return Response.json({ error: "Failed to generate response" }, { status: 500 });
    }
}

export { main as GET, Post as POST }
