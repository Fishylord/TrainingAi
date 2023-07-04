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
console.log(process.env.OPENAI_API_KEY);
const Input = ["What would be a good orange fruit?"];

try {
    const res = await model.generate(Input);


    console.log(res);
    console.log(JSON.stringify(res, null, 2));
    const Tokens = model.getNumTokens("bruh");
    console.log({ Tokens });
    // const inputTokens = .getNumTokens
    // const outputTokens = model.getNumTokens();
    // const totalTokens = inputTokens + outputTokens;

    // console.log(`Input tokens: ${inputTokens}`);
    // console.log(`Output tokens: ${outputTokens}`);
    // console.log(`Total tokens: ${totalTokens}`);
    // console.log(JSON.stringify(res, null, 2));
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