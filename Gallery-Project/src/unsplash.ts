import axios from "axios";
import { Image } from "./types/types";

const API_KEY: string = "TIU9cPjmHB6CwMWwkdlgrCj5l4EOgnsDwve1vqOEpeo";
const BASE_URL: string = "https://api.unsplash.com/photos";

export const fetchImages = async (
  page: number = 1,
  perPage = 3
): Promise<Image[]> => {
  try {
    const response = await axios.get<Image[]>(BASE_URL, {
      params: { client_id: API_KEY, per_page: perPage, page: page },
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Error! cannot fetch images" + error.message);
  }
};
