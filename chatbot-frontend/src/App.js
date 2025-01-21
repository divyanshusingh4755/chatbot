import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [botReply, setBotReply] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const sendMessage = async () => {
    // Simple bot response logic
    const botResponse = `You said: ${userMessage}`;

    // Save to backend
    try {
      const response = await axios.post('http://localhost:5050/api/messages', {
        user_message: userMessage,
        bot_reply: botResponse,
      });

      // Update state with new messages
      setMessages([...messages, response.data]);
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  React.useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index}>
              <strong>You:</strong> {message.user_message}
              <br />
              <strong>Bot:</strong> {message.bot_reply}
              <hr />
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
