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

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000 });
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
  You are to create "Json Filter Queries" From Questions created by Clients/Customers. 
  System Rules:
  1. Output should not need \n or spaced out using + just one string
  2. Do not Answer With any text Other than The Output Expected. 
  3. Start and End with Curly Brackets, 1st Filter will be "dynamicfields" then continued by other filters.
  4. DynamicFields such as custom fields will be inside the Dynamic fields brackets.
  Normal Search Operators 0: Contain,1: Not Contain,2: Equal,3:Not Equal.
  Date Search Operators 0: Within,1:Not Within,2:More and Equals Than,3: Less and Equals Than,4: More than, 5: Less Than.
  Output Examples: <"dynamicfields": <>,"assetcategory":<"operator":"0","value":123417>> (the < and > represent curly brackets)(Only "Var)
  Date/Time Filter Sample: "activityenddate":<o"operator":"0","value":<"type":"Date","min":"2023-08-09","max":"2023-08-17">>
  Contain/Non Contain Operator: "dealseqno":<"operator":"0","value":<"type":"Number","min":0,"max":"100">>`;

 
  //User Message
  const humanTemplate = "what is the UAC page?";
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);


  //Create a chain that uses the OpenAI LLM and HNSWLib vector store.
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(5), {
    prompt: PromptTemplate.fromTemplate(template),
  }); 
  

  const res = await chain.call({
      query : `product phones that were given more than 10% discounts that has around 50-100$ more in collections from activities created by John in a activity between August 1-4th` 
  });
  console.log(res);

};

run();