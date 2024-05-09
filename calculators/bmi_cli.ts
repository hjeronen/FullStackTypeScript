import { parseArguments } from './utils';
import { calculateBmi } from './bmiCalculator';

try {
  const [height, weight, ...others]: number[] = parseArguments(process.argv);
  if (others.length > 0) {
    throw new Error('This function only accepts two arguments.');
  }
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log(`Something went wrong: ${error}`);
  }
}
