document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
  
    // Reset input field
    messageInput.value = '';
  
    // Send the message
    sendMessage('User', message);
  
    // For simplicity, let's say the AI responds with the same message
    const aiResponse = `AI: ${message}`;
  
    // Show AI response in chat
    setTimeout(() => {
      sendMessage('AI', aiResponse);
    }, 2000);
  });
  
  function sendMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    document.getElementById('chat-messages').appendChild(messageElement);
  }
  
