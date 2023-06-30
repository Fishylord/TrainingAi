import { config } from "dotenv"
config()

import { Configuration, OpenAIApi } from "openai"

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

const Input_1 = `


`;

openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k-0613",
    messages: [{ role:"user", content: Input_1}]
}).then(res => {
    console.log(res.data.choices[0].message.content)
    console.log(res.data.choices)
    console.log(res.data.usage)
})