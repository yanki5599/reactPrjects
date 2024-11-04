import axios, { AxiosResponse } from "axios";

interface Item {
  id?: string;
}

export default class ApiService<T extends Item> {
  #name: string;
  constructor(name: string, baseUrl: string) {
    this.#name = name;
    axios.defaults.baseURL = baseUrl;
    axios.defaults.headers.post["Content-Type"] = "application/json";
  }

  async getAll(): Promise<T[]> {
    return await asyncRequest(
      () => axios.get<T>("/"),
      `error fetching  ${this.#name}s`
    );
  }

  async create(item: T) {
    return await asyncRequest(
      () => axios.post<T>("/", item),
      `error adding new ${this.#name}`
    );
  }

  async delete(itemId: string) {
    return await asyncRequest(
      () => axios.delete(`/${itemId}`),
      `error deleting ${this.#name}`
    );
  }

  async update(item: T) {
    return await asyncRequest(
      () => axios.put(`/${item.id}`),
      `error deleting ${this.#name}`
    );
  }
}

async function asyncRequest<T>(
  func: () => Promise<AxiosResponse<any, any>>,
  errMsg: string
) {
  try {
    const response = await func();
    if (response.status != 200) throw new Error();
    return response.data;
  } catch (err: any) {
    throw new Error(errMsg);
  }
}
