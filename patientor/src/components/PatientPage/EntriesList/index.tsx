import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../../../types";
import diagnosesService from "../../../services/diagnoses";
import HospitalEntryTile from "./HospitalEntryTile";
import OccupationalHealthcareTile from "./OccupationalHealthcareTile";
import HealthCheckTile from "./HealthCheckTile";
import { getDiagnosisName } from "./utils";
import { assertNever } from "../../common/utils";

interface EntriesProps {
  entries: Entry[];
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryTile entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareTile entry={entry} />;
    case "HealthCheck":
      return <HealthCheckTile entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const Diagnoses: React.FC<{ entry: Entry; diagnoses: Array<Diagnosis> }> = ({
  entry,
  diagnoses,
}) => (
  <>
    {entry.diagnosisCodes && entry.diagnosisCodes.length === 0 ? (
      <br />
    ) : (
      <div>
        <h4>Diagnoses:</h4>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code} {getDiagnosisName(code, diagnoses)}
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);

const EntriesList = ({ entries }: EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    diagnosesService
      .getAll()
      .then((data) => setDiagnoses(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h3>Entries</h3>
      {entries?.map((entry) => (
        <div key={entry.id} className='entry'>
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && (
            <Diagnoses entry={entry} diagnoses={diagnoses} />
          )}
          <div>Diagnose by {entry.specialist}</div>
        </div>
      ))}
    </div>
  );
};

export default EntriesList;
