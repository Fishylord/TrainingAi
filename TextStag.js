import { runChatModel, deleteSession, getSession, setHistoryCount } from './testAI.js';
import readline from 'readline';

// Create a readline interface to read input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize a new session
const sessionId = 'unique_session_id'; // Replace with a unique session ID for each session
let historyCount = 10; // Default history count

// Function to start a chat session
const startChatSession = async () => {
  console.log('Chat session started. Type your message below:');
  rl.prompt();

  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
    } else if (input.toLowerCase().startsWith('set history ')) {
      const count = parseInt(input.split(' ')[2], 10);
      setHistoryCount(count);
      historyCount = count;
      console.log(`History count set to ${historyCount}`);
    } else if (input.toLowerCase() === 'delete session') {
      deleteSession(sessionId);
      console.log('Session deleted');
    } else if (input.toLowerCase() === 'show session') {
      const session = getSession(sessionId);
      console.log('Current session:', session);
    } else {
      try {
        const response = await runChatModel(sessionId, input);
        console.log('AI:', response);
      } catch (error) {
        console.error('Error running chat model:', error);
      }
    }
    rl.prompt();
  }).on('close', () => {
    console.log('Chat session ended.');
    process.exit(0);
  });
};

// Start the chat session
startChatSession();
