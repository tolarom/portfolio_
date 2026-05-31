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
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 },
      );
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
        { status: 500 },
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
                  "Your name is Nikki.",
                  "Answer visitor questions using only the portfolio facts below.",
                  "If a question is outside the facts, say you do not know and suggest contacting Tola directly.",
                  "Keep responses concise, friendly, and practical.",
                  "When an answer contains multiple points, return each point on its own line prefixed with '- '.",
                  "If you begin a list or bullet answer, finish all bullets completely and do not end on a partial thought.",
                  "Do not use Markdown emphasis. Keep answers concise and factual.",
                  "Avoid long paragraphs; prefer short bullet lines for lists or multiple points.",
                  "Answer with jokey and friendly tone, but do not make up facts. If you don't know, say you don't know.",
                  "when asked the same question multiple times, jokingly remind the user. Stop answering if they keep asking the same question, but keep your cool.",
                  buildPortfolioContext(),
                ].join("\n"),
              },
            ],
          },
          contents: conversation,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 5000,
          },
        }),
      },
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
        .trim() || buildFallbackAnswer(latestMessage);

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({
      answer: buildFallbackAnswer(""),
      fallback: true,
    });
  }
}

function buildLocalReply(question: string) {
  // sanitize input: remove common pasted assistant prefix and trim
  const sanitized = question
    .replace(/I can answer questions about [\s\S]*?based on the portfolio data\.?/i, "")
    .replace(/I can answer questions about [\s\S]*?\./i, "")
    .trim();
  const normalizedQuestion = sanitized.toLowerCase().trim();

  if (!normalizedQuestion) {
    return null;
  }


  if (
    /^(hi|hello|hey|yo|good morning|good afternoon|good evening)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "Hello. What would you like to know about Tola?";
  }


  if (
    /^(how are you|how's it going|whats up|what's up|sup)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "I’m good. I can help with Tola’s skills, projects, education, or contact details.";
  }

  if (/^(thanks|thank you|thx|nice|cool)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "You’re welcome. Ask me anything else about Tola.";
  }

  if (/^(bye|goodbye|see you|talk later)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Bye. Come back anytime if you want to know more about Tola.";
  }

  if (
    /^(who are you|what are you|tell me about yourself)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "I’m Tola’s portfolio assistant. I can answer questions about his background, skills, projects, and contact details.";
  }

  if (/\b(contact|email|phone|reach|linkedin|github)\b/i.test(normalizedQuestion)) {
    const parts = [
      `Email: ${portfolioFacts.contact.email}`,
      portfolioFacts.contact.phone ? `Phone: ${portfolioFacts.contact.phone}` : null,
      portfolioFacts.contact.location ? `Location: ${portfolioFacts.contact.location}` : null,
      portfolioFacts.contact.github ? `GitHub: ${portfolioFacts.contact.github}` : null,
      portfolioFacts.contact.linkedin ? `LinkedIn: ${portfolioFacts.contact.linkedin}` : null,
    ].filter(Boolean) as string[];
    return `Contact details:\n- ${parts.join("\n- ")}`;
  }

  if (/\b(skill|skills|stack|can he do|what can he do|full skills|all skills)\b/i.test(normalizedQuestion)) {
    const skillLines = portfolioFacts.skills.map(
      (skill) => `- ${skill.category}: ${skill.items.join(", ")}`,
    );
    return `Here is Tola's full skills list:\n${skillLines.join("\n")}`;
  }

  return null;
}

function buildFallbackAnswer(question: string) {
  function formatMaybeBulleted(items: string[], header?: string) {
    const visible = items.filter(Boolean);
    if (visible.length === 0)
      return header ? `${header} not listed.` : "not listed.";
    if (visible.length === 1)
      return header ? `${header} ${visible[0]}` : visible[0];
    const lines = visible.map((i) => `- ${i}`).join("\n");
    return header ? `${header}\n${lines}` : lines;
  }

  const normalizedQuestion = question.toLowerCase();

  if (
    /^(hi|hello|hey|yo|good morning|good afternoon|good evening)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "Hello. What would you like to know about Tola?";
  }


  if (
    /^(how are you|how's it going|whats up|what's up|sup)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "I’m good. I can help with Tola’s skills, projects, education, or contact details.";
  }

  if (/^(thanks|thank you|thx|nice|cool)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "You’re welcome. Ask me anything else about Tola.";
  }

  if (/^(bye|goodbye|see you|talk later)[!.?\s]*$/i.test(normalizedQuestion)) {
    return "Bye. Come back anytime if you want to know more about Tola.";
  }

  if (
    /^(who are you|what are you|tell me about yourself)[!.?\s]*$/i.test(
      normalizedQuestion,
    )
  ) {
    return "I’m Tola’s portfolio assistant. I can answer questions about his background, skills, projects, and contact details.";
  }

  if (/skill|stack|know|can he do|expert/i.test(normalizedQuestion)) {
    const header = "Tola's main skills include:";
    const body = formatMaybeBulleted(
      portfolioFacts.skills.flatMap((skill) =>
        skill.items.map((item) => `${skill.category}: ${item}`),
      ),
      header,
    );
    return `${body}\n\nIf you want the full list, ask about skills again or contact him directly.`;
  }

  if (/project|work|built|portfolio/i.test(normalizedQuestion)) {
    const projectLines = portfolioFacts.projects.map(
      (p) => `${p.title}: ${p.description}`,
    );
    return formatMaybeBulleted(projectLines, "Notable projects:");
  }

  if (/education|school|study|college|university/i.test(normalizedQuestion)) {
    const educationLines = portfolioFacts.education.map(
      (e) =>
        `${e.school}: ${e.degree} (${e.period}${e.status ? `, ${e.status}` : ""})`,
    );
    return formatMaybeBulleted(educationLines, "Education:");
  }

  if (/contact|email|phone|reach|linkedin|github/i.test(normalizedQuestion)) {
    const fb = portfolioFacts.contact.socialLinks?.find((s) =>
      /facebook/i.test(s.label),
    )?.href;
    const github =
      portfolioFacts.contact.github ??
      portfolioFacts.contact.socialLinks?.find((s) => /github/i.test(s.label))
        ?.href;
    const linkedin =
      portfolioFacts.contact.linkedin ??
      portfolioFacts.contact.socialLinks?.find((s) => /linkedin/i.test(s.label))
        ?.href;
    const parts = [
      `Email: ${portfolioFacts.contact.email}`,
      portfolioFacts.contact.phone
        ? `Phone: ${portfolioFacts.contact.phone}`
        : null,
    ];
    if (github) parts.push(`GitHub: ${github}`);
    if (linkedin) parts.push(`LinkedIn: ${linkedin}`);
    if (fb) parts.push(`Facebook: ${fb}`);
    parts.push(
      "The assistant is temporarily using a local fallback because Gemini quota is unavailable.",
    );
    return formatMaybeBulleted(
      parts.filter(Boolean) as string[],
      "Contact details:",
    );
  }

  if (/hobby|hobbies|interest|interests/i.test(normalizedQuestion)) {
    const hobbies = portfolioFacts.hobbies ?? [];
    const interests = portfolioFacts.interests ?? [];
    const hobbiesStr = formatMaybeBulleted(hobbies, "Hobbies:");
    const interestsStr = formatMaybeBulleted(interests, "Interests:");
    return `${hobbiesStr}\n\n${interestsStr}`;
  }

  return `I can answer questions about Tola's education, skills, projects, and contact details. The assistant is currently using a local fallback based on the portfolio data.`;
}
