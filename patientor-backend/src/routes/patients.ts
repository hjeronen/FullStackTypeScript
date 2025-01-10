import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { z } from 'zod';
import { parseNewEntry, parseNewPatient } from '../utils';
import type { NewEntry, NewPatient, Patient } from '../types';

const router = express.Router();

interface NewPatientRequest extends Request {
  body: NewPatient;
}

interface NewEntryRequest extends Request {
  params: { id: string };
  body: NewEntry;
}

const newPatientParser = (
  req: NewPatientRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    parseNewPatient(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (
  req: NewEntryRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    parseNewEntry(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req: Request, res: Response) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req: Request, res: Response) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient data not found' });
  }
});

router.post(
  '/',
  newPatientParser,
  (req: NewPatientRequest, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  '/:id/entries',
  newEntryParser,
  (req: NewEntryRequest, res: Response<Patient>) => {
    const modifiedPatient = patientService.addEntry(req.params.id, req.body);
    res.json(modifiedPatient);
  }
);

router.use(errorMiddleware);

export default router;
