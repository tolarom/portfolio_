import { readFileSync } from "node:fs";

type PortfolioFacts = {
  name: string;
  headline: string;
  summary: string;
  profile?: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  education: Array<{
    school: string;
    degree: string;
    period: string;
    status?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    tags?: string[];
    category?: string;
    link?: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    github?: string;
    linkedin?: string;
    socialLinks?: Array<{ label: string; href: string }>;
  };
  goals: string[];
  interests?: string[];
  hobbies?: string[];
  languages?: Array<{
    language: string;
    proficiency: string;
  }>;
};

export const portfolioFacts = JSON.parse(
  readFileSync(new URL("./portfolio-data.json", import.meta.url), "utf8")
) as PortfolioFacts;

export function buildPortfolioContext() {
  const profile = portfolioFacts.profile?.paragraphs
    .map((paragraph) => `- ${paragraph}`)
    .join("\n");

  const education = portfolioFacts.education
    .map(
      (item) =>
        `- ${item.school}: ${item.degree} (${item.period}${item.status ? `, ${item.status}` : ""})`
    )
    .join("\n");

  const skills = portfolioFacts.skills
    .map((skill) => `- ${skill.category}: ${skill.items.join(", ")}`)
    .join("\n");
  const projects = portfolioFacts.projects
    .map((project) => {
      const details = [project.category, project.tags?.join(", ")].filter(Boolean).join(" | ");
      const extra = details ? ` (${details})` : "";
      return `- ${project.title}: ${project.description}${extra}`;
    })
    .join("\n");

  const interests = portfolioFacts.interests?.map((i) => `- ${i}`).join("\n");
  const hobbies = portfolioFacts.hobbies?.map((h) => `- ${h}`).join("\n");
  const languages = portfolioFacts.languages?.map((language) => `- ${language.language}: ${language.proficiency}`).join("\n");

  return [
    `Name: ${portfolioFacts.name}`,
    `Headline: ${portfolioFacts.headline}`,
    `Summary: ${portfolioFacts.summary}`,
    ...(profile ? ["Profile:", profile] : []),
    `Goals: ${portfolioFacts.goals.join(", ")}`,
    "Education:",
    education,
    "Skills:",
    skills,
    "Projects:",
    projects,
    "Contact:",
    `- Email: ${portfolioFacts.contact.email}`,
    `- Phone: ${portfolioFacts.contact.phone}`,
    `- Location: ${portfolioFacts.contact.location}`,
    ...(portfolioFacts.contact.github ? [`- GitHub: ${portfolioFacts.contact.github}`] : []),
    ...(portfolioFacts.contact.linkedin ? [`- LinkedIn: ${portfolioFacts.contact.linkedin}`] : []),
    ...(portfolioFacts.contact.socialLinks ? portfolioFacts.contact.socialLinks.map(s => `- ${s.label}: ${s.href}`) : []),
    ...(languages ? ["Languages:", languages] : []),
    ...(interests ? ["Interests:", interests] : []),
    ...(hobbies ? ["Hobbies:", hobbies] : []),
  ].join("\n");
}