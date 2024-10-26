import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface NewEntryFormProps {
  addNewEntry: (newEntry: NewDiaryEntry) => Promise<boolean>;
}

const NewEntryForm = ({ addNewEntry }: NewEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility)
      .map((v) => v.toString())
      .includes(param);
  };

  const isWeather = (param: string): param is Weather => {
    return Object.values(Weather)
      .map((v) => v.toString())
      .includes(param);
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      visibility &&
      isVisibility(visibility) &&
      weather &&
      isWeather(weather)
    ) {
      const result = await addNewEntry({ date, visibility, weather, comment });
      if (result) {
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      }
    } else {
      console.log("Invalid visibility or weather value");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Add new entry</h2>
      <div>
        <label>date</label>
        <input value={date} onChange={(event) => setDate(event.target.value)} />
      </div>
      <div>
        <label>visibility</label>
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
      </div>
      <div>
        <label>weather</label>
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
      </div>
      <div>
        <label>comment</label>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

export default NewEntryForm;
