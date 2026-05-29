import { NextResponse } from "next/server";
import { buildPortfolioContext } from "@/app/lib/portfolio-knowledge";
import { portfolioFacts } from "@/app/lib/portfolio-knowledge";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY ?? process.env.API_KEY;
}

function getGeminiModel() {
  // allow override via env; default to the latest flash family
  return process.env.GEMINI_MODEL ?? "models/gemini-flash-latest";
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content ?? "";
    const localReply = buildLocalReply(latestMessage);
    if (localReply) {
      return NextResponse.json({ answer: localReply, fallback: true });
    }

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Gemini API key" },
        { status: 500 }
      );
    }

    const conversation = messages.slice(-12).map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const model = getGeminiModel();
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: [
                  "You are the portfolio assistant for Tola Rom.",
                  "Answer visitor questions using only the portfolio facts below.",
                  "If a question is outside the facts, say you do not know and suggest contacting Tola directly.",
                  "Keep responses concise, friendly, and practical.",
                  "",
                  buildPortfolioContext(),
                ].join("\n"),
              },
            ],
          },
          contents: conversation,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        answer: buildFallbackAnswer(latestMessage),
        fallback: true,
      });
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const answer =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim() ||
      buildFallbackAnswer(latestMessage);

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({
      answer: buildFallbackAnswer(""),
      fallback: true,
    });
  }
}

function buildLocalReply(question: string) {
  const normalizedQuestion = question.toLowerCase().trim();

  if (!normalizedQuestion) {
    return null;
  }

  // Birthday quick-reply
  if (/\b(my birthday|its my birthday|it's my birthday|today is my birthday|happy birthday to me|i'm celebrating my birthday|i am celebrating my birthday)\b/i.test(normalizedQuestion)) {
    const who = portfolioFacts?.name ? `, ${portfolioFacts.name}` : "";
    return `Happy birthday${who}! 🎉 I hope you have a wonderful day.`;
  }

  if (/^(hi|hello|hey|yo|good morning|good afternoon|good evening)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Hello. What would you like to know about Tola?";
  }

  if (/^(how are you|how's it going|whats up|what's up|sup)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "I’m good. I can help with Tola’s skills, projects, education, or contact details.";
  }

  if (/^(thanks|thank you|thx|nice|cool)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "You’re welcome. Ask me anything else about Tola.";
  }

  if (/^(bye|goodbye|see you|talk later)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Bye. Come back anytime if you want to know more about Tola.";
  }

  if (/^(who are you|what are you|tell me about yourself)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "I’m Tola’s portfolio assistant. I can answer questions about his background, skills, projects, and contact details.";
  }

  return null;
}

function buildFallbackAnswer(question: string) {
  const normalizedQuestion = question.toLowerCase();

  if (/^(hi|hello|hey|yo|good morning|good afternoon|good evening)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Hello. What would you like to know about Tola?";
  }

  // Birthday fallback reply
  if (/\b(my birthday|its my birthday|it's my birthday|today is my birthday|happy birthday to me|i'm celebrating my birthday|i am celebrating my birthday)\b/i.test(normalizedQuestion)) {
    const who = portfolioFacts?.name ? `, ${portfolioFacts.name}` : "";
    return `Happy birthday${who}! 🎉 The assistant is using local data right now, but I hope you have a great day.`;
  }

  if (/^(how are you|how's it going|whats up|what's up|sup)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "I’m good. I can help with Tola’s skills, projects, education, or contact details.";
  }

  if (/^(thanks|thank you|thx|nice|cool)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "You’re welcome. Ask me anything else about Tola.";
  }

  if (/^(bye|goodbye|see you|talk later)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Bye. Come back anytime if you want to know more about Tola.";
  }

  if (/^(who are you|what are you|tell me about yourself)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "I’m Tola’s portfolio assistant. I can answer questions about his background, skills, projects, and contact details.";
  }

  if (/skill|stack|know|can he do|expert/i.test(normalizedQuestion)) {
    return `Tola's main skills include ${portfolioFacts.skills.slice(0, 6).join(", ")} and more across Linux, networking, deployment, and web fundamentals. If you want the full list, ask about skills again or contact him directly. `;
  }

  if (/project|work|built|portfolio/i.test(normalizedQuestion)) {
    return `He has worked on projects like ${portfolioFacts.projects[0].title}, ${portfolioFacts.projects[1].title}, ${portfolioFacts.projects[2].title}, and ${portfolioFacts.projects[3].title}. ${portfolioFacts.projects[0].description}`;
  }

  if (/education|school|study|college|university/i.test(normalizedQuestion)) {
    return `He is studying ${portfolioFacts.education[0].degree} at ${portfolioFacts.education[0].school} and also completed an English Language Diploma at ${portfolioFacts.education[1].school}.`;
  }

  if (/contact|email|phone|reach|linkedin|github/i.test(normalizedQuestion)) {
    return `You can reach Tola at ${portfolioFacts.contact.email}, ${portfolioFacts.contact.phone}, or through GitHub and LinkedIn. The assistant is temporarily using a local fallback because Gemini quota is unavailable.`;
  }

  return `I can answer questions about Tola's education, skills, projects, and contact details. The assistant is currently using a local fallback based on the portfolio data.`;
}