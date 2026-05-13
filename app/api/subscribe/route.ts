import { NextResponse } from "next/server";
import { ensureSubscribersHeader, writeSubscribers } from "../_lib/subscribers";

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await ensureSubscribersHeader();
    await writeSubscribers([
      {
        email,
        subscribedAt: new Date().toISOString(),
        message: typeof message === "string" ? message : undefined,
      },
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
