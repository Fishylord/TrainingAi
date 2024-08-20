import { runChatModel, loadRule, getRule, getSession, deleteSession, getHistoryCount, setHistoryCount } from './generator.js';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { spawn } from 'child_process';
import { generateSummary } from './summary.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Add this line to handle CORS

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    cb(null, 'Test.docx');
  },
});
const ruleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/')
  },
  filename: (req, file, cb) => {
    cb(null, 'rules.txt')
  }
});

const upload = multer({ storage });
const uploadRule = multer({ storage: ruleStorage });

let sessionData = {};
const MAX_MESSAGES = 3;
const TIMEOUT_MS = 30 * 60 * 1000;

app.get('/', (req, res) => { // Add this route handler
    res.send('Server is up and running');
});

app.post('/api/message', async (req, res) => {
  const sessionId = req.body.sessionId; 
  const inputText = req.body.text;
  const configId = req.body.config;

  if (!sessionData[sessionId]) {
    sessionData[sessionId] = { messages: [], timestamp: Date.now(), messageCount: 0 };
  }
  
  const session = sessionData[sessionId];
  const currentTime = Date.now();

  session.timestamp = currentTime; 
  session.messages += `Question: ${inputText}\n`;
  session.messageCount++;
 
  try {
    const responseText = await runChatModel(sessionId, inputText, configId);
    res.send({ sessionId: sessionId, text: responseText });
  } catch (error) {
    res.status(500).send({ error: 'Network Error' });
  }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const child = spawn('node', ['ZIndex.js']);

  child.on('close', (code) => {
    if (code === 0) {
      console.log('Child process completed successfully');
      res.send('File uploaded successfully');
    } else {
      console.error('Child process failed with code:', code);
      res.status(500).send('Error uploading file');
    }
  })
});

app.post('/api/rules', uploadRule.single('file'), async (req, res) => {
  console.log(req.file);

  let rules = await loadRule();

  res.send(rules);
});

app.get('/api/rules', async (req, res) => {
  res.send(await getRule());
});

app.get('/api/history', async (req, res) => {
  res.send({ history: getHistoryCount() });
});

app.post('/api/history', async (req, res) => {
  let count = req.body.history;
  res.send({ history: setHistoryCount(count) });
});

app.get('/api/session', async (req, res) => {
  const sessionId = req.query.sessionId;
  const session = getSession(sessionId);
  res.send({ session });
});

app.delete('/api/session', async (req, res) => {
  const sessionId = req.body.sessionId ?? '';
  deleteSession(sessionId);
  res.send('Session deleted');
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
}

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
