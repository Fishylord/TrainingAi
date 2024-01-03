import { config } from "dotenv"
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAMapReduceChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { DynamicTool } from "langchain/tools";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
config()

export const generateSummary = async (sessionMessages) => {
  const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      modelName: "gpt-3.5-turbo-1106",
  });
  console.log(sessionMessages);
  const prompt = `Create a summary of the chat messages, Highlight the user messages such as sales inquires etc. Provide names,Phone numbers and emails possible to contact them back.
  messages : ${sessionMessages}`
  console.log(prompt);
  const summary = await model.call(prompt);
  console.log(summary);
  return summary;
};
