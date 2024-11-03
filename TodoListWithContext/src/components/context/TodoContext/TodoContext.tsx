import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../../../types/TodoModel";
import { readFromLocalStorage } from "../../../utils";

interface ContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  toggleComplete: (todoId: string) => void;
}

const TodosContext = createContext<ContextProps>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

interface TodosProviderProps {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY: string = "todos";

const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo): void => {
    setTodos((prev) => [...prev, { ...todo, id: generateUniqueId() }]);
  };

  const deleteTodo = (todoId: string) => {
    const filtered = todos.filter((todo) => todo.id !== todoId);
    setTodos(filtered);
  };

  const toggleComplete = (todoId: string) => {
    const todosCpy = [...todos];
    const idx = todosCpy.findIndex((td) => td.id === todoId);
    todosCpy[idx].done = !todosCpy[idx].done;
    setTodos(todosCpy);
  };

  function generateUniqueId() {
    let id = Math.random().toString(16).slice(2);
    while (todos.find((td) => td.id === id))
      id = Math.random().toString(16).slice(2);

    return id;
  }

  useEffect(() => {
    const todosFromLocal = readFromLocalStorage<Todo[]>(LOCAL_STORAGE_KEY);
    if (todosFromLocal) setTodos(todosFromLocal);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, deleteTodo, toggleComplete }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useGlobalTodos = () => {
  return useContext(TodosContext);
};

export { TodosProvider };
