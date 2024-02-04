import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3001/todos', { text: newTodo })
      .then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  return (
    <div className='container'>
      <h1>To Do List App</h1>
      <div className='input-container'>
        <label htmlFor="newTodo">Enter Task:</label>
        <input id="newTodo" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
