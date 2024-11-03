import React from "react";
import "./TodoItem.css";
import { useGlobalTodos } from "../context/TodoContext/TodoContext";
import { Todo } from "../../types/TodoModel";
interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleComplete: changeStateFunc, deleteTodo } = useGlobalTodos();
  return (
    <li className="TodoItem">
      <p>
        {" "}
        <span className="DoneMark" onClick={() => changeStateFunc(todo.id!)}>
          {todo.done ? "✅" : "❌"}
        </span>
        - {todo.todo}
      </p>
      <button onClick={() => deleteTodo(todo.id!)}>Delete</button>
    </li>
  );
};

export default TodoItem;
