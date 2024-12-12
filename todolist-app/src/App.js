import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div>
        <h1>todos</h1>
        <div className="todo-container">
          <div className="todo-input">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={addTodo}
              placeholder="What needs to be done?"
            />
          </div>
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <Item
                key={todo.id}
                todo={todo}
                toggleTodo={() => toggleTodo(todo.id)}
                deleteTodo={() => deleteTodo(todo.id)}
                updateTodo={updateTodo}
              />
            ))}
          </ul>
          <div className="footer">
            <span>
              {todos.filter((todo) => !todo.completed).length} items left
            </span>
            <ul className="filters">
              <li>
                <button
                  className={filter === "all" ? "selected" : ""}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={filter === "active" ? "selected" : ""}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  className={filter === "completed" ? "selected" : ""}
                  onClick={() => setFilter("completed")}
                  disabled={todos.filter((todo) => todo.completed).length === 0}
                >
                  Completed
                </button>
              </li>
            </ul>
            {todos.some((todo) => todo.completed) && (
              <button className="clear-completed" onClick={clearCompletedTodos}>
                Clear completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;