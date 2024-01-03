import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { runChatModel } from './generator.js'; 
import { generateSummary } from './summary.js';
import fs from 'fs'; 

const app = express();
app.use(bodyParser.json());
app.use(cors());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let sessionData = {};
const MAX_MESSAGES = 3;
const TIMEOUT_MS = 30 * 60 * 1000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

app.post('/sendMessage', async (req, res) => {
    const userMessage = req.body.message;
    console.log('Received message:', userMessage);

    const sessionId = 'someUniqueSessionId'; 
    if (!sessionData[sessionId]) {
        sessionData[sessionId] = { messages: [], timestamp: Date.now() };
    }

    const session = sessionData[sessionId];
    const currentTime = Date.now();

    if (currentTime - session.timestamp > TIMEOUT_MS || session.messages.length >= MAX_MESSAGES) {
        await handleSessionEnd(sessionId);
        return res.status(400).send({ error: "Session limit reached." });
    }

    session.timestamp = currentTime;
    session.messages.push({ input: userMessage});

    try {
        const responseText = await runChatModel(userMessage);
        console.log('Sending response:', responseText);
        session.messages[session.messages.length - 1].response = responseText;
        res.json({ reply: responseText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'Network Error' });
    }});

async function handleSessionEnd(sessionId) {
    const session = sessionData[sessionId];
    if (session && session.messages.length > 0) {
        const summary = await generateSummary(session.messages); 
        fs.writeFile(`session_summary_${sessionId}.txt`, summary, err => {
            if (err) {
                console.error('Error writing summary to file:', err);
            } else {
                console.log(`Summary for session ${sessionId} saved.`);
            }
        });
    }
}

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
