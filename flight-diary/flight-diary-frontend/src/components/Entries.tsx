import { DiaryEntry } from "../types";
import Entry from "./Entry";

interface EntriesProps {
  entries: DiaryEntry[];
}

const Entries = ({ entries }: EntriesProps) => {
  return (
    <>
      {entries &&
        entries.map((entry) => (
          <div key={entry.id}>
            <Entry entry={entry} />
          </div>
        ))}
    </>
  );
};

export default Entries;
