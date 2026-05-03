import { NextResponse } from "next/server";

type Body = {
  studentName?: string;
  parentName?: string;
  grade?: string;
  email?: string;
  priorCadKnowledge?: string;
  why?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const base = process.env.DJANGO_SIGNUP_URL?.replace(/\/$/, "");
  const key = process.env.DJANGO_SIGNUP_INGEST_KEY;

  if (!base || !key) {
    console.error("DJANGO_SIGNUP_URL or DJANGO_SIGNUP_INGEST_KEY is not configured.");
    return NextResponse.json(
      { ok: false, error: "Sign-ups are not configured on the server." },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${base}/api/signups/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Ingest-Key": key,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("Django signup ingest unreachable:", e);
    return NextResponse.json(
      { ok: false, error: "Could not reach sign-up server. Try again later." },
      { status: 502 },
    );
  }

  const text = await upstream.text();
  let json: unknown = null;
  try {
    json = JSON.parse(text) as unknown;
  } catch {
    json = null;
  }

  if (!upstream.ok) {
    const msg =
      typeof json === "object" && json !== null && "error" in json
        ? String((json as { error?: string }).error)
        : upstream.statusText;
    return NextResponse.json({ ok: false, error: msg }, { status: upstream.status });
  }

  return NextResponse.json(
    typeof json === "object" && json !== null ? json : { ok: true },
    { status: 200 },
  );
}
