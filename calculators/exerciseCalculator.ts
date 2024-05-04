type Rating = 1 | 2 | 3;
type RatingDescription = 'Bad' | 'OK' | 'Good';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number): Result => {
  const periodLength: number = exercises.length;
  const trainingDays: number = exercises.filter((value) => value > 0).length;
  const average: number =
    exercises.reduce((sum, hours) => (sum += hours), 0) / periodLength;
  const success: boolean = average >= target;

  const difference: number = average - target;
  const threshold = target * 0.1;
  let rating: Rating;
  if (difference >= threshold) {
    rating = 3;
  } else if (difference <= threshold * -1) {
    rating = 1;
  } else {
    rating = 2;
  }

  let ratingDescription: RatingDescription;
  switch (rating) {
    case 1:
      ratingDescription = 'Bad';
      break;
    case 2:
      ratingDescription = 'OK';
      break;
    case 3:
      ratingDescription = 'Good';
      break;
    default:
      throw new Error(`Invalid rating value: ${rating}`);
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)); // OK
console.log(calculateExercises([3, 2, 2, 4.5, 2, 3, 1], 2)); // Good
console.log(calculateExercises([1, 0, 2, 1, 0, 3, 1], 2)); // Bad
