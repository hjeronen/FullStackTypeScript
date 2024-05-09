import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { parseValue, parseValues } from './utils';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  return res
    .status(200)
    .json(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

app.post('/exercises', (req, res) => {
  try {
    return res.status(200).json(
      calculateExercises(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        parseValues(req.body.daily_exercises as string[]),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        parseValue(req.body.target as string)
      )
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message: string =
      error instanceof Error ? error.message : (error as string);
    return res.status(400).json({ error: message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
