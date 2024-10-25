import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getDiaryEntries } from "./services/DiaryService";
import Entries from "./components/Entries";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getDiaryEntries().then((data) => setEntries(data));
  }, []);

  return (
    <>
      <h1>Ilari's flight diaries</h1>
      <Entries entries={entries} />
    </>
  );
};

export default App;
