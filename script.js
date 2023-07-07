import { config } from "dotenv"
import { PromptLayerChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createConnection } from "mysql2/promise";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import * as fs from "fs";
import { OpenAI } from "langchain/llms/openai";
import { JsonSpec } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { JsonToolkit, createJsonAgent } from "langchain/agents";

config()


const run = async () => {
    // Load the JSON data
    let data;
    try {
        const jsonFile = fs.readFileSync("SampleData.JSON", "utf8");
        data = JSON.parse(jsonFile);
        if (!data) {
          throw new Error("Failed to load OpenAPI spec");
        }
      } catch (e) {
        console.error(e);
        return;
    }
    const jsonSpec = new JsonSpec(data);
    

    //Model Loader
    const chat = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.9,
        modelName: "gpt-3.5-turbo-0613",
    }); 

    const input = `You are a Data analyst. Analyse the data and tel me about the data.
    1. Do not focus on data variables but assume  that the user already knows
    2. Aim to extract details like the days to duedate what jobs are close to the due dates etc.
    3. If a user ask something like "what is todays jobs closest to duedates to focus on" summarise the data and give the top 3-5 closest job due dates and its projects and which customer it belongs to.`;
    const tools = [
        new toolkit({
            name: "toolkit",
            description: "A toolkit for working with JSON data",
            data: new JsonToolkit(jsonSpec),
        })
    ];
    const executorWithOptions = await initializeAgentExecutorWithOptions(
        chat,
        {
            agentType: "zero-shot-react-description",
        }
    );

    const result = await executorWithOptions.call({ input,toolkit });


    
    console.log(`Got output ${result.output}`);


    //Prompt creation
    // const prompt = PromptTemplate.fromTemplate(
    //     "What insights can you provide about the data? You are a Data Analysis working as a assistant providing insights for your bosses and collogues for the daily workflow. Provide Information like deadline, issues and updates on data if possible depending on the prompt. please Tell me which projects have jobs within 10days of their deadline and have a high project value {{data}}"
    // );
    // console.log(prompt);

    //Chain Craetion
    // const chain = new LLMChain({ llm: chat, prompt });

    //Processing to openAI
    // const response = await chain.call({ data: loader });

    // console.log(response);
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