import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";
import ErrorNotification from "./ErrorNotification";
import React from "react";

interface NewEntryFormProps {
  addNewEntry: (newEntry: NewDiaryEntry) => Promise<boolean>;
  message: string;
}

const NewEntryForm = ({ addNewEntry, message }: NewEntryFormProps) => {
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
      <ErrorNotification message={message} />
      <div>
        <label>date</label>
        <input
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <label>visibility</label>
        {Object.values(Visibility).map((value) => (
          <React.Fragment key={value}>
            <input
              key={value}
              type='radio'
              name='visibility'
              value={value}
              checked={value === visibility}
              onChange={() => setVisibility(value)}
            />
            <label key={`${value}-label`}>{value}</label>
          </React.Fragment>
        ))}
      </div>
      <div>
        <label>weather</label>
        {Object.values(Weather).map((value) => (
          <React.Fragment key={value}>
            <input
              type='radio'
              name='weather'
              value={value}
              checked={value === weather}
              onChange={() => setWeather(value)}
            />
            <label>{value}</label>
          </React.Fragment>
        ))}
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
