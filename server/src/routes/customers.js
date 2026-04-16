import express from 'express';
import { requireAdminAuth } from '../middleware/auth.js';
import { Customer } from '../models/Customer.js';
import { Booking } from '../models/Booking.js';

const router = express.Router();

router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 }).lean();
    const customersWithBookings = await Promise.all(
      customers.map(async (customer) => {
        const bookings = await Booking.find({ customerId: customer._id }).lean();
        return { ...customer, bookings };
      })
    );
    res.json(customersWithBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id).lean();
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const bookings = await Booking.find({ customerId: id }).lean();
    res.json({ ...customer, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const customer = await Customer.findByIdAndUpdate(id, { name, email, phone }, { new: true }).lean();

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    await Booking.deleteMany({ customerId: id });
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
