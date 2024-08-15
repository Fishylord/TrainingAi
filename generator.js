import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createInterface } from "readline";
import { OpenAIAgentTokenBufferMemory } from "langchain/agents/toolkits";

//Imports for History
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/memory";

//Local Imports
import path from "path";
import fs from "fs";
config();

const SESSIONS = {};
let RULES;
let HISTORY_CONFIG;

config()
const loadConfiguration = async (configId) => {
    try {
        const configData = await fs.promises.readFile('Configuration.json', 'utf8');
        const configurations = JSON.parse(configData);
        const selectedConfig = configurations.find(config => config.id === configId);
        
        if (!selectedConfig) {
            throw new Error(`Configuration with ID ${configId} not found`);
        }
        
        return selectedConfig;
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
};

export const runChatModel = async (sessionId, inputText, configId) => {
    const config = await loadConfiguration(configId);
    RULES = config.rules;
    const vectorStorePath = config.directoryPath;
    const template = `System Rules: {Rules}
    
    {context}
    
    Question: {question}

    History: {memory}
    
    Helpful Answer:`;
    const customRagPrompt = PromptTemplate.fromTemplate(template);
    
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: "gpt-4o-mini-2024-07-18",
    }); // Model Parameters
    
    const vectorStore = await HNSWLib.load(vectorStorePath, new OpenAIEmbeddings()); //Semantic search algorithm
    const context = await vectorStore.similaritySearch(inputText,12); //Uses the top X blocks
    const top = (await vectorStore.similaritySearch(inputText, 1))[0].pageContent
    
    if (!SESSIONS[sessionId]) {
        SESSIONS[sessionId] = {
            messages: [],
            count: 0
        };
    }
    let session = SESSIONS[sessionId];
    session.count++;
    let history_count = getHistoryCount();
    if (session.messages.length > history_count) {
        let cnt = session.messages.length - history_count;
        session.messages.splice(0, cnt);
    }
    let memory;
    memory = session.messages
    
    const ragChain = await createStuffDocumentsChain({
      llm,
      prompt: customRagPrompt,
      outputParser: new StringOutputParser(),
    });

    const result = await ragChain.invoke({
        Rules : await getRule(),
        question: inputText,
        context,
        memory,
    });
    session.messages.push(`Human message: ${inputText} \n Ai message: ${result} \n Top Semantic Seach Context ${top}`);
    console.log(memory);
    return result;
};

export async function getRule() {
    return RULES ?? await loadRule();
}

export async function loadRule() {
    // open storage/rules.txt and save into RULES
    RULES = fs.readFileSync(path.resolve("storage/rules.txt"), "utf8");
    return RULES;
}

export function deleteSession(sessionId) {
    delete SESSIONS[sessionId];
}

export function getSession(sessionId) {
    return SESSIONS[sessionId] ?? null;
}

export function getHistoryCount() {
    // make sure HISTORY_CONFIG is an integer
    if (!HISTORY_CONFIG || HISTORY_CONFIG < 0) {
        HISTORY_CONFIG = 10;
    }
    return HISTORY_CONFIG;
}

export function setHistoryCount(count) {
    return HISTORY_CONFIG = parseInt(count) ?? 10;
}
