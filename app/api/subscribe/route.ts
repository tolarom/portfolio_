import { NextResponse } from "next/server";
import fs from "fs/promises";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const dir = `${process.cwd()}/data`;
    const file = `${dir}/subscribers.json`;

    await fs.mkdir(dir, { recursive: true });

    type Subscriber = { email: string; subscribedAt: string; message?: string };
    let list: Subscriber[] = [];
    try {
      const raw = await fs.readFile(file, "utf8");
      list = JSON.parse(raw) as Subscriber[];
    } catch {
      list = [];
    }

    list.push({ email, subscribedAt: new Date().toISOString(), message: typeof message === 'string' ? message : undefined });

    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
