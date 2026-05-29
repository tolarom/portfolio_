import { readFileSync } from "node:fs";

type PortfolioFacts = {
  name: string;
  birthdate?: string;
  headline: string;
  summary: string;
  education: Array<{
    school: string;
    degree: string;
    period: string;
    status?: string;
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  goals: string[];
  interests?: string[];
  hobbies?: string[];
};

export const portfolioFacts = JSON.parse(
  readFileSync(new URL("./portfolio-data.json", import.meta.url), "utf8")
) as PortfolioFacts;

export function buildPortfolioContext() {
  const education = portfolioFacts.education
    .map(
      (item) =>
        `- ${item.school}: ${item.degree} (${item.period}${item.status ? `, ${item.status}` : ""})`
    )
    .join("\n");

  const skills = portfolioFacts.skills.map((skill) => `- ${skill}`).join("\n");
  const projects = portfolioFacts.projects
    .map((project) => `- ${project.title}: ${project.description}`)
    .join("\n");

  const interests = portfolioFacts.interests?.map((i) => `- ${i}`).join("\n");
  const hobbies = portfolioFacts.hobbies?.map((h) => `- ${h}`).join("\n");

  return [
    `Name: ${portfolioFacts.name}`,
    `Headline: ${portfolioFacts.headline}`,
    `Summary: ${portfolioFacts.summary}`,
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
    `- GitHub: ${portfolioFacts.contact.github}`,
    `- LinkedIn: ${portfolioFacts.contact.linkedin}`,
    ...(interests ? ["Interests:", interests] : []),
    ...(hobbies ? ["Hobbies:", hobbies] : []),
  ].join("\n");
}