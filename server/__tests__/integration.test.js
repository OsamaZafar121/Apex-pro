// Backend integration tests
// Note: Jest globals are available automatically in Jest environment
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Import routes
import bookingRoutes from '../src/routes/bookings.js';
import customerRoutes from '../src/routes/customers.js';
import logRoutes from '../src/routes/logs.js';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/logs', logRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

describe('Backend Integration Tests', () => {
  beforeAll(async () => {
    // Clean up database before tests
    await prisma.booking.deleteMany();
    await prisma.customer.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    // Clean up after each test
    await prisma.booking.deleteMany();
    await prisma.customer.deleteMany();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('Bookings API', () => {
    describe('GET /api/bookings', () => {
      it('should return empty array when no bookings exist', async () => {
        const response = await request(app).get('/api/bookings');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
      });

      it('should return bookings when they exist', async () => {
        // Create a customer first
        const customer = await prisma.customer.create({
          data: {
            name: 'Test Customer',
            email: 'test@example.com',
            phone: '1234567890',
          },
        });

        // Create a booking
        await prisma.booking.create({
          data: {
            customerId: customer.id,
            service: 'residential',
            date: '2026-04-20',
            time: '08:00 AM',
            price: 150,
            status: 'confirmed',
          },
        });

        const response = await request(app).get('/api/bookings');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].service).toBe('residential');
      });
    });

    describe('POST /api/bookings', () => {
      it('should create a new booking', async () => {
        const bookingData = {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          service: 'residential',
          date: '2026-04-20',
          time: '08:00 AM',
          notes: 'Test booking',
        };

        const response = await request(app)
          .post('/api/bookings')
          .send(bookingData)
          .expect(200);

        expect(response.body.service).toBe('residential');
        expect(response.body.date).toBe('2026-04-20');
        expect(response.body.status).toBe('confirmed');
      });

      it('should reject booking with missing fields', async () => {
        const response = await request(app)
          .post('/api/bookings')
          .send({})
          .expect(400);

        expect(response.body.error).toBe('Missing required fields');
      });

      it('should reject booking on already booked date', async () => {
        const bookingData = {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '0987654321',
          service: 'commercial',
          date: '2026-04-21',
          time: '09:00 AM',
        };

        // Create first booking
        await request(app).post('/api/bookings').send(bookingData);

        // Try to create another booking on same date
        const response = await request(app)
          .post('/api/bookings')
          .send({
            ...bookingData,
            email: 'different@example.com',
          })
          .expect(409);

        expect(response.body.error).toContain('already booked');
      });
    });

    describe('GET /api/bookings/availability', () => {
      it('should return availability for a date', async () => {
        const response = await request(app)
          .get('/api/bookings/availability?date=2026-04-20');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('bookedTimes');
        expect(response.body).toHaveProperty('isBufferDay');
        expect(response.body).toHaveProperty('isBusinessDay');
      });
    });

    describe('DELETE /api/bookings/:id', () => {
      it('should cancel a booking', async () => {
        // Create a booking first
        const customer = await prisma.customer.create({
          data: {
            name: 'Test Customer',
            email: 'cancel@example.com',
            phone: '1234567890',
          },
        });

        const booking = await prisma.booking.create({
          data: {
            customerId: customer.id,
            service: 'residential',
            date: '2026-04-20',
            time: '08:00 AM',
            price: 150,
            status: 'confirmed',
          },
        });

        const response = await request(app)
          .delete(`/api/bookings/${booking.id}`)
          .expect(200);

        expect(response.body.message).toBe('Booking cancelled');

        // Verify booking is cancelled
        const updatedBooking = await prisma.booking.findUnique({
          where: { id: booking.id },
        });
        expect(updatedBooking.status).toBe('cancelled');
      });
    });
  });

  describe('Customers API', () => {
    describe('GET /api/customers', () => {
      it('should return empty array when no customers exist', async () => {
        const response = await request(app).get('/api/customers');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
      });

      it('should return customers when they exist', async () => {
        await prisma.customer.create({
          data: {
            name: 'Test Customer',
            email: 'customer@example.com',
            phone: '1234567890',
          },
        });

        const response = await request(app).get('/api/customers');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].email).toBe('customer@example.com');
      });
    });
  });

  describe('Logs API', () => {
    describe('POST /api/logs', () => {
      it('should accept and store logs', async () => {
        const logs = [
          {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            message: 'Test log message',
            url: 'http://localhost:5173/booking',
          },
        ];

        const response = await request(app)
          .post('/api/logs')
          .send({ logs })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.count).toBe(1);
      });

      it('should reject invalid log data', async () => {
        const response = await request(app)
          .post('/api/logs')
          .send({})
          .expect(400);

        expect(response.body.error).toBe('Invalid log data');
      });
    });
  });
});
