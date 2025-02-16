import { forwardRef, useImperativeHandle, useState } from "react";
import type { Diagnosis, NewEntry } from "../../../types";
import type { EntryFormRef } from ".";
import DateInput from "./DateInput";
import TextInput from "./TextInput";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";

interface HospitalEntryFormProps {
  diagnosisCodesData: Diagnosis[];
}

const HospitalEntryForm = forwardRef<EntryFormRef, HospitalEntryFormProps>(
  ({ diagnosisCodesData }, ref) => {
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [dischargeDate, setDischargeDate] = useState<string>("");
    const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const validate = () => {
      if (
        description &&
        date &&
        specialist &&
        dischargeDate &&
        dischargeCriteria
      ) {
        return true;
      }
      return false;
    };

    const createNewEntry = (): NewEntry => {
      return {
        type: "Hospital",
        description,
        date,
        specialist,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
        diagnosisCodes: diagnosisCodes,
      };
    };

    const resetFields = (): void => {
      setDescription("");
      setDate("");
      setSpecialist("");
      setDischargeDate("");
      setDischargeCriteria("");
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
        <h3>New Hospital Entry</h3>
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
        <DateInput
          label='Discharge date'
          required
          value={dischargeDate}
          onChange={setDischargeDate}
        />
        <TextInput
          label='Discharge criteria'
          required
          value={dischargeCriteria}
          onChange={setDischargeCriteria}
        />
        <DiagnosisCodesSelect
          diagnosisCodesData={diagnosisCodesData}
          value={diagnosisCodes}
          onChange={setDiagnosisCodes}
        />
      </div>
    );
  }
);

export default HospitalEntryForm;
