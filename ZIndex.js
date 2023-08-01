import { config } from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
config();

// Specify the OpenAI model
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.5,
  modelName: "gpt-3.5-turbo-0613",
}); 


const content = fs.readFileSync("C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\word_data\\Test.docx", "binary");
const zip = new PizZip(content);
const doc = new Docxtemplater(zip);
doc.render();
const text = doc.getFullText();

const generalManualSeparator = "#"; // Choose a specific character as a separator for the Q&A section

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });
const generalManualChunks = await textSplitter.createDocuments([text]);

// Split the Q&A section into sections using the separator
const qaSection = text.split(generalManualSeparator);
const qaChunks = await textSplitter.createDocuments(qaSection);

const docs = [...generalManualChunks, ...qaChunks];


//Embedding
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

const directory = "C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\vectorStore.json";
await vectorStore.save(directory);