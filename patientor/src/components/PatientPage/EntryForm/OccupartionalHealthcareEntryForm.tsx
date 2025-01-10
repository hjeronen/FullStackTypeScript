import TextField from "@mui/material/TextField";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { NewEntry, SickLeave } from "../../../types";
import { parseDiagnosisCodes } from "./utils";
import type { EntryFormRef } from ".";

interface OccupationalHealthcareEntryFormProps {}

const OccupationalHealthcareEntryForm = forwardRef<
  EntryFormRef,
  OccupationalHealthcareEntryFormProps
>((_props, ref) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const createNewEntry = (): NewEntry => {
    return {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: parseSickLeave(),
      diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    };
  };

  const parseSickLeave = (): SickLeave | undefined => {
    if (sickLeaveStartDate && sickLeaveEndDate)
      return { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate };
    return undefined;
  };

  const resetFields = (): void => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
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
      <h3>New Occupational Healthcare Entry</h3>
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
        label='Employer name'
        fullWidth
        required
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        label='Sick leave start date'
        fullWidth
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
      />
      <TextField
        label='Sick leave end date'
        fullWidth
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
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

export default OccupationalHealthcareEntryForm;
