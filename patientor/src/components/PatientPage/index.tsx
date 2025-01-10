import { useEffect, useState } from "react";
import {
  Gender,
  type ZodErrorObject,
  type NewEntry,
  type Patient,
} from "../../types";
import { useMatch } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";
import patientService from "../../services/patients";
import EntriesList from "./EntriesList";
import EntryForm from "./EntryForm";
import ErrorNotification from "./ErrorNotification";

const ERROR_MESSAGE = "Something went wrong";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState<string | undefined>("");
  const match = useMatch("/:id");

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  useEffect(() => {
    if (match?.params.id) {
      patientService
        .getPatient(match.params.id)
        .then((fetched) => setPatient(fetched))
        .catch((error: unknown) => {
          if (axios.isAxiosError(error) && error.response) {
            showError(error.response.data.error);
          } else {
            showError(ERROR_MESSAGE);
          }
        });
    } else {
      setPatient(undefined);
    }
  }, [match]);

  const addEntry = async (entry: NewEntry): Promise<boolean> => {
    try {
      if (patient) {
        const updatedPatient = await patientService.addEntry(patient.id, entry);
        setPatient(updatedPatient);
        return true;
      }
      return false;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error[0] instanceof Object) {
          const zodError: ZodErrorObject = error.response.data.error[0];
          const path: string = zodError.path ? zodError.path[0] : "";
          showError(`Value of ${path} is incorrect: ${zodError.received}`);
        } else {
          showError(ERROR_MESSAGE);
        }
      } else {
        showError(ERROR_MESSAGE);
      }
      return false;
    }
  };

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
      <h2>
        {patient.name} {getGenderIcon()}
      </h2>
      <div>Ssn: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <ErrorNotification error={error} />
      <EntryForm onSubmit={addEntry} />
      <EntriesList entries={patient.entries} />
    </div>
  ) : (
    <div>{error ?? "No patient data available."}</div>
  );
};

export default PatientPage;
