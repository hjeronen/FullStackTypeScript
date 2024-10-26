import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createNewEntry = async (newEntry: NewDiaryEntry) => {
  console.log("posting new entry");
  console.log(newEntry);
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry);
  console.log(response);
  return response.data;
};
