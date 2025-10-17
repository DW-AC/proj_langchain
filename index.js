import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("temp.csv");

async function loadCSVFromGoogleSheet(url, filePath) {
  try {
    const response = await axios.get(url);
    await fs.writeFile(filePath, response.data);
    const loader = new CSVLoader(filePath);
    const docs = await loader.load();
    console.log(docs);
    return docs;
  } catch (error) {
    console.error("Error loading CSV from Google Sheet:", error);
    return [];
  }
}

// A public Google Sheet for testing purposes.
const googleSheetUrl =
  "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv";
loadCSVFromGoogleSheet(googleSheetUrl, filePath);