import fs from "fs/promises";
import path from "path";

export type Subscriber = {
  email: string;
  subscribedAt: string;
  message?: string;
};

const configuredSubscribersFile = process.env.SUBSCRIBERS_FILE_PATH?.trim();
const defaultSubscribersFile = path.join(/* turbopackIgnore: true */ process.cwd(), "data", "subscribers.json");
export const subscribersFile = configuredSubscribersFile || defaultSubscribersFile;

export async function readSubscribers() {
  try {
    const raw = await fs.readFile(subscribersFile, "utf8");
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

export async function writeSubscribers(subscribers: Subscriber[]) {
  try {
    await fs.mkdir(path.dirname(subscribersFile), { recursive: true });
    await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2), "utf8");
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? (error.code as string | undefined) : undefined;
    if (code === "EROFS" || code === "EPERM" || code === "EACCES") {
      throw new Error("Subscriber storage is not writable in this deployment. Set SUBSCRIBERS_FILE_PATH to a persistent writable path.");
    }
    throw error;
  }
}
