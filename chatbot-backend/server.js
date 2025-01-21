const express = require('express');
const bodyParser = require('body-parser');
const { Message } = require('./model/model');
const cors = require('cors');

const app = express();
const port = 5050;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to save message and reply
app.post('/api/messages', async (req, res) => {
  const { user_message, bot_reply } = req.body;

  try {
    const newMessage = await Message.create({ user_message, bot_reply });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// Endpoint to retrieve all messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
