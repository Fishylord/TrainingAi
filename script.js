import { config } from "dotenv"
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
config()

// import { Configuration, OpenAIApi } from "openai"

// const openai = new OpenAIApi(new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// }))                                                       //stores API-Key referred when running prompt for Auth.


const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo-0613",
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const chain = new LLMChain({ llm: model, prompt: prompt });

try {
    const res = await chain.call({ product: "colorful socks" });
    console.log(res);
    console.log(JSON.stringify(res, null, 2));
} catch (error) {
    console.error("Error:", error);
}


// const Input_1 = res; //Prompt

// openai.createChatCompletion({
//     model: "gpt-3.5-turbo-16k-0613",
//     messages: [{ role:"user", content: Input_1}]
// }).then(res => {
//     console.log(res.data.choices[0].message.content)
//     console.log(res.data.choices)
//     console.log(res.data.usage)
// })