import fs from "fs/promises";
import path from "path";

export type Subscriber = {
  email: string;
  subscribedAt: string;
  message?: string;
};

const configuredSubscribersFile = process.env.SUBSCRIBERS_FILE_PATH?.trim();
const isServerlessRuntime = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const defaultSubscribersFile = path.join(process.cwd(), "data", "subscribers.json");
const serverlessSubscribersFile = path.join(process.env.TMPDIR ?? process.env.TEMP ?? "/tmp", "subscribers.json");

export const subscribersFile = configuredSubscribersFile || (isServerlessRuntime ? serverlessSubscribersFile : defaultSubscribersFile);

export async function readSubscribers() {
  try {
    const raw = await fs.readFile(subscribersFile, "utf8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

export async function writeSubscribers(subscribers: Subscriber[]) {
  await fs.mkdir(path.dirname(subscribersFile), { recursive: true });
  await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2), "utf8");
}
