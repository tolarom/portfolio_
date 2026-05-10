import { NextResponse } from "next/server";
import fs from "fs/promises";

type Subscriber = {
  email: string;
  subscribedAt: string;
  message?: string;
};

export async function GET() {
  try {
    const file = `${process.cwd()}/data/subscribers.json`;

    let list: Subscriber[] = [];
    try {
      const raw = await fs.readFile(file, "utf8");
      list = JSON.parse(raw) as Subscriber[];
    } catch {
      list = [];
    }

    return NextResponse.json(
      {
        count: list.length,
        messages: list,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
