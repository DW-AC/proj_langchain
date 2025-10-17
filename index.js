import { GoogleSheetsLoader } from "./google_sheets_loader.js";

async function main() {
  try {
    const loader = new GoogleSheetsLoader({
      spreadsheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
      range: "A1:F", // Adjust the range as needed
    });

    const docs = await loader.load();
    console.log(docs);
  } catch (error) {
    console.error(
      "Error: Could not load documents from Google Sheets.",
      "Please ensure you have a valid `credentials.json` file and that the Google Sheets API is enabled for your project.",
      error.message
    );
  }
}

main();