import { config } from "dotenv"
import { PromptLayerChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createConnection } from "mysql2/promise";
import { JSONLoader } from "langchain/document_loaders/fs/json";
config()

const chat = new PromptLayerChatOpenAI({
    returnPromptLayerId: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo-0613",
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const loader = new JSONLoader("src/document_loaders/example_data/SampleData.json");
console.log(prompt);
const respA = await chat.generate([
    [
    new SystemChatMessage(
      
    ),
    ],
]);

console.log(respA);
console.log(JSON.stringify(respA, null, 3));