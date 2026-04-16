import { describe, it, expect } from 'vitest';
import {
  isBusinessDay,
  isPastDate,
  getBufferDates,
  formatDate,
  convertTo24Hour,
  getAvailableSlots,
  generateBookingId,
  validateBooking,
  SERVICES,
  TIME_SLOTS,
  BUSINESS_HOURS,
} from '../utils/booking';

describe('Booking Utilities - Unit Tests', () => {
  describe('isBusinessDay', () => {
    it('should return true for Monday-Friday', () => {
      // Monday
      expect(isBusinessDay(new Date('2026-04-13'))).toBe(true);
      // Wednesday
      expect(isBusinessDay(new Date('2026-04-15'))).toBe(true);
      // Friday
      expect(isBusinessDay(new Date('2026-04-17'))).toBe(true);
    });

    it('should return false for Saturday and Sunday', () => {
      // Saturday
      expect(isBusinessDay(new Date('2026-04-18'))).toBe(false);
      // Sunday
      expect(isBusinessDay(new Date('2026-04-19'))).toBe(false);
    });
  });

  describe('isPastDate', () => {
    it('should return false for future dates', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      expect(isPastDate(futureDate)).toBe(false);
    });

    it('should return true for past dates', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 7);
      expect(isPastDate(pastDate)).toBe(true);
    });

    it('should return false for today', () => {
      expect(isPastDate(new Date())).toBe(false);
    });
  });

  describe('getBufferDates', () => {
    it('should return 1 reserved buffer date after the booking date by default', () => {
      const bookingDate = '2026-04-20';
      const bufferDates = getBufferDates(bookingDate);

      expect(bufferDates).toHaveLength(1);
      expect(bufferDates).toContain('2026-04-21');
    });

    it('should handle month boundaries correctly', () => {
      const bookingDate = '2026-04-30';
      const bufferDates = getBufferDates(bookingDate);

      expect(bufferDates).toContain('2026-05-01');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2026-04-15');
      const formatted = formatDate(date);

      expect(formatted).toContain('2026');
      expect(formatted).toContain('April');
      expect(formatted).toContain('15');
    });
  });

  describe('convertTo24Hour', () => {
    it('should convert AM times correctly', () => {
      expect(convertTo24Hour('08:00 AM')).toBe('08:00');
      expect(convertTo24Hour('12:00 AM')).toBe('00:00');
    });

    it('should convert PM times correctly', () => {
      expect(convertTo24Hour('01:00 PM')).toBe('13:00');
      expect(convertTo24Hour('12:00 PM')).toBe('12:00');
    });
  });

  describe('getAvailableSlots', () => {
    it('should return all slots when none are booked', () => {
      const date = new Date('2026-04-20'); // Monday
      const bookedSlots = [];
      const available = getAvailableSlots(date, bookedSlots);

      expect(available).toEqual(TIME_SLOTS);
    });

    it('should filter out booked slots', () => {
      const date = new Date('2026-04-20'); // Monday
      const bookedSlots = ['08:00 AM', '09:00 AM'];
      const available = getAvailableSlots(date, bookedSlots);

      expect(available).not.toContain('08:00 AM');
      expect(available).not.toContain('09:00 AM');
      expect(available.length).toBe(TIME_SLOTS.length - 2);
    });

    it('should return empty array for weekends', () => {
      const date = new Date('2026-04-18'); // Saturday
      const available = getAvailableSlots(date, []);

      expect(available).toEqual([]);
    });
  });

  describe('generateBookingId', () => {
    it('should generate unique booking IDs', () => {
      const id1 = generateBookingId();
      const id2 = generateBookingId();

      expect(id1).toMatch(/^booking_\d+_[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('validateBooking', () => {
    it('should return valid for complete data', () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        service: 'residential',
        date: '2026-04-20',
        time: '08:00 AM',
      };

      const result = validateBooking(data);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors for missing fields', () => {
      const data = {};
      const result = validateBooking(data);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('name');
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('phone');
      expect(result.errors).toHaveProperty('service');
      expect(result.errors).toHaveProperty('date');
      // Time is optional - defaults to 'TBD'
      expect(result.errors).not.toHaveProperty('time');
      expect(data.time).toBe('TBD');
    });

    it('should validate email format', () => {
      const data = {
        name: 'John Doe',
        email: 'invalid-email',
        phone: '1234567890',
        service: 'residential',
        date: '2026-04-20',
        time: '08:00 AM',
      };

      const result = validateBooking(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('email');
    });
  });

  describe('SERVICES', () => {
    it('should have all service types defined', () => {
      expect(SERVICES.residential).toBeDefined();
      expect(SERVICES.commercial).toBeDefined();
      expect(SERVICES.deep).toBeDefined();
      expect(SERVICES.moveinout).toBeDefined();
      expect(SERVICES.carpet).toBeDefined();
      expect(SERVICES.window).toBeDefined();
    });

    it('should have valid pricing for each service', () => {
      Object.values(SERVICES).forEach((service) => {
        expect(service.price).toBeGreaterThan(0);
        expect(service.duration).toBeGreaterThan(0);
      });
    });
  });

  describe('TIME_SLOTS', () => {
    it('should have time slots defined', () => {
      expect(TIME_SLOTS.length).toBeGreaterThan(0);
    });

    it('should have valid time format', () => {
      TIME_SLOTS.forEach((slot) => {
        expect(slot).toMatch(/\d{2}:\d{2} [AP]M/);
      });
    });
  });

  describe('BUSINESS_HOURS', () => {
    it('should have valid business hours', () => {
      expect(BUSINESS_HOURS.start).toBe(8);
      expect(BUSINESS_HOURS.end).toBe(17);
      expect(BUSINESS_HOURS.days).toEqual([1, 2, 3, 4, 5]);
    });
  });
});
