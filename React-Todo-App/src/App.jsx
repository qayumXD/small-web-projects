// src/App.js
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (idToDelete) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));
  };

  const handleToggleComplete = (idToToggle) => {
    setTodos(
      todos.map(todo =>
        todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  return (
    // Enhanced page background and font
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 flex flex-col items-center py-8 sm:py-12 px-4 font-sans selection:bg-sky-300 selection:text-sky-900">
      {/* Main card container with improved shadow and width */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"></link>
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xl"> {/* Slightly wider card, more pronounced shadow */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-slate-700 mb-8">My Todo List</h1>

        {/* Input area with enhanced styling */}
        <div className="flex mb-6 shadow-sm rounded-lg">
          <input
            type="text"
            className="flex-grow p-3 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm sm:text-base placeholder-slate-400"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <button
            onClick={handleAddTodo}
            className="bg-sky-500 hover:bg-sky-600 text-white p-3 px-4 sm:px-6 rounded-r-lg transition-colors duration-150 ease-in-out text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
          >
            Add
          </button>
        </div>

        {/* Filter buttons with improved styling and transitions */}
        <div className="flex justify-center space-x-2 sm:space-x-3 mb-8">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1
                ${filter === filterType
                  ? 'bg-sky-600 text-white shadow-lg transform scale-105' // Enhanced active filter style
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:shadow-md' // Enhanced inactive filter style
                }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List with enhanced item styling */}
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              // Enhanced list item styling with hover effect
              className={`bg-slate-50 hover:bg-slate-100 p-3 rounded-lg shadow-sm flex items-center justify-between transition-all duration-150 ease-in-out group
                ${todo.completed ? 'opacity-70' : ''}`
              }
            >
              <div className="flex items-center flex-grow min-w-0"> {/* Added min-w-0 for better text truncation if needed */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  // Enhanced checkbox styling
                  className="h-5 w-5 text-sky-500 border-slate-300 rounded focus:ring-sky-400 focus:ring-offset-1 mr-3 sm:mr-4 cursor-pointer flex-shrink-0"
                />
                <span
                  // Enhanced text styling for completed items and hover effect
                  className={`flex-grow text-slate-700 cursor-pointer truncate ${todo.completed ? 'line-through text-slate-400' : ''}`}
                  onClick={() => handleToggleComplete(todo.id)}
                  title={todo.text} // Add title for full text on hover if truncated
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                // Enhanced delete button styling with group-hover visibility
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 sm:px-3 rounded-md text-xs sm:text-sm transition-all duration-150 ease-in-out ml-2 flex-shrink-0 opacity-70 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Conditional messages with consistent margin */}
        {filteredTodos.length === 0 && todos.length > 0 && (
          <p className="text-center text-slate-500 mt-8 text-sm">No tasks match the current filter.</p>
        )}
        {todos.length === 0 && (
          <p className="text-center text-slate-500 mt-8 text-sm">No tasks yet. Add some!</p>
        )}
      </div>
      <footer className="text-center mt-8 text-xs text-slate-500">
        <p>A Simple React Todo App</p>
      </footer>
    </div>
  );
}

export default App;
