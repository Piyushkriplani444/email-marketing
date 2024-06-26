import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GENERATIVE_API_KEY;
const googleAi = new GoogleGenerativeAI(apiKey);

function addFormatting(input) {
  let strippedText = input.replace(/^\s*[\*\-]\s*/gm, "");
  strippedText = strippedText.replace(/\*\*(.*?)\*\*/g, "$1");

  strippedText = strippedText.replace(/\*/g, "");

  return strippedText.trim();
}

export async function createData(prompt) {
  const model = googleAi.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  let finaltext = await addFormatting(text);
  return finaltext;
}
