import * as fs from "fs";
import * as yaml from "js-yaml";
import { OpenAI } from "langchain/llms/openai";
import { JsonSpec } from "langchain/tools";
import { JsonToolkit, createJsonAgent } from "langchain/agents";
import { SystemChatMessage } from "langchain/schema";
import { config } from "dotenv"
import { PromptTemplate } from "langchain/prompts";
import { PromptLayerChatOpenAI } from "langchain/chat_models/openai";
config()

const run = async () => {
  // Load the JSON data
  let data;
  try {
    const jsonData = await fs.promises.readFile("SampleData.JSON", "utf8");
    data = JSON.parse(jsonData);
  } catch (e) {
    console.error(e);
    return;
  }

  // Create the JSON toolkit
  const toolkit = new JsonToolkit(new JsonSpec(data));

  // Initialize the OpenAI model
  const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo-0613",
   });

  // Create the agent executor
  const executor = createJsonAgent(model, toolkit);

  // Define the input for the agent
  const input = `What insights can you provide about the data? 
  You are a "Data Analysis" working as a assistant providing insights for your bosses and collogues for the daily workflow.
  Provide Information like deadline, issues and updates on data if possible depending on the prompt.
  `;

  // Call the agent to perform data analysis
  const result = await executor.call({input});

  console.log(`Got output ${result.output}`);
  console.log(
    `Got intermediate steps ${JSON.stringify(
      result,
      null,
      2
    )}`
  );
};

// Run the agent
run();