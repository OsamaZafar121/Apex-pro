import express from 'express';
import { sendBookingEmail } from '../utils/email.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { DEFAULT_BUFFER_DAYS, getBufferDates, isBusinessDay } from '../../../shared/bookingRules.js';
import { getServiceDefinition } from '../../../shared/services.js';

const router = express.Router();

function parseOptionalInt(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

async function getBookingSettings(prisma) {
  const settings = await prisma.settings.findMany({
    where: {
      key: {
        in: ['bufferDays', 'emailEnabled', 'smtpHost', 'smtpPort', 'smtpEmail', 'smtpPassword', 'notificationEmail'],
      },
    },
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
    const bookings = await req.prisma.booking.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/availability', async (req, res) => {
  try {
    const { date } = req.query;
    const dateStr = new Date(date).toISOString().split('T')[0];
    const { bufferDays } = await getBookingSettings(req.prisma);

    const bookings = await req.prisma.booking.findMany({
      where: {
        status: 'confirmed',
      },
    });

    const bookedTimes = bookings
      .filter((booking) => new Date(booking.date).toISOString().split('T')[0] === dateStr)
      .map((booking) => booking.time);

    const isBufferDay = bookings.some((booking) => {
      const bufferDates = getBufferDates(booking.date, bufferDays);
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

    const bookingSettings = await getBookingSettings(req.prisma);

    const existingBookings = await req.prisma.booking.findMany({
      where: {
        status: 'confirmed',
        date: dateStr,
      },
    });

    if (existingBookings.length > 0) {
      console.log('POST /api/bookings - Date already booked');
      return res.status(409).json({ error: 'This date is already booked' });
    }

    const allBookings = await req.prisma.booking.findMany({
      where: { status: 'confirmed' },
    });

    const isBufferDay = allBookings.some((booking) => {
      const bufferDates = getBufferDates(booking.date, bookingSettings.bufferDays);
      return bufferDates.includes(dateStr);
    });

    if (isBufferDay) {
      console.log('POST /api/bookings - Date is within buffer period');
      return res.status(409).json({ error: 'Date is within buffer period' });
    }

    let customer = await req.prisma.customer.findFirst({
      where: { email },
    });

    if (customer) {
      customer = await req.prisma.customer.update({
        where: { id: customer.id },
        data: {
          totalBookings: { increment: 1 },
          lastBooking: new Date(),
        },
      });
    } else {
      customer = await req.prisma.customer.create({
        data: { name, email, phone },
      });
    }

    console.log('POST /api/bookings - Customer:', customer.id);

    const serviceData = getServiceDefinition(service);

    const booking = await req.prisma.booking.create({
      data: {
        customerId: customer.id,
        service,
        date: dateStr,
        time,
        notes,
        price: serviceData.price,
        address,
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        status: 'confirmed',
      },
      include: { customer: true },
    });

    console.log('POST /api/bookings - Booking created:', booking.id);

    try {
      await sendBookingEmail(bookingSettings, booking);
    } catch (emailError) {
      console.error('Failed to send email:', emailError.message);
    }

    res.json(booking);
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

    const booking = await req.prisma.booking.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(service && { service }),
        ...(date && { date: new Date(date).toISOString().split('T')[0] }),
        ...(time && { time }),
      },
      include: { customer: true },
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await req.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
    });
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
