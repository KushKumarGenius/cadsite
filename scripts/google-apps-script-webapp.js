/**
 * GOOGLE APPS SCRIPT — paste into Extensions → Apps Script on your Spreadsheet.
 *
 * CAD Crew Sheet:
 * https://docs.google.com/spreadsheets/d/1Eo93vK5mrF6LG0sqZmodvSGx3dqc7i8ZqAaLXQeuCmk/edit
 *
 * 1. In that Sheet (or your copy): add two tabs named exactly: Signups  and  Team
 *    Signups row 1 headers (optional): Timestamp | Student | Parent | Grade | Email | Prior CAD | Why
 *    Team row 1 headers (optional): Timestamp | Name | Message
 *
 * 2. File → Project settings → Script properties → Add row:
 *    WEBHOOK_SECRET = same value as GOOGLE_SHEETS_WEBHOOK_SECRET in your Next.js .env.local
 *
 * 3. Deploy → New deployment → Type: Web app
 *    Execute as: Me
 *    Who has access: Anyone (needed so your server can POST without Google login)
 *
 * 4. Copy the Web app URL into GOOGLE_SHEETS_WEB_APP_URL in .env.local
 *
 * 5. Redeploy the script after every code change (Manage deployments → Edit → Version → Deploy).
 */

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var expected = props.getProperty("WEBHOOK_SECRET");
    if (!expected) {
      return jsonOut(false, "Set WEBHOOK_SECRET in Script properties");
    }

    if (!e.postData || !e.postData.contents) {
      return jsonOut(false, "No POST body");
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (ignore) {
      return jsonOut(false, "Bad JSON");
    }

    if (data.webhookSecret !== expected) {
      return jsonOut(false, "Forbidden");
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return jsonOut(
        false,
        "Script is not bound to a Sheet. Open your CAD Crew spreadsheet → Extensions → Apps Script and paste this code there (container-bound project).",
      );
    }

    if (data.form === "signup") {
      var sh = ss.getSheetByName("Signups") || ss.insertSheet("Signups");
      sh.appendRow([
        new Date(),
        data.studentName || "",
        data.parentName || "",
        data.grade || "",
        data.email || "",
        data.priorCadKnowledge || "",
        data.why || "",
      ]);
      return jsonOut(true);
    }

    if (data.form === "team_contact") {
      var t = ss.getSheetByName("Team") || ss.insertSheet("Team");
      t.appendRow([new Date(), data.name || "", data.message || ""]);
      return jsonOut(true);
    }

    return jsonOut(false, "Unknown form type");
  } catch (ex) {
    return jsonOut(false, String(ex && ex.message ? ex.message : ex));
  }
}

function jsonOut(ok, err) {
  var body = ok ? { ok: true } : { ok: false, error: err || "error" };
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
