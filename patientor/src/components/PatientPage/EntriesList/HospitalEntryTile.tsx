import { HospitalEntry } from "../../../types";
import { LocalHospital } from "@mui/icons-material";

interface HospitalEntryTileProps {
  entry: HospitalEntry;
}
const HospitalEntryTile = ({ entry }: HospitalEntryTileProps) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospital />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <h4>Discharge:</h4>
      <div>date: {entry.discharge.date}</div>
      <div>criteria: {entry.discharge.criteria}</div>
    </div>
  );
};

export default HospitalEntryTile;
