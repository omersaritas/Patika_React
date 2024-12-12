import React from "react";

function TodoFooter({ quest, setFilter, filter }) {
    const activeCount = quest.filter((todo) => !todo.completed).length;
    const completedCount = quest.filter((todo) => todo.completed).length;

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> {activeCount === 1 ? "item" : "items"}{" "}
                left
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
                        onClick={() => completedCount > 0 && setFilter("completed")}
                        disabled={completedCount === 0}
                    >
                        Completed
                    </button>
                </li>
            </ul>
        </footer>
    );
}

export default TodoFooter;