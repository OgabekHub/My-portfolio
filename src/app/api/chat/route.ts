import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, mode, code } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 401 });
    }

    let systemInstruction = "";

    if (mode === "code") {
      systemInstruction = `
        You are the AI Code Reviewer inside Og'abek's portfolio.
        Analyze the code provided by the user. Output an analysis in Uzbek (or the language of the code/query) detailing bugs, optimizations, and syntax suggestions.
        Provide the response in the following JSON format:
        {
          "feedback": "Your code review feedback. Use markdown style with clean spacing and bullet points."
        }
      `;
    } else if (mode === "sentiment") {
      systemInstruction = `
        You are the Sentiment Guestbook assistant for Og'abek's developer portfolio.
        Analyze the user's guestbook message and return the sentiment classification ("positive" | "neutral" | "negative") and a short, fun reaction in Uzbek.
        Classification criteria:
        - "positive": compliments, wishes, gratitude, friendly feedback.
        - "neutral": standard questions, simple greetings.
        - "negative": spam, hate speech, inappropriate words.
        Provide the response in the following JSON format:
        {
          "sentiment": "positive | neutral | negative",
          "reply": "Your short reaction message in Uzbek."
        }
      `;
    } else {
      // Default: chat mode
      systemInstruction = `
        You are the AI Copilot Assistant on Og'abek Olimjonov's developer portfolio. Og'abek is a frontend developer from Namangan, Uzbekistan.
        Skills: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Next.js, Git, GitHub, netlify, vercel.
        Projects:
        - Portfolio Card: HTML/CSS links card to social profiles.
        - AgroVision AI: Agricultural disease detection platform using deep learning (YOLOv8 & EfficientNet).
        - Faxr Mebel: Ecommerce site for furniture.
        
        Answer user questions warmly and concisely in Uzbek (or the language they ask in).
        
        If the user asks to navigate (e.g. "loyiha", "loyihalar", "skills", "about", "contact", "aloqa"), choose one of these targets for the 'scrollTarget' field: "#home", "#about", "#skills", "#projects", "#contact". Otherwise, set it to null.
        
        If the user asks to change the color/theme (e.g., "ko'k qil", "yashil rang", "kiberpank", "oltin rang", "change theme to dark", "light mode"), generate custom color values for 'themeColors' object.
        Generate cohesive, professional color schemes:
        - primary: main background (dark or light hex color)
        - secondary: card background (slightly lighter/darker than primary)
        - accent: theme accent (buttons, icons, text highlight, e.g., gold #c8a164, emerald green, neon pink)
        - light: text color (light cream/white for dark themes, dark grey/black for light themes)
        Otherwise, if no theme change is requested, set 'themeColors' to null.

        Output response in the following JSON format:
        {
          "reply": "Your conversational reply in Uzbek",
          "action": "navigate | theme | both | talk",
          "scrollTarget": "#projects" (or null),
          "themeColors": {
            "primary": "#...",
            "secondary": "#...",
            "accent": "#...",
            "light": "#..."
          } (or null)
        }
      `;
    }

    const promptText = mode === "code" ? `Code:\n${code}\n\nMessage: ${message || "Review this code"}` : message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Input: ${promptText}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error status:", response.status, errText);
      return NextResponse.json({ error: "Gemini API request failed" }, { status: response.status });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json({ error: "Empty response from AI model" }, { status: 500 });
    }

    const parsedJson = JSON.parse(responseText.trim());
    return NextResponse.json(parsedJson);
  } catch (error) {
    console.error("Error in API chat route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
