import { OccupationalHealthcareEntry } from "../../../types";
import { Work } from "@mui/icons-material";

interface OccupationalHealthcareTileProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareTile = ({
  entry,
}: OccupationalHealthcareTileProps) => {
  return (
    <div>
      <div>
        {entry.date} <Work /> <i>{entry.employerName}</i>
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      {entry.sickLeave && (
        <>
          <h4>Sick leave:</h4>
          <div>start: {entry.sickLeave.startDate}</div>
          <div>end: {entry.sickLeave.endDate}</div>
        </>
      )}
    </div>
  );
};

export default OccupationalHealthcareTile;
