import { forwardRef, useImperativeHandle, useState } from "react";
import type { Diagnosis, NewEntry, SickLeave } from "../../../types";
import type { EntryFormRef } from ".";
import DateInput from "./DateInput";
import FormLabel from "@mui/material/FormLabel";
import TextInput from "./TextInput";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";

interface OccupationalHealthcareEntryFormProps {
  diagnosisCodesData: Diagnosis[];
}

const OccupationalHealthcareEntryForm = forwardRef<
  EntryFormRef,
  OccupationalHealthcareEntryFormProps
>(({ diagnosisCodesData }, ref) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const validate = () => {
    if (description && date && specialist && employerName) {
      return true;
    }
    return false;
  };

  const createNewEntry = (): NewEntry => {
    return {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName,
      sickLeave: parseSickLeave(),
      diagnosisCodes: diagnosisCodes,
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
    setDiagnosisCodes([]);
  };

  useImperativeHandle(ref, () => {
    return {
      validate,
      createNewEntry,
      resetFields,
    };
  });

  return (
    <div className='form-body'>
      <h3>New Occupational Healthcare Entry</h3>
      <TextInput
        label='Description'
        required
        value={description}
        onChange={setDescription}
      />
      <DateInput label='Date' required value={date} onChange={setDate} />
      <TextInput
        label='Specialist'
        required
        value={specialist}
        onChange={setSpecialist}
      />
      <TextInput
        label='Employer name'
        required
        value={employerName}
        onChange={setEmployerName}
      />
      <FormLabel style={{ margin: "10px" }}>Sick leave</FormLabel>
      <DateInput
        label='Start date'
        value={sickLeaveStartDate}
        onChange={setSickLeaveStartDate}
      />
      <DateInput
        label='End date'
        value={sickLeaveEndDate}
        onChange={setSickLeaveEndDate}
      />
      <DiagnosisCodesSelect
        diagnosisCodesData={diagnosisCodesData}
        value={diagnosisCodes}
        onChange={setDiagnosisCodes}
      />
    </div>
  );
});

export default OccupationalHealthcareEntryForm;
