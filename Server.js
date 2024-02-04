const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('node-persist');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

// Initialize and clear storage on application start
(async () => {
  await storage.init();
  await storage.clear();
  console.log('Storage initialized and cleared successfully');
})();

app.get('/todos', async (req, res) => {
  const todos = await storage.getItem('todos') || [];
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const todos = (await storage.getItem('todos')) || [];
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  await storage.setItem('todos', todos);
  res.json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
