import { DiaryEntry } from "../types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = ({ entry }: EntryProps) => {
  return (
    <>
      <h3>{entry.date}</h3>
      <div>Weather: {entry.weather}</div>
      <div>Visibility: {entry.visibility}</div>
      <div>Comment: {entry.comment}</div>
    </>
  );
};

export default Entry;
