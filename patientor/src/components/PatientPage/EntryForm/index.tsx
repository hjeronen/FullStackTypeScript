import { Button, ButtonGroup, Grid } from "@mui/material";
import type { EntryType, NewEntry } from "../../../types";
import HealthcheckEntryForm from "./HealthcheckEntryForm";
import { RefObject, SyntheticEvent, useRef, useState } from "react";
import { assertNever } from "../../common/utils";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupartionalHealthcareEntryForm";

interface EntryFormProps {
  onSubmit: (entry: NewEntry) => Promise<boolean>;
}

export interface EntryFormRef {
  createNewEntry: () => NewEntry;
  resetFields: () => void;
}

const EntryForm = ({ onSubmit }: EntryFormProps) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const entryFormRef: RefObject<EntryFormRef> = useRef<EntryFormRef>(null);

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryFormRef?.current) {
      const result = await onSubmit(entryFormRef?.current?.createNewEntry());
      if (result) entryFormRef.current.resetFields();
    }
  };

  const onCancel = () => {
    if (entryFormRef?.current) {
      entryFormRef.current.resetFields();
    }
  };

  const getEntryForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return <HealthcheckEntryForm ref={entryFormRef} />;
      case "Hospital":
        return <HospitalEntryForm ref={entryFormRef} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryForm ref={entryFormRef} />;
      default:
        assertNever(entryType);
    }
  };

  const getButtonStyle = (value: string): "contained" | "outlined" => {
    if (value === entryType) return "contained";
    return "outlined";
  };

  return (
    <div className='entry-form'>
      <form onSubmit={addEntry}>
        <ButtonGroup aria-label='Basic button group'>
          <Button
            variant={getButtonStyle("HealthCheck")}
            onClick={() => setEntryType("HealthCheck")}
          >
            Health check
          </Button>
          <Button
            variant={getButtonStyle("Hospital")}
            onClick={() => setEntryType("Hospital")}
          >
            Hospital
          </Button>
          <Button
            variant={getButtonStyle("OccupationalHealthcare")}
            onClick={() => setEntryType("OccupationalHealthcare")}
          >
            Occupational Healthcare
          </Button>
        </ButtonGroup>
        {getEntryForm()}
        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: "left" }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
