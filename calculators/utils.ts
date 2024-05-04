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
