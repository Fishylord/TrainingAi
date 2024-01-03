import { runChatModel } from './generator.js';
import express from 'express';
import { generateSummary } from './summary.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let sessionData = {};
const MAX_MESSAGES = 3; //Current Max messages (Might be handled in SC's side (Ends session etc))
const TIMEOUT_MS = 30 * 60 * 1000; //Time out After 30minutes it will just send (Timeout message Line 31)

app.post('/api/message', async (req, res) => {
  const sessionId = req.body.sessionId; 
  const inputText = req.body.text;

  if (!sessionData[sessionId]) {
    sessionData[sessionId] = { messages: [], timestamp: Date.now(), messageCount: 0 };
  } //create format data for the sessionid if not provided.


  const session = sessionData[sessionId];
  const currentTime = Date.now();


  // 10message or 30minutes causing session to end.
  if (currentTime - session.timestamp > TIMEOUT_MS || session.messageCount >= MAX_MESSAGES) {
    const summary = await handleSessionEnd(sessionId);
    return res.status(200).send({ sessionId: sessionId, summary: summary });
  } //Timeout might be handled on SC's side? If so remove.


  session.timestamp = currentTime; 
  session.messages += `Question: ${inputText}\n`;
  session.messageCount++;

  try {
    const responseText = await runChatModel(inputText);
    res.send({ sessionId: sessionId, text: responseText });
  } catch (error) {
    res.status(500).send({ error: 'Network Error' });
  } //Change error return if needed for generation failure. this sents it to the generator.js to create the file.
});

async function handleSessionEnd(sessionId) {
  const session = sessionData[sessionId];
  if (session && session.messages.length > 0) {
    try {
      const summary = await generateSummary(session.messages);
      return summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      return 'Error generating summary';
    }
  } else {
    return 'No conversation data available to summarize';
  }
} // This handless the session ending and creates a summary (replace error if needed)

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
