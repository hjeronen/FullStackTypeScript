import { calculateExercises } from './exerciseCalculator';
import { parseArguments } from './utils';

try {
  const [target, ...exercises] = parseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log(`Something went wrong: ${error}`);
  }
}
