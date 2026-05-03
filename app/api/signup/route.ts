import { NextResponse } from "next/server";
import { postToGoogleSheetWebApp } from "@/lib/googleSheetWebhook";

type Body = {
  studentName?: string;
  parentName?: string;
  grade?: string;
  email?: string;
  priorCadKnowledge?: string;
  why?: string;
  webhookSecret?: string;
};

export async function POST(req: Request) {
  let raw: Body;
  try {
    raw = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Never trust a client-sent secret
  const { webhookSecret: _ws, ...fields } = raw;
  void _ws;
  const { studentName, parentName, grade, email, priorCadKnowledge, why } = fields;

  const studentNameTrim = (studentName ?? "").trim();
  const parentNameTrim = (parentName ?? "").trim();
  const gradeTrim = (grade ?? "").trim();
  const emailTrim = (email ?? "").trim();
  const whyTrim = (why ?? "").trim();

  if (!studentNameTrim || !parentNameTrim || !gradeTrim || !emailTrim || !whyTrim) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const result = await postToGoogleSheetWebApp({
    form: "signup",
    studentName: studentNameTrim,
    parentName: parentNameTrim,
    grade: gradeTrim,
    email: emailTrim,
    priorCadKnowledge: (priorCadKnowledge ?? "").trim(),
    why: whyTrim,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
