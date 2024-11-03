import {
  NonSensitivePatientInfo,
  Patient,
  NewPatient,
  Entry,
  NewEntry,
} from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { parseNewEntry, parseNewPatient } from '../utils';

const getPatients = (): NonSensitivePatientInfo[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    entries: [],
    ...parseNewPatient(patient),
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (userId: string, entry: NewEntry): Patient | undefined => {
  const patient = patientData.find((patient) => patient.id === userId);
  const newEntry: Entry = {
    id: uuid(),
    ...parseNewEntry(entry),
  };

  patient?.entries.push(newEntry);
  return patient;
};

export default { getPatients, getPatient, addPatient, addEntry };
