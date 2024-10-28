import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../types";
import diagnosesService from "../../services/diagnoses";

interface EntriesProps {
  entries: Entry[];
}

const Entries = ({ entries }: EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosesService
      .getAll()
      .then((data) => setDiagnoses(data))
      .catch((e) => console.log(e));
  }, []);

  const getDiagnosisName = (code: string): string =>
    diagnoses?.find((diagnosis) => diagnosis.code === code)?.name ?? "";

  return (
    <div>
      <h3>Entries</h3>
      {entries?.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {getDiagnosisName(code)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Entries;
