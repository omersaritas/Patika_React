import React, { useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTodo(todo.id, editText);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
      />
      {isEditing ? (
        <input
          className="edit"
          value={editText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur();
            }
          }}
          autoFocus
        />
      ) : (
        <label className="todo-text" onDoubleClick={handleEdit}>
          {todo.text}
        </label>
      )}
      <button className="destroy" onClick={deleteTodo}>
        X
      </button>
    </li>
  );
}

export default TodoItem;