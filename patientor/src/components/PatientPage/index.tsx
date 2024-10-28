import { useEffect, useState } from "react";
import { Gender, Patient } from "../../types";
import { useMatch } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";
import patientService from "../../services/patients";
import Entries from "./Entries";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState<string | undefined>("");
  const match = useMatch("/:id");

  useEffect(() => {
    if (match?.params.id) {
      patientService
        .getPatient(match.params.id)
        .then((fetched) => setPatient(fetched))
        .catch((error: unknown) => {
          if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.error);
          } else {
            setError("Something went wrong.");
          }
        });
    } else {
      setPatient(undefined);
    }
  }, [match]);

  const getGenderIcon = () => {
    switch (patient?.gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      case Gender.Other:
        return <Transgender />;
      default:
        null;
    }
  };

  return patient ? (
    <div>
      <h1>
        {patient.name} {getGenderIcon()}
      </h1>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Entries entries={patient.entries} />
    </div>
  ) : (
    <div>{error ?? "No patient data available."}</div>
  );
};

export default PatientPage;
