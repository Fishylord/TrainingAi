import express from 'express';
import { run } from './textAI3.js'; // Adjust the path if needed

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let lastMessageProcessed = null;

app.post('/api/message', async (req, res) => {
  console.log('Received data:', req.body);
 
  // Call the function from textAI3.js with the received data
  try {
    const aiResponse = await run(req.body.body);  // Assuming 'body' key contains the message
    
    // Check if aiResponse has a 'text' property and assign it to lastMessageProcessed
    if (aiResponse && aiResponse.text) {
      lastMessageProcessed = aiResponse.text;
      console.log(aiResponse.text);
      res.send({ status: aiResponse.text });
    } else {
      res.status(500).send({ status: 'Error: AI response does not contain a text property' });
    }

  } catch (err) {
    console.error("Error processing the message:", err);
    res.status(500).send({ status: 'Error processing the message' });
  }
});

app.get('/api/lastResponse', (req, res) => {
    if (lastMessageProcessed) {
        res.send({lastMessageProcessed});
    } else {
        res.send({ error: "No message processed yet." });
    }
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});