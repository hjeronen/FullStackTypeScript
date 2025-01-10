import TextField from "@mui/material/TextField";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { NewEntry } from "../../../types";
import { parseDiagnosisCodes } from "./utils";
import type { EntryFormRef } from ".";

interface HospitalEntryFormProps {}

const HospitalEntryForm = forwardRef<EntryFormRef, HospitalEntryFormProps>(
  (_props, ref) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

    const createNewEntry = (): NewEntry => {
      return {
        type: "Hospital",
        description,
        date,
        specialist,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
      };
    };

    const resetFields = (): void => {
      setDescription("");
      setDate("");
      setSpecialist("");
      setDischargeDate("");
      setDischargeCriteria("");
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
        <h3>New Hospital Entry</h3>
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
          label='Discharge date'
          fullWidth
          required
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label='Discharge criteria'
          fullWidth
          required
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <TextField
          label='Diagnosis codes'
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
      </div>
    );
  }
);

export default HospitalEntryForm;
