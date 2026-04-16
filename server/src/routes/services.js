import express from 'express';
import { TIME_SLOTS } from '../../../shared/bookingRules.js';
import { SERVICES } from '../../../shared/services.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ services: SERVICES, timeSlots: TIME_SLOTS });
});

router.get('/time-slots', (req, res) => {
  res.json(TIME_SLOTS);
});

export default router;
