import { useEffect, useState } from "react";
import { Todo } from "../../types/types";
import TodoList from "./TodoList/TodoList";

const LOCAL_STORAGE_KEY: string = "todos";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const todosFromLocal = readFromLocalStorage<Todo[]>(LOCAL_STORAGE_KEY);
    if (todosFromLocal) setTodos(todosFromLocal);
  }, []);

  function addTodo(): void {
    setTodos((prev) => [
      ...prev,
      { done: false, id: generateUniqueId(), todo: inputValue },
    ]);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function updateState(id: string) {
    const todosCpy = [...todos];
    const idx = todosCpy.findIndex((td) => td.id === id);
    todosCpy[idx].done = !todosCpy[idx].done;
    setTodos(todosCpy);
  }

  function generateUniqueId() {
    let id = Math.random().toString(16).slice(2);
    while (todos.find((td) => td.id === id))
      id = Math.random().toString(16).slice(2);

    return id;
  }

  return (
    <div>
      <p>add todo</p>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        value={inputValue}
      />
      <button onClick={addTodo}>Add</button>
      <TodoList todoList={todos} changeStateFunc={updateState} />
    </div>
  );
};

export default TodoApp;

function readFromLocalStorage<T>(key: string): undefined | T {
  const item: string | null = localStorage.getItem(key);
  if (!item) return undefined;
  const object: T = JSON.parse(item);
  return object;
}
