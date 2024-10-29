import React from "react";
import { Todo as Todo } from "../../../types/types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  todoList: Todo[];
  changeStateFunc: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, changeStateFunc }) => {
  return (
    <div>
      {todoList.map((td) => (
        <TodoItem
          key={td.id}
          todo={td.todo}
          done={td.done}
          changeStateFunc={() => changeStateFunc(td.id)}
        />
      ))}
    </div>
  );
};

export default TodoList;
