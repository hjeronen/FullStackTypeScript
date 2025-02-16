import { forwardRef, useImperativeHandle, useState } from "react";
import type { Diagnosis, NewEntry } from "../../../types";
import type { EntryFormRef } from ".";
import DateInput from "./DateInput";
import TextInput from "./TextInput";
import DiagnosisCodesSelect from "./DiagnosisCodesSelect";
import HealthRatingRadioGroup from "./HealthRatingRadioGroup";

interface HealthCheckEntryFormProps {
  diagnosisCodesData: Diagnosis[];
}

const HealthcheckEntryForm = forwardRef<
  EntryFormRef,
  HealthCheckEntryFormProps
>(({ diagnosisCodesData }, ref) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRatingError, setHealthCheckRatingError] =
    useState<boolean>(false);

  const validate = () => {
    if (description && date && specialist && checkHealthCheckRating()) {
      return true;
    }
    return false;
  };

  const createNewEntry = (): NewEntry => {
    return {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: stringToNumber(healthCheckRating),
      diagnosisCodes: diagnosisCodes,
    };
  };

  const checkHealthCheckRating = (): boolean => {
    if (healthCheckRating === "") {
      setHealthCheckRatingError(true);
      return false;
    }
    return true;
  };

  const stringToNumber = (value: string): number => {
    if (!value || isNaN(Number(value)))
      throw new Error("Health rating is not a number.");
    return Number(value);
  };

  const resetFields = (): void => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
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
      <h3>New Health Check Entry</h3>
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
      <HealthRatingRadioGroup
        value={healthCheckRating}
        error={healthCheckRatingError}
        onChange={setHealthCheckRating}
        setError={setHealthCheckRatingError}
      />
      <DiagnosisCodesSelect
        diagnosisCodesData={diagnosisCodesData}
        value={diagnosisCodes}
        onChange={setDiagnosisCodes}
      />
    </div>
  );
});

export default HealthcheckEntryForm;
