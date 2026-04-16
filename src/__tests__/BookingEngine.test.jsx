import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookingEngine from '../pages/BookingEngine';
import { BookingProvider, useBooking } from '../context/BookingContext';

// Mock the useBooking hook
vi.mock('../context/BookingContext', () => ({
  useBooking: vi.fn(),
  BookingProvider: ({ children }) => children,
}));

const mockUseBooking = vi.mocked(useBooking);

describe('BookingEngine - Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading state', () => {
    it('should show loading spinner when not loaded', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: false,
        isLoading: false,
        bookings: [],
        error: null,
        success: null,
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      expect(screen.getByText('Loading booking system...')).toBeInTheDocument();
    });
  });

  describe('Calendar rendering', () => {
    it('should render calendar when loaded', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: true,
        isLoading: false,
        bookings: [],
        error: null,
        success: null,
        createBooking: vi.fn(),
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      expect(screen.getByText('Book Your Cleaning')).toBeInTheDocument();
      expect(screen.getByText('Select a date that works best for you')).toBeInTheDocument();
    });

    it('should render month navigation', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: true,
        isLoading: false,
        bookings: [],
        error: null,
        success: null,
        createBooking: vi.fn(),
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      const currentDate = new Date();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
      const expectedMonth = monthNames[currentDate.getMonth()];
      expect(screen.getByText(new RegExp(expectedMonth))).toBeInTheDocument();
    });
  });

  describe('Success and error messages', () => {
    it('should show success message when present', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: true,
        isLoading: false,
        bookings: [],
        error: null,
        success: 'Booking confirmed!',
        createBooking: vi.fn(),
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      expect(screen.getByText('Booking confirmed!')).toBeInTheDocument();
    });

    it('should show error message when present', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: true,
        isLoading: false,
        bookings: [],
        error: 'Booking failed',
        success: null,
        createBooking: vi.fn(),
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      expect(screen.getByText('Booking failed')).toBeInTheDocument();
    });
  });

  describe('Legend', () => {
    it('should display calendar legend', () => {
      mockUseBooking.mockReturnValue({
        isLoaded: true,
        isLoading: false,
        bookings: [],
        error: null,
        success: null,
        createBooking: vi.fn(),
      });

      render(
        <BrowserRouter>
          <BookingEngine />
        </BrowserRouter>
      );

      expect(screen.getByText('Selected')).toBeInTheDocument();
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Booked')).toBeInTheDocument();
      expect(screen.getByText('Unavailable')).toBeInTheDocument();
    });
  });
});
