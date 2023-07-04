import { config } from "dotenv"
import { PromptLayerChatOpenAI } from "langchain/chat_models/openai";
import { SystemChatMessage } from "langchain/schema";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createConnection } from "mysql2/promise";
config()

const chat = new PromptLayerChatOpenAI({
    returnPromptLayerId: true,
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    modelName: "gpt-3.5-turbo-0613",
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

console.log(prompt);
const respA = await chat.generate([
    [
    new SystemChatMessage(
        `{
            "Customers": [
              {"CustomerID": 1, "CustomerName": "John Doe"},
              {"CustomerID": 2, "CustomerName": "Jane Smith"},
              {"CustomerID": 3, "CustomerName": "Bill Evans"},
              {"CustomerID": 4, "CustomerName": "Mia Wong"},
              {"CustomerID": 5, "CustomerName": "Olivia Johnson"},
              {"CustomerID": 6, "CustomerName": "James Brown"}
            ],
            "Projects": [
              {"ProjectID": 1, "ProjectName": "Website Development", "CustomerID": 1, "ProjectValue": 25000.00},
              {"ProjectID": 2, "ProjectName": "Mobile App Design", "CustomerID": 1, "ProjectValue": 30000.00},
              {"ProjectID": 3, "ProjectName": "Network Upgrade", "CustomerID": 2, "ProjectValue": 40000.00},
              {"ProjectID": 4, "ProjectName": "Database Migration", "CustomerID": 2, "ProjectValue": 45000.00},
              {"ProjectID": 5, "ProjectName": "Server Maintenance", "CustomerID": 3, "ProjectValue": 15000.00},
              {"ProjectID": 6, "ProjectName": "Product Design", "CustomerID": 4, "ProjectValue": 35000.00},
              {"ProjectID": 7, "ProjectName": "Marketing Campaign", "CustomerID": 5, "ProjectValue": 20000.00},
              {"ProjectID": 8, "ProjectName": "Sales Strategy", "CustomerID": 6, "ProjectValue": 40000.00}
            ],
            "Jobs": [
              {"JobID": 1, "JobName": "Web Design", "ProjectID": 1, "DaysLeftToDueDate": 10},
              {"JobID": 2, "JobName": "Web Coding", "ProjectID": 1, "DaysLeftToDueDate": 20},
              {"JobID": 3, "JobName": "Web Testing", "ProjectID": 1, "DaysLeftToDueDate": 30},
              {"JobID": 4, "JobName": "App Design", "ProjectID": 2, "DaysLeftToDueDate": 15},
              {"JobID": 5, "JobName": "App Coding", "ProjectID": 2, "DaysLeftToDueDate": 25},
              {"JobID": 6, "JobName": "App Testing", "ProjectID": 2, "DaysLeftToDueDate": 35},
              {"JobID": 7, "JobName": "Network Analysis", "ProjectID": 3, "DaysLeftToDueDate": 5},
              {"JobID": 8, "JobName": "Hardware Selection", "ProjectID": 3, "DaysLeftToDueDate": 10},
              {"JobID": 9, "JobName": "Network Setup", "ProjectID": 3, "DaysLeftToDueDate": 20},
              {"JobID": 10, "JobName": "Migration Plan", "ProjectID": 4, "DaysLeftToDueDate": 15},
              {"JobID": 11, "JobName": "Data Transfer", "ProjectID": 4, "DaysLeftToDueDate": 25},
              {"JobID": 12, "JobName": "Testing and Debug", "ProjectID": 4, "DaysLeftToDueDate": 30},
              {"JobID": 13, "JobName": "Server Check", "ProjectID": 5, "DaysLeftToDueDate": 7},
              {"JobID": 14, "JobName": "Software Update", "ProjectID": 5, "DaysLeftToDueDate": 14},
              {"JobID": 15, "JobName": "Hardware Check", "ProjectID": 5, "DaysLeftToDueDate": 21},
              {"JobID": 16, "JobName": "Design Sketch", "ProjectID": 6, "DaysLeftToDueDate": 10},
              {"JobID": 17, "JobName": "3D Modeling", "ProjectID": 6, "DaysLeftToDueDate": 20},
              {"JobID": 18, "JobName": "Final Touches", "ProjectID": 6, "DaysLeftToDueDate": 30},
              {"JobID": 19, "JobName": "Campaign Plan", "ProjectID": 7, "DaysLeftToDueDate": 12},
              {"JobID": 20, "JobName": "Content Creation", "ProjectID": 7, "DaysLeftToDueDate": 22}
            ]
          }
          
          Analyize the data, sort the data by jobs 10days away from due date. sort the data closest to due date and project by a recommended ratio provide who is the customer for that project as well.
          Display the project value as well, A project with a high value should appear infront of a project with low value but closer deadline. Use a ratio for this. like deadline-Project Value priority ratio.
          Do not give me any code or tell me to do this myself, You are a Analysis Bot. The days to deadline multiplier in the calculation should increase exponentially the closer it gets to duedate. Provide the ratios as well.`
    ),
    ],
]);

console.log(respA);
console.log(JSON.stringify(respA, null, 3));