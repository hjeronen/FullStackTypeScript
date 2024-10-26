import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { createNewEntry, getDiaryEntries } from "./services/DiaryService";
import Entries from "./components/Entries";
import NewEntryForm from "./components/NewEntryForm";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getDiaryEntries().then((data) => setEntries(data));
  }, []);

  const addNewEntry = async (newEntry: NewDiaryEntry): Promise<boolean> => {
    try {
      const createdEntry = await createNewEntry(newEntry);
      setEntries(entries.concat(createdEntry));
      if (errorMessage) setErrorMessage("");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
      } else {
        setErrorMessage("Something went wrong");
      }
      return false;
    }
  };

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <NewEntryForm addNewEntry={addNewEntry} message={errorMessage} />
      <Entries entries={entries} />
    </>
  );
};

export default App;
