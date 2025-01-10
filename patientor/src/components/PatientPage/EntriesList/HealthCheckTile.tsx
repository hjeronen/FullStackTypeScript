import { HealthCheckEntry, HealthCheckRating } from "../../../types";
import { Favorite, MedicalServices } from "@mui/icons-material";
import { assertNever } from "../../common/utils";

interface HealthCheckTileProps {
  entry: HealthCheckEntry;
}

type HealthCheckRatingColor = "success" | "warning" | "error" | "inherit";

const HealthCheckTile = ({ entry }: HealthCheckTileProps) => {
  const getHealthCheckRating = (
    healthCheckRating: HealthCheckRating
  ): HealthCheckRatingColor => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return "success";
      case HealthCheckRating.LowRisk:
        return "warning";
      case HealthCheckRating.HighRisk:
        return "error";
      case HealthCheckRating.CriticalRisk:
        return "inherit";
      default:
        return assertNever(healthCheckRating);
    }
  };

  return (
    <div>
      <div>
        {entry.date} <MedicalServices />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <Favorite color={getHealthCheckRating(entry.healthCheckRating)} />
    </div>
  );
};

export default HealthCheckTile;
