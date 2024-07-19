import { config } from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
config();

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  modelName: "gpt-3.5-turbo-0613",
});

// Read the content of the text file
const content = fs.readFileSync("C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\combined.txt", "utf-8");

const generalManualSeparator = "~"; // Specific character as a separator for sections

// Create a text splitter for chunks of 2000 characters
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });

// Split the entire document into 2000-character chunks
const generalManualChunks = await textSplitter.createDocuments([content]);

// Split the document by the manual separator
const qaSection = content.split(generalManualSeparator);
// Further split each section into 2000-character chunks
const qaChunks = await textSplitter.createDocuments(qaSection);

// Combine all chunks into a single array
const docs = [...generalManualChunks, ...qaChunks];

// Create and save the vector store
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
const directory = "C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\vectorStore.json";
await vectorStore.save(directory);

console.log("Vector store saved successfully.");
