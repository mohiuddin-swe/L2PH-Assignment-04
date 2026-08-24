import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware.js';
import {
  getMyAvailability,
  getAvailabilityByTechnicianId,
  addAvailabilitySlot,
  deleteAvailabilitySlot,
} from './availability.service.js';

export const myAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const slots = await getMyAvailability(req.user!.userId);
    return res.status(200).json({ success: true, data: slots });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message, errorDetails: null });
  }
};

export const publicAvailability = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const slots = await getAvailabilityByTechnicianId(id);
    return res.status(200).json({ success: true, data: slots });
  } catch (error) {
    return res.status(404).json({ success: false, message: (error as Error).message, errorDetails: null });
  }
};

export const addSlot = async (req: AuthRequest, res: Response) => {
  try {
    const { dayOfWeek, startTime, endTime } = req.body;
    const slot = await addAvailabilitySlot(req.user!.userId, { dayOfWeek, startTime, endTime });
    return res.status(201).json({ success: true, message: 'Availability slot added', data: slot });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message, errorDetails: null });
  }
};

export const removeSlot = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    if (!id) return res.status(400).json({ success: false, message: 'Slot id is required', errorDetails: null });

    await deleteAvailabilitySlot(req.user!.userId, id);
    return res.status(200).json({ success: true, message: 'Availability slot removed', data: null });
  } catch (error) {
    return res.status(400).json({ success: false, message: (error as Error).message, errorDetails: null });
  }
};