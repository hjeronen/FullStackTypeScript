import { TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { NewEntry } from "../../../types";
import { parseDiagnosisCodes } from "./utils";
import type { EntryFormRef } from ".";

interface HealthCheckEntryFormProps {}

const HealthcheckEntryForm = forwardRef<
  EntryFormRef,
  HealthCheckEntryFormProps
>((_props, ref) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const createNewEntry = (): NewEntry => {
    return {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: stringToNumber(healthCheckRating) as any, // TODO: input checking and type assertion
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    };
  };

  const stringToNumber = (value: string): number | undefined => {
    if (!value || isNaN(Number(value))) return undefined;
    return Number(value);
  };

  const resetFields = (): void => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
  };

  useImperativeHandle(ref, () => {
    return {
      createNewEntry,
      resetFields,
    };
  });

  return (
    <div>
      <h3>New HealthCheck entry</h3>
      <TextField
        label='Description'
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label='Date'
        fullWidth
        required
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label='Specialist'
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label='Healthcheck rating'
        fullWidth
        required
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(target.value)}
      />
      <TextField
        label='Diagnosis codes'
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
    </div>
  );
});

export default HealthcheckEntryForm;
