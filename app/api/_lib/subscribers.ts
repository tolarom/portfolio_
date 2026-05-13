import { google } from "googleapis";

export type Subscriber = {
  email: string;
  subscribedAt: string;
  message?: string;
};

function getSheetsConfig() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.trim();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "Subscribers";

  if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets config. Set GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, and GOOGLE_SHEETS_SPREADSHEET_ID.",
    );
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return { clientEmail, privateKey, spreadsheetId, sheetName };
}

function getSheetsClient() {
  const { clientEmail, privateKey, spreadsheetId, sheetName } = getSheetsConfig();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, spreadsheetId, sheetName };
}

export async function readSubscribers() {
  const { sheets, spreadsheetId, sheetName } = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:C`,
  });

  const rows = response.data.values ?? [];

  return rows
    .filter((row) => row[0] && row[0] !== "email")
    .map((row) => ({
      email: row[0] ?? "",
      subscribedAt: row[1] ?? "",
      message: row[2] || undefined,
    }));
}

export async function writeSubscribers(subscribers: Subscriber[]) {
  const latest = subscribers.at(-1);
  if (!latest) return;

  const { sheets, spreadsheetId, sheetName } = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:C`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[latest.email, latest.subscribedAt, latest.message ?? ""]],
    },
  });
}

export async function ensureSubscribersHeader() {
  const { sheets, spreadsheetId, sheetName } = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:C1`,
  });

  const firstRow = response.data.values?.[0];
  if (firstRow?.[0] === "email" && firstRow?.[1] === "subscribedAt" && firstRow?.[2] === "message") {
    return;
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A1:C1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [["email", "subscribedAt", "message"]],
    },
  });
}
