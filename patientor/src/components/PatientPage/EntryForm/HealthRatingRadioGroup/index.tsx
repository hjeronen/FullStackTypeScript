import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

interface HealthRatingRadioGroupProps {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
  setError: (value: boolean) => void;
}

const HealthRatingRadioGroup = ({
  value,
  error,
  onChange,
  setError,
}: HealthRatingRadioGroupProps) => {
  const handleChange = (selected: string) => {
    onChange(selected);
    if (error) setError(false);
  };

  return (
    <div style={{ margin: "10px", padding: "5px" }}>
      <FormControl id='health-rating' required error={error}>
        <FormLabel id='health-rating-radio-group-label'>
          Health rating
        </FormLabel>
        <RadioGroup
          id='health-rating'
          aria-labelledby='health-rating-radio-group-label'
          name='health-rating-radio-group'
          value={value}
          onChange={({ target }) => handleChange(target.value)}
        >
          <FormControlLabel
            value='0'
            control={<Radio id='health-rating' />}
            label='Healthy'
          />
          <FormControlLabel
            value='1'
            control={<Radio id='health-rating' />}
            label='Low risk'
          />
          <FormControlLabel
            value='2'
            control={<Radio id='health-rating' />}
            label='High risk'
          />
          <FormControlLabel
            value='3'
            control={<Radio id='health-rating' />}
            label='Critical'
          />
        </RadioGroup>
        {error && <FormHelperText>Select health rating.</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default HealthRatingRadioGroup;
