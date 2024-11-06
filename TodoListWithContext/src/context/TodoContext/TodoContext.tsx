import { createContext, useContext, useEffect, useState } from "react";
import { Todo } from "../../types/TodoModel";
import { readFromLocalStorage } from "../../utils";
import TodosApiService from "../../api/todosApiService/todosApiService";
import ApiService from "../../api/ApiService";

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
    // setTodos((prev) => [...prev, { ...todo, id: generateUniqueId() }]);
    TodosApiService.create(todo)
      .then(async () => await fetchTodosFromApi())
      .catch((err) => console.error(err.message));
  };

  const deleteTodo = (todoId: string) => {
    const filtered = todos.filter((todo) => todo.id !== todoId);
    setTodos(filtered);

    TodosApiService.delete(todoId)
      .then(async () => {
        await fetchTodosFromApi();
      })
      .catch((err) => console.error(err.message));
  };

  const toggleComplete = (todoId: string) => {
    const todosCpy = [...todos];
    const idx = todosCpy.findIndex((td) => td.id === todoId);
    todosCpy[idx].completed = !todosCpy[idx].completed;

    TodosApiService.update(todosCpy[idx])
      .then(() => setTodos(todosCpy))
      .catch((err) => console.error(err));
  };

  function generateUniqueId() {
    let id = Math.random().toString(16).slice(2);
    while (todos.find((td) => td.id === id))
      id = Math.random().toString(16).slice(2);

    return id;
  }

  useEffect(() => {
    fetchTodosFromLocal();
    fetchTodosFromApi();
  }, []);

  function fetchTodosFromLocal() {
    const todosFromLocal = readFromLocalStorage<Todo[]>(LOCAL_STORAGE_KEY);
    if (todosFromLocal) setTodos(todosFromLocal);
  }

  async function fetchTodosFromApi() {
    try {
      const todosFromApi: Todo[] = await TodosApiService.getAll();
      setTodos(todosFromApi);
    } catch (err: any) {
      console.error(err.message);
    }
  }

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

export const GlobalTodos = () => {
  return useContext(TodosContext);
};

export { TodosProvider };
