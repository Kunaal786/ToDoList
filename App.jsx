import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (id) => {
    const newText = prompt('Edit task:');
    if (newText) {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Completed') return t.completed;
    if (filter === 'Pending') return !t.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>
      {filteredTasks.map(task => (
        <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
          <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
          <div>
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
