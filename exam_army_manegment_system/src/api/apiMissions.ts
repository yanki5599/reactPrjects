import axios from "axios";
import { Mission } from "../types/mission";

const BASE_URL = "https://reactexambackend.onrender.com/missions/";
const API_KEY = import.meta.env.VITE_API_KEY;
const URL_WITH_KEY = BASE_URL + API_KEY;

export const getMissions = async (): Promise<Mission[]> => {
  try {
    const response = await axios.get<Mission[]>(URL_WITH_KEY);
    if (response.status !== 200)
      throw new Error("status:" + response.status.toString());
    return response.data;
  } catch (err: any) {
    throw new Error("error fetching missions");
  }
};

export const createMissions = async (newMission: Mission): Promise<Mission> => {
  try {
    const response = await axios.post<Mission>(BASE_URL, newMission);
    if (response.status !== 200)
      throw new Error("status:" + response.status.toString());
    return response.data;
  } catch (err: any) {
    throw new Error("error creating mission");
  }
};

export const updateMissions = async (missionId: string): Promise<void> => {
  try {
    const response = await axios.post<{ message: string }>(
      `${URL_WITH_KEY}/progress/${missionId}`
    );
    if (response.status !== 200)
      throw new Error("status:" + response.status.toString());
    if (response.data.message != "progressed")
      throw new Error(response.data.message);
  } catch (err: any) {
    throw new Error("error updating missions" + err.message);
  }
};

export const deleteMissions = async (missionId: string): Promise<void> => {
  try {
    const response = await axios.post<Mission>(`${URL_WITH_KEY}/${missionId}`);

    if (response.status !== 200)
      throw new Error("status:" + response.status.toString());
  } catch (err: any) {
    throw new Error("error updating missions" + err.message);
  }
};
