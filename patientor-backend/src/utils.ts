import { z } from 'zod';
import { Gender, HealthCheckRating, NewEntry, NewPatient } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const parseNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const NewBaseEntrySchema = z.object({
  type: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
});

export const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
});

export const parseNewEntry = (entry: NewEntry) => {
  switch (entry.type) {
    case 'HealthCheck':
      return NewHealthCheckEntrySchema.parse(entry);
    case 'Hospital':
      return NewHospitalEntrySchema.parse(entry);
    case 'OccupationalHealthcare':
      return NewOccupationalHealthcareEntrySchema.parse(entry);
    default:
      throw new Error('Unkown entry type');
  }
};
