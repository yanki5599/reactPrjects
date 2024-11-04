import axios from "axios";
import { Todo } from "../../types/TodoModel";
import ApiService from "../ApiService";

const BASE_URL = "https://672871dc270bd0b9755576e8.mockapi.io/api/v1/todo";
export default class TodosApiService {
  static async getAll() {
    try {
      const response = await axios.get<Todo[]>(BASE_URL);
      if (response.status != 200) throw new Error();

      return response.data;
    } catch (err: any) {
      throw new Error("error fetching todos");
    }
  }

  static async create(todo: Todo) {
    try {
      const response = await axios.post<Todo>(BASE_URL, todo);
      if (response.status != 201) throw new Error();
      return response.data;
    } catch (err: any) {
      throw new Error("error creating todo" + err.message);
    }
  }

  static async update(todo: Todo) {
    try {
      const response = await axios.put<Todo>(`${BASE_URL}/${todo.id}`, todo);
      if (response.status != 200) throw new Error();
      return response.data;
    } catch (err: any) {
      throw new Error("error updating todo");
    }
  }

  static async delete(todoId: string) {
    try {
      console.log("deleting");

      const response = await axios.delete<Todo>(`${BASE_URL}/${todoId}`);
      if (response.status != 200) throw new Error();
      console.log("success", response);

      return response.data;
    } catch (err: any) {
      throw new Error("error deleting todo");
    }
  }
}
