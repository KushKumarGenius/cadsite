/**
 * Forwards JSON to a Google Apps Script web app that appends rows to your Sheet.
 * Set GOOGLE_SHEETS_WEB_APP_URL and GOOGLE_SHEETS_WEBHOOK_SECRET in .env.local (server only).
 * See scripts/google-apps-script-webapp.js for the Sheet-side code.
 */

/** Makes Apps Script errors actionable without exposing internals to logs */
function humanizeSheetScriptError(raw: string | undefined): string {
  if (raw === "Forbidden") {
    return (
      "Could not verify the form (secret mismatch). If you run the site: in Vercel → Environment Variables, " +
      "set GOOGLE_SHEETS_WEBHOOK_SECRET to the exact same value as WEBHOOK_SECRET in Apps Script " +
      "(Project settings → Script properties). Redeploy after changing env vars."
    );
  }
  return raw ?? "Something went wrong.";
}

function sheetEnvError(): string | null {
  const url = process.env.GOOGLE_SHEETS_WEB_APP_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  const missing: string[] = [];
  if (!url) missing.push("GOOGLE_SHEETS_WEB_APP_URL");
  if (!secret) missing.push("GOOGLE_SHEETS_WEBHOOK_SECRET");
  if (missing.length === 0) return null;
  return (
    `Missing env: ${missing.join(", ")}. ` +
    "Use a file named `.env.local` in the project root (same folder as `package.json`), " +
    "exact names above, no quotes needed on the URL. Restart `npm run dev` after saving. " +
    "(Deploy sites: set the same vars in the host’s Environment Variables.)"
  );
}

export async function postToGoogleSheetWebApp(payload: Record<string, unknown>) {
  const envErr = sheetEnvError();
  if (envErr) {
    return { ok: false as const, error: envErr, status: 503 };
  }

  const url = process.env.GOOGLE_SHEETS_WEB_APP_URL!.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET!.trim();

  const body = JSON.stringify({
    ...payload,
    webhookSecret: secret,
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      return {
        ok: false as const,
        error: parsed?.error
          ? humanizeSheetScriptError(parsed.error)
          : (res.statusText ?? "Sheet webhook failed"),
        status: res.status,
      };
    }

    // Apps Script often returns HTTP 200 with an HTML login/interstitial if the URL is wrong.
    // Never treat non-JSON or missing ok:true as success (fixes “saved” but empty Sheet).
    if (!parsed || parsed.ok !== true) {
      const preview = text.replace(/\s+/g, " ").slice(0, 180);
      console.error("[Google Sheet webhook] Unexpected response:", res.status, preview);
      return {
        ok: false as const,
        error:
          parsed?.ok === false && parsed.error
            ? humanizeSheetScriptError(parsed.error)
            : `The sheet script did not return success JSON. Use the Web app deployment URL (ends with /exec), not the editor URL. Response preview: ${preview}`,
        status: 502,
      };
    }

    return { ok: true as const };
  } catch (e) {
    console.error("Google Sheet webhook error:", e);
    return {
      ok: false as const,
      error: "Could not reach Google Sheets. Try again later.",
      status: 502,
    };
  }
}
