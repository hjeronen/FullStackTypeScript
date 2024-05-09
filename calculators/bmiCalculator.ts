type Cm = number;
type Kg = number;

const round = (number: number): number => Math.round(number * 10) / 10;

export const calculateBmi = (height: Cm, weight: Kg): string => {
  const bmi: number = round(weight / (height / 100) ** 2);

  if (bmi < 16.0) {
    return 'Underweight (severe thinness)';
  } else if (bmi <= 16.9) {
    return 'Underweight (moderate thinness)';
  } else if (bmi <= 18.4) {
    return 'Underweight (mild thinness)';
  } else if (bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 29.9) {
    return 'Overweight (pre-obese)';
  } else if (bmi <= 34.9) {
    return 'Obese (class I)';
  } else if (bmi <= 39.9) {
    return 'Obese (class II)';
  } else if (bmi >= 40.0) {
    return 'Obese (class III)';
  } else {
    throw new Error('Invalid BMI');
  }
};

// console.log(calculateBmi(180, 40)); // Underweight (severe thinness)
// console.log(calculateBmi(180, 74)); // Normal (healthy weight)
// console.log(calculateBmi(180, 90)); // Overweight (pre-obese)
// console.log(calculateBmi(180, 120)); // Obese (class II)
