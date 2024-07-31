import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import path from "path";
config();
  

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-4o-mini-2024-07-18",
}); // Model Parameters
const inputText = "What is the difference between public and digital forms"
const directory = path.resolve("vectorStore.json"); //Temporary Vector handling.
const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings()); //Semantic search algorithm
const context = await vectorStore.similaritySearch(inputText,12); //Uses the top X blocks
const top = (await vectorStore.similaritySearch(inputText, 1))[0].pageContent;
console.log(top);
