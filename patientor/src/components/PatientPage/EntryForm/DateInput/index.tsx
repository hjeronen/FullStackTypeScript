import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

interface DateInputProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const DateInput = ({ label, required, value, onChange }: DateInputProps) => {
  return (
    <div className='date-input'>
      <InputLabel
        style={{ paddingBottom: "10px" }}
        required={required ? true : false}
      >
        {label}
      </InputLabel>
      <Input
        type='date'
        name='date'
        required={required ? true : false}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
    </div>
  );
};

export default DateInput;
