export const parseDiagnosisCodes = (codes: string): string[] =>
  codes && codes.length > 0
    ? codes.split(",").map((code) => code.replace(/\s/g, ""))
    : [];
