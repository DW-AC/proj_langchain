import { Document } from "@langchain/core/documents";
import { BaseDocumentLoader } from "langchain/document_loaders/base";
import { google } from "googleapis";
import { authorize } from "./auth.js";

export class GoogleSheetsLoader extends BaseDocumentLoader {
  constructor({ spreadsheetId, range }) {
    super();
    this.spreadsheetId = spreadsheetId;
    this.range = range;
  }

  async load() {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: this.range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    const [header, ...data] = rows;
    const documents = data.map((row, index) => {
      const pageContent = header
        .map((col, i) => `${col}: ${row[i]}`)
        .join("\n");
      return new Document({
        pageContent,
        metadata: {
          source: this.spreadsheetId,
          line: index + 2, // +2 because of header and 0-based index
        },
      });
    });

    return documents;
  }
}