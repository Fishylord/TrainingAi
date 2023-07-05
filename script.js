import { config } from "dotenv"
import { PromptLayerChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createConnection } from "mysql2/promise";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import * as fs from "fs";
import { JsonSpec } from "langchain/tools";
config()


const run = async () => {
    // Load the JSON data
    let Jdata;
    try {
        const jsonData = await fs.promises.readFile("SampleData.JSON", "utf8");
        Jdata = JSON.parse(jsonData);
      } catch (e) {
        console.error(e);
        return;
      }

    const chat = new PromptLayerChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.9,
        modelName: "gpt-3.5-turbo-0613",
    });
    
    const template = `What insights can you provide about the data? 
    You are a "Data Analysis" working as a assistant providing insights for your bosses and collogues for the daily workflow.
    Provide Information like deadline, issues and updates on data if possible depending on the prompt. 
    {{data}} 
    `;
    const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["data"],
    });

    
    console.log(Jdata);
    // console.log(formattedPrompt);
    const chain = new LLMChain({ llm: chat, prompt: prompt });
    console.log(chain)
    const response = await chain.call({ data: "say 123 if you see this" });

    console.log(response);
    // const respA = await chat.generate([
    //     [
    //     new SystemChatMessage(
    //         prompt
    //     ),
    //     ],
    // ]);

    // console.log(respA);
    // console.log(JSON.stringify(respA, null, 3));
};

run();