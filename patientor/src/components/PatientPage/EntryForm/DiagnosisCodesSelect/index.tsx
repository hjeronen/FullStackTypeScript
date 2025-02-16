import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { Diagnosis } from "../../../../types";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

interface DiagnosisCodesSelectProps {
  diagnosisCodesData: Diagnosis[];
  selected: string[];
  onChange: (codes: string[]) => void;
}

const DiagnosisCodesSelect = ({
  diagnosisCodesData,
  selected,
  onChange,
}: DiagnosisCodesSelectProps) => {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='diagnosis-codes-select'>Diagnosis codes</InputLabel>
        <Select
          labelId='diagnosis-codes-select'
          id='diagnosis-codes'
          multiple
          value={selected}
          onChange={handleChange}
          label='Diagnosis codes'
          renderValue={(selected) => (
            <Stack
              gap={1}
              direction='row'
              flexWrap='wrap'
              alignItems='flex-start'
            >
              {selected.map((code) => (
                <Chip
                  key={code}
                  label={code}
                  style={{ width: "auto", maxWidth: "100%" }}
                  onDelete={() =>
                    onChange(selected.filter((item) => item !== code))
                  }
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                />
              ))}
            </Stack>
          )}
          MenuProps={{
            PaperProps: { style: { maxHeight: "40vh", overflow: "auto" } },
          }}
        >
          {diagnosisCodesData?.map((diagnosis: Diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosisCodesSelect;
