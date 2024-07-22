import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatMessageHistory } from "langchain/memory";
import { config } from "dotenv";
import { createInterface } from "readline";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import * as fs from "fs";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { StringOutputParser } from "@langchain/core/output_parsers";
config();

const readlineInterface = createInterface({
  input: process.stdin,
  output: process.stdout
});

const getUserInput = (query) => {
  return new Promise(resolve => readlineInterface.question(query, resolve));
};

const runChatModel = async () => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    modelName: "gpt-4o-mini-2024-07-18",
  }); // Model Parameters

  const directory = "C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\vectorStore.json"; // Temporary Vector handling.
  const vectorStore = await MemoryVectorStore.fromDocuments(directory, new OpenAIEmbeddings()); // Semantic search algorithm
  const retriever = vectorStore.asRetriever(15); // Uses the top X blocks

  let questionNumber = 0;
  const pastMessages = [];

  const contextualizeQSystemPrompt = `Given a chat history and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.`;
  
  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const contextualizeQChain = contextualizeQPrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const qaSystemPrompt = `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.`;

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", qaSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const contextualizedQuestion = (input) => {
    if ("chat_history" in input) {
      return contextualizeQChain;
    }
    return input.question;
  };

  const ragChain = RunnableSequence.from([
    RunnablePassthrough.assign({
      context: async (input) => {
        if ("chat_history" in input) {
          const chain = contextualizedQuestion(input);
          return chain.pipe(retriever).pipe(formatDocumentsAsString);
        }
        return "";
      },
    }),
    qaPrompt,
    model,
  ]);

  const runChainWithHistory = async (question) => {
    questionNumber++;
    const inputText = question;
    pastMessages.push(new HumanMessage(inputText));

    const memory = new ChatMessageHistory(pastMessages);

    const result = await ragChain.invoke({ question: inputText, chat_history: memory });
    pastMessages.push(new AIMessage(result));

    // Save observations to a text file
    const observations = result.intermediateSteps.map(step => step.observation).join("\n\n");
    fs.writeFileSync("C:\\Users\\User\\Documents\\Coding\\Art\\TrainingAi\\Results.txt", observations, { flag: "a" });

    console.log(result);
    return result;
  };

  const inputText = await getUserInput("Enter your question: ");
  const output = await runChainWithHistory(inputText);
  console.log("Chat Model Output:", output);

  readlineInterface.close();
};

runChatModel().then(output => {
  console.log("Chat Model Output:", output);
}).catch(error => {
  console.error("Error running chat model:", error);
  readlineInterface.close();
});
