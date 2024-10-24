import { NonSensitivePatientInfo, Patient } from '../types';
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

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
