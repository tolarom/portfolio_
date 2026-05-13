import { NextResponse } from "next/server";
import { readSubscribers } from "../../_lib/subscribers";

export async function GET() {
  try {
    const list = await readSubscribers();

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
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
