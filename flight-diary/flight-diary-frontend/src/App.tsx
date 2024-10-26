import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { createNewEntry, getDiaryEntries } from "./services/DiaryService";
import Entries from "./components/Entries";
import NewEntryForm from "./components/NewEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then((data) => setEntries(data));
  }, []);

  const addNewEntry = async (newEntry: NewDiaryEntry): Promise<boolean> => {
    try {
      const createdEntry = await createNewEntry(newEntry);
      setEntries(entries.concat(createdEntry));
      return true;
    } catch (error: unknown) {
      return false;
    }
  };

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <NewEntryForm addNewEntry={addNewEntry} />
      <Entries entries={entries} />
    </>
  );
};

export default App;
