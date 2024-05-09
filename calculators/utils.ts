export const parseArguments = (args: string[]): number[] => {
  if (args.length < 4) {
    throw new Error('You must provide at least two arguments.');
  }
  const result: number[] = [];

  args.slice(2).forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error(`${arg} is not a number`);
    }
    result.push(Number(arg));
  });

  return result;
};

export const parseValues = (values: string[]): number[] => {
  if (!values || values.length === 0) {
    throw new Error('missing parameters');
  }

  if (!(values instanceof Array)) {
    throw new Error('malformatted parameters');
  }

  const result: number[] = [];
  values.forEach((value) => {
    result.push(parseValue(value));
  });
  return result;
};

export const parseValue = (value: string): number => {
  if (value === undefined) {
    throw new Error('missing parameters');
  }

  if (isNaN(Number(value))) {
    throw new Error('malformatted parameters');
  }

  return Number(value);
};
