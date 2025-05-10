
import React, { useState } from 'react';

function App() {
  // State for the list of todos
  const [todos, setTodos] = useState([]);
  // State for the text in the input field
  const [inputValue, setInputValue] = useState('');
  // NEW: State for the current filter ('all', 'active', 'completed')
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  // Handles changes in the input field
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Adds a new todo item
  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Unique ID
        text: inputValue,
        completed: false // New todos are not completed by default
      };
      setTodos([...todos, newTodo]); // Add to the list
      setInputValue(''); // Clear input field
    }
  };

  // Allows adding a todo by pressing Enter
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  // Deletes a todo item by its id
  const handleDeleteTodo = (idToDelete) => {
    const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
    setTodos(updatedTodos);
  };

  // NEW: Toggles the 'completed' status of a todo item
  const handleToggleComplete = (idToToggle) => {
    const updatedTodos = todos.map(todo =>
      todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo
    );
    // Explanation for the line above:
    // 1. We .map() over the current 'todos' array to create a new array.
    // 2. For each 'todo':
    //    - If 'todo.id' matches 'idToToggle', we create a new object for this todo.
    //      - We use the spread operator '{ ...todo }' to copy all existing properties of the todo.
    //      - Then, we override the 'completed' property with its opposite value ('!todo.completed').
    //    - If 'todo.id' does not match, we return the 'todo' object unchanged.
    // 3. 'setTodos' updates the state with this new 'updatedTodos' array, triggering a re-render.
    setTodos(updatedTodos);
  };

  // NEW: Logic to filter todos based on the current 'filter' state
  const getFilteredTodos = () => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos; // For 'all'
  };

  // Get the todos to display based on the current filter
  const filteredTodos = getFilteredTodos();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg"> {/* Increased max-width slightly */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-6">My Todo List</h1>

        {/* Input area */}
        <div className="flex mb-6">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-sm md:text-base"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-md transition-colors text-sm md:text-base"
          >
            Add
          </button>
        </div>

        {/* NEW: Filter buttons */}
        <div className="flex justify-center space-x-2 mb-6">
          {/*
            We define an array of filter options and map over it to create buttons.
            This is a DRY (Don't Repeat Yourself) way to create similar buttons.
          */}
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)} // Set the filter state when a button is clicked
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all
                ${filter === filterType
                  ? 'bg-blue-600 text-white shadow-md' // Active filter button style
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700' // Inactive filter button style
                }`}
            >
              {/* Capitalize the first letter of the filter type for display */}
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <ul className="space-y-3"> {/* Increased space between items slightly */}
          {/* MODIFIED: Map over 'filteredTodos' instead of 'todos' */}
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`bg-gray-50 p-3 rounded-md shadow-sm flex items-center justify-between transition-all
                ${todo.completed ? 'opacity-60' : 'opacity-100'}` // Visual cue for completed items
              }
            >
              <div className="flex items-center flex-grow">
                {/* NEW: Checkbox for toggling complete status */}
                <input
                  type="checkbox"
                  checked={todo.completed} // Bind 'checked' status to 'todo.completed'
                  onChange={() => handleToggleComplete(todo.id)} // Call handler on change
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400 mr-3 cursor-pointer"
                />
                {/* MODIFIED: Apply line-through style if completed */}
                <span
                  className={`flex-grow text-gray-700 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                  onClick={() => handleToggleComplete(todo.id)} // Also allow toggling by clicking text
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 md:px-3 rounded-md text-xs md:text-sm transition-colors ml-2 flex-shrink-0" // Added ml-2 and flex-shrink-0
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Message if no todos match the current filter */}
        {filteredTodos.length === 0 && todos.length > 0 && (
          <p className="text-center text-gray-500 mt-6">No tasks match the current filter.</p>
        )}
        {/* Message if there are no todos at all */}
        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No tasks yet. Add some!</p>
        )}
      </div>
    </div>
  );
}

export default App;
