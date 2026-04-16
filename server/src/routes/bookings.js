import express from 'express';
import { sendBookingEmail } from '../utils/email.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { DEFAULT_BUFFER_DAYS, getBufferDates, isBusinessDay } from '../../../shared/bookingRules.js';
import { getServiceDefinition } from '../../../shared/services.js';
import { Booking } from '../models/Booking.js';
import { Customer } from '../models/Customer.js';
import { Settings } from '../models/Settings.js';

const router = express.Router();

function parseOptionalInt(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

async function getBookingSettings() {
  const settings = await Settings.find({
    key: { $in: ['bufferDays', 'emailEnabled', 'smtpHost', 'smtpPort', 'smtpEmail', 'smtpPassword', 'notificationEmail'] },
  });

  return settings.reduce(
    (accumulator, setting) => {
      if (setting.key === 'bufferDays') {
        accumulator.bufferDays = parseInt(setting.value, 10) || DEFAULT_BUFFER_DAYS;
      } else if (setting.key === 'emailEnabled') {
        accumulator.emailEnabled = setting.value === 'true';
      } else {
        accumulator[setting.key] = setting.value;
      }

      return accumulator;
    },
    {
      bufferDays: DEFAULT_BUFFER_DAYS,
      emailEnabled: false,
      smtpHost: '',
      smtpPort: '',
      smtpEmail: '',
      smtpPassword: '',
      notificationEmail: '',
    }
  );
}

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    const bookingsWithCustomer = await Promise.all(
      bookings.map(async (booking) => {
        const customer = await Customer.findById(booking.customerId).lean();
        return { ...booking, customer };
      })
    );
    res.json(bookingsWithCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    const dateStr = new Date(date).toISOString().split('T')[0];
    const bookingSettings = await getBookingSettings();

    const bookings = await Booking.find({ status: 'confirmed' }).lean();

    const bookedTimes = bookings
      .filter((booking) => new Date(booking.date).toISOString().split('T')[0] === dateStr)
      .map((booking) => booking.time);

    const isBufferDay = bookings.some((booking) => {
      const bufferDates = getBufferDates(booking.date, bookingSettings.bufferDays);
      return bufferDates.includes(dateStr);
    });

    res.json({ bookedTimes, isBufferDay, isBusinessDay: isBusinessDay(date) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('POST /api/bookings - Request received:', req.body);

    const { name, email, phone, service, date, time = 'TBD', notes, address, bedrooms, bathrooms } = req.body;
    const parsedBedrooms = parseOptionalInt(bedrooms);
    const parsedBathrooms = parseOptionalInt(bathrooms);

    if (!name || !email || !phone || !service || !date) {
      console.log('POST /api/bookings - Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const dateStr = new Date(date).toISOString().split('T')[0];
    console.log('POST /api/bookings - Processing date:', dateStr);

    const bookingSettings = await getBookingSettings();

    const existingBookings = await Booking.find({
      status: 'confirmed',
      date: dateStr,
    });

    if (existingBookings.length > 0) {
      console.log('POST /api/bookings - Date already booked');
      return res.status(409).json({ error: 'This date is already booked' });
    }

    const allBookings = await Booking.find({ status: 'confirmed' });

    const isBufferDay = allBookings.some((booking) => {
      const bufferDates = getBufferDates(booking.date, bookingSettings.bufferDays);
      return bufferDates.includes(dateStr);
    });

    if (isBufferDay) {
      console.log('POST /api/bookings - Date is within buffer period');
      return res.status(409).json({ error: 'Date is within buffer period' });
    }

    let customer = await Customer.findOne({ email });

    if (customer) {
      customer = await Customer.findByIdAndUpdate(
        customer._id,
        { totalBookings: customer.totalBookings + 1, lastBooking: new Date() },
        { new: true }
      ).lean();
    } else {
      customer = await Customer.create({ name, email, phone });
      customer = customer.toObject();
    }

    console.log('POST /api/bookings - Customer:', customer._id);

    const serviceData = getServiceDefinition(service);

    const booking = await Booking.create({
      customerId: customer._id,
      service,
      date: dateStr,
      time,
      notes,
      price: serviceData.price,
      address,
      bedrooms: parsedBedrooms,
      bathrooms: parsedBathrooms,
      status: 'confirmed',
    });

    const bookingObj = booking.toObject();
    bookingObj.customer = customer;

    console.log('POST /api/bookings - Booking created:', booking._id);

    try {
      await sendBookingEmail(bookingSettings, bookingObj);
    } catch (emailError) {
      console.error('Failed to send email:', emailError.message);
    }

    res.json(bookingObj);
  } catch (error) {
    console.error('POST /api/bookings - Error:', error);
    console.error('POST /api/bookings - Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Failed to create booking' });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, service, date, time } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (service) updateData.service = service;
    if (date) updateData.date = new Date(date).toISOString().split('T')[0];
    if (time) updateData.time = time;

    const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true }).lean();
    const customer = await Customer.findById(booking.customerId).lean();
    booking.customer = customer;

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { status: 'cancelled' });
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
