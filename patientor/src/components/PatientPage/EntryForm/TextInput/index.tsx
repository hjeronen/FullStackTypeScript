import TextField from "@mui/material/TextField";

interface TextInputProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({ label, required, value, onChange }: TextInputProps) => (
  <div
    style={{
      marginTop: "5px",
      marginBottom: "5px",
    }}
  >
    <TextField
      label={label}
      required={required ? true : false}
      fullWidth
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  </div>
);

export default TextInput;
