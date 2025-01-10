import { Diagnosis } from "../../../types";

export const getDiagnosisName = (
  code: string,
  diagnoses: Diagnosis[]
): string =>
  diagnoses?.find((diagnosis) => diagnosis.code === code)?.name ?? "";
