import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

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
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatient, addPatient };
