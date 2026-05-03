import { NextResponse } from "next/server";
import { postToGoogleSheetWebApp } from "@/lib/googleSheetWebhook";

type Body = {
  name?: string;
  message?: string;
  webhookSecret?: string;
};

export async function POST(req: Request) {
  let raw: Body;
  try {
    raw = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { webhookSecret: _ws, ...fields } = raw;
  void _ws;
  const { name, message } = fields;
  const nameTrim = (name ?? "").trim();
  const messageTrim = (message ?? "").trim();

  if (!nameTrim || !messageTrim) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const result = await postToGoogleSheetWebApp({
    form: "team_contact",
    name: nameTrim,
    message: messageTrim,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
