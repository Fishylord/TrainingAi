import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { runChatModel } from './generator.js'; // Assuming runChatModel is the correct function

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
const port = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Make sure the path is correct
});

app.post('/sendMessage', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Received message:', userMessage); // Log incoming message
        const response = await runChatModel(userMessage);
        console.log('Sending response:', response); // Log outgoing response
        res.json({ reply: response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});