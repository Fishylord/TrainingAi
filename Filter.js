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
      temperature: 0.2,
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
  You are to create "Json Filter Queries" From Questions created by Clients/Customers. 
  System Rules:
  1. Output must be a single continuous string without any newline (\n) or added spaces.
  2. The only response should be the desired output.
  3. Begin and end the output with curly brackets. Start with the dynamicfields filter followed by other filters. 
  4. When including dynamicfields (custom fields), they should be nested within the dynamicfields brackets. 
  5. Use the variable ID for dynamicfields, not their descriptive name or text. 
  6. If a dynamicfield is mentioned in the client's question and its dynamic ID is present in the context, include it in the output.
  7. For dynamicfields, use this format: "dynamicfields" :<"DynamicField ID":<"operator":X,"value":<"value":"ABC","type":"Type","min":"","max":"">>>. Replace ABC with the actual value being searched.
  8. if a Sample is provided you must use the sample Filter Structure provided.
  Operator Guide:
  1. Number and Text Type Filter Operators 0: Contain (use this for discount),1: Not Contain,2: Equal (Only takes 1 Number No minmax),3:Not Equal.
  2. Date Filter Operators 0: Within,1:Not Within,2:More and Equals Than,3: Less and Equals Than,4: More than, 5: Less Than.
  3. When using Equal and Not Equal Operators, The value variable should be used and Its main purpose are for specific numbers/values/text. and Min and Max should just be empty ("")
  4. Use Contain Operator 0,1 For when a range is asked by the user. As well a range such as between 25-30 25 should be placed inside Min: and 30 inside Max:.
  Sample Outputs:
  1. Output Examples: <"dynamicfields": <>,"assetcategory":<"operator":"0","value":123417>> (the < and > represent curly brackets)
  2. Date/Time Filter Sample: "activityenddate":<"operator":"0","value":<"type":"Date","min":"2023-08-09","max":"2023-08-17">>
  Output must be a single continuous string without any newline (\n) or added spaces.`;

 
  //User Message
  const humanTemplate = `SRE info with the text Sales that were given 10% or more discounts (Can't use Date Search operators) that has around 50$ to 100$ more in collections(contain operator) from activities created by John in a activity starting between August 1-4th`;
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