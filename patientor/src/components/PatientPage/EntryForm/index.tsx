import { Button, Grid } from "@mui/material";
import { NewEntry } from "../../../types";
import HealthcheckEntryForm from "./HealthcheckEntryForm";
import { MutableRefObject, SyntheticEvent, useRef } from "react";

interface EntryFormProps {
  onSubmit: (entry: NewEntry) => Promise<boolean>;
}

export interface EntryFormRef extends MutableRefObject<unknown> {
  createNewEntry: () => NewEntry;
  resetFields: () => void;
}

const EntryForm = ({ onSubmit }: EntryFormProps) => {
  const entryFormRef: MutableRefObject<EntryFormRef | undefined> =
    useRef<EntryFormRef>();

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

  return (
    <div className='entry-form'>
      <form onSubmit={addEntry}>
        <HealthcheckEntryForm ref={entryFormRef} />
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
