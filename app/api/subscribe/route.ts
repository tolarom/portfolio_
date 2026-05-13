import { NextResponse } from "next/server";
import { readSubscribers, writeSubscribers } from "../_lib/subscribers";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const list = await readSubscribers();

    list.push({ email, subscribedAt: new Date().toISOString(), message: typeof message === "string" ? message : undefined });

    await writeSubscribers(list);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
