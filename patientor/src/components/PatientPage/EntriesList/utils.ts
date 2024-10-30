import { Diagnosis } from "../../../types";

export const getDiagnosisName = (
  code: string,
  diagnoses: Diagnosis[]
): string =>
  diagnoses?.find((diagnosis) => diagnosis.code === code)?.name ?? "";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
