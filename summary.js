import { config } from "dotenv"
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAMapReduceChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "langchain/prompts";
import * as fs from "fs";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, } from "langchain/prompts";
config()

export const run = async () => {
  // Initialize the LLM to use to answer the question.
  const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.0,
      modelName: "gpt-3.5-turbo-0613",
  }); 

  const content = fs.readFileSync("C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\word_data\\Context.txt", "binary");
  const text = content

  const generalManualSeparator = "#"; // Choose a specific character as a separator for the Q&A section

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 10000 });
  const generalManualChunks = await textSplitter.createDocuments([text]); 

  // Split the Q&A section into sections using the separator 
  const qaSection = text.split(generalManualSeparator);
  const qaChunks = await textSplitter.createDocuments(qaSection);
  
  const docs = [...generalManualChunks, ...qaChunks];


  //Embedding
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  //System Message
  const template = `
  {context}
  Question: {question}
  the template should include the chat_history what should have been.
  `;

 
  //User Message
  const humanTemplate = `a`;
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate); 

  
  //Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(20), {
    prompt: PromptTemplate.fromTemplate(template),
  }); 


  const res = await chain.call({
      query : humanTemplate
  });
  let jsonObjecct = JSON.parse(res.text);
  let cleanedOutput = JSON.stringify(jsonObjecct);
  console.log(cleanedOutput);
  
}; 


run();