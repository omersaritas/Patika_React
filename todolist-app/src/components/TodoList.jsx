import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ quest, toggleTodo, deleteTodo }) {
  return (
    <ul className="todo-list">
      {quest.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          toggleTodo={() => toggleTodo(index)}
          deleteTodo={() => deleteTodo(index)}
        />
      ))}
    </ul>
  );
}

export default TodoList;