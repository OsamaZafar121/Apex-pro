import { createContext, useContext, useReducer, useEffect } from 'react';
import { api } from '../utils/api';
import { generateBookingId, validateBooking, getBufferDates, toDateKey } from '../utils/booking';
import { logger } from '../utils/logger';

const BookingContext = createContext(null);

const initialState = {
  bookings: [],
  customers: [],
  selectedDate: null,
  selectedTime: null,
  selectedService: null,
  isLoading: false,
  error: null,
  success: null,
  isLoaded: false,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false, success: null };
    
    case 'SET_SUCCESS':
      return { ...state, success: action.payload, error: null, isLoading: false };
    
    case 'CLEAR_MESSAGES':
      return { ...state, error: null, success: null };
    
    case 'LOAD_DATA':
      return {
        ...state,
        bookings: action.payload.bookings || [],
        customers: action.payload.customers || [],
        isLoaded: true,
      };
    
    case 'ADD_BOOKING': {
      return { ...state, bookings: [...state.bookings, action.payload] };
    }
    
    case 'UPDATE_BOOKING': {
      const updatedBookings = state.bookings.map(booking =>
        booking.id === action.payload.id ? { ...booking, ...action.payload } : booking
      );
      return { ...state, bookings: updatedBookings };
    }
    
    case 'CANCEL_BOOKING': {
      const cancelledBookings = state.bookings.map(booking =>
        booking.id === action.payload ? { ...booking, status: 'cancelled' } : booking
      );
      return { ...state, bookings: cancelledBookings };
    }
    
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    
    case 'UPDATE_CUSTOMER': {
      const updatedCustomers = state.customers.map(customer =>
        customer.id === action.payload.id ? { ...customer, ...action.payload } : customer
      );
      return { ...state, customers: updatedCustomers };
    }
    
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.payload };
    
    case 'SET_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    
    case 'CLEAR_SELECTION':
      return { ...state, selectedDate: null, selectedTime: null, selectedService: null };
    
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  async function loadData() {
    try {
      logger.info('Loading booking data');
      const hasAdminToken = typeof window !== 'undefined' && !!localStorage.getItem('adminToken');
      const [bookings, customers] = await Promise.all([
        api.getBookings(),
        hasAdminToken ? api.getCustomers() : Promise.resolve([]),
      ]);
      logger.info('Booking data loaded successfully', { bookingsCount: bookings.length, customersCount: customers.length });
      dispatch({ type: 'LOAD_DATA', payload: { bookings, customers } });
    } catch (error) {
      logger.error('Failed to load booking data', error);
      console.error('Failed to load data:', error);
      dispatch({ type: 'LOAD_DATA', payload: { bookings: [], customers: [] } });
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleAuthChanged = () => {
      loadData();
    };

    window.addEventListener('admin-auth-changed', handleAuthChanged);
    return () => window.removeEventListener('admin-auth-changed', handleAuthChanged);
  }, []);

  const checkAvailability = (date) => {
    if (!date) return false;

    const dateStr = toDateKey(date);
    const allBookings = state.bookings || [];
    
    const existingBooking = allBookings.find(
      booking =>
        booking.status === 'confirmed' &&
        toDateKey(booking.date) === dateStr
    );

    if (existingBooking) return false;

    const isWithinBuffer = (state.bookings || []).some(booking => {
      if (booking.status !== 'confirmed') return false;
      const bufferDates = getBufferDates(booking.date);
      return bufferDates.includes(dateStr);
    });

    return !isWithinBuffer;
  };

  const getBookedSlots = (date) => {
    if (!date) return [];

    const dateStr = toDateKey(date);
    
    const bookedTimes = (state.bookings || [])
      .filter(
        booking =>
          booking.status === 'confirmed' &&
          toDateKey(booking.date) === dateStr
      )
      .map(booking => booking.time);

    const isBufferDay = (state.bookings || []).some(booking => {
      if (booking.status !== 'confirmed') return false;
      const bufferDates = getBufferDates(booking.date);
      return bufferDates.includes(dateStr);
    });

    if (isBufferDay) {
      return ['ALL_SLOTS_BOOKED'];
    }

    return bookedTimes;
  };

  const isDateBlocked = (date) => {
    if (!date) return false;

    const dateStr = toDateKey(date);
    
    return (state.bookings || []).some(booking => {
      if (booking.status !== 'confirmed') return false;
      const bufferDates = getBufferDates(booking.date);
      return bufferDates.includes(dateStr);
    });
  };

  const createBooking = async (bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      logger.info('Creating booking', bookingData);
      const validation = validateBooking(bookingData);
      if (!validation.isValid) {
        logger.warn('Booking validation failed', validation.errors);
        dispatch({ type: 'SET_ERROR', payload: validation.errors });
        return { success: false, errors: validation.errors };
      }

      const isAvailable = checkAvailability(bookingData.date, bookingData.time);

      if (!isAvailable) {
        logger.warn('Booking not available - date/time blocked', { date: bookingData.date, time: bookingData.time });
        dispatch({
          type: 'SET_ERROR',
          payload: { date: 'This date is no longer available' }
        });
        return { success: false, errors: { date: 'This date is no longer available' } };
      }

      const booking = await api.createBooking({
        ...bookingData,
        id: generateBookingId(),
      });

      logger.info('Booking created successfully', { bookingId: booking.id });
      dispatch({ type: 'ADD_BOOKING', payload: booking });
      dispatch({ type: 'CLEAR_SELECTION' });
      dispatch({
        type: 'SET_SUCCESS',
        payload: 'Booking confirmed! Check your email for confirmation.'
      });

      return { success: true, booking };
    } catch (error) {
      logger.error('Failed to create booking', error);
      dispatch({ type: 'SET_ERROR', payload: { general: error.message } });
      return { success: false, errors: { general: error.message } };
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      logger.info('Cancelling booking', { bookingId });
      await api.cancelBooking(bookingId);
      dispatch({ type: 'CANCEL_BOOKING', payload: bookingId });
      dispatch({ type: 'SET_SUCCESS', payload: 'Booking cancelled successfully' });
      logger.info('Booking cancelled successfully', { bookingId });
    } catch (error) {
      logger.error('Failed to cancel booking', error);
      dispatch({ type: 'SET_ERROR', payload: { general: error.message } });
    }
  };

  const updateBooking = async (updateData) => {
    try {
      logger.info('Updating booking', updateData);
      const booking = await api.updateBooking(updateData.id, updateData);
      dispatch({ type: 'UPDATE_BOOKING', payload: booking });
      dispatch({ type: 'SET_SUCCESS', payload: 'Booking updated successfully' });
      logger.info('Booking updated successfully', { bookingId: booking.id });
      return { success: true, booking };
    } catch (error) {
      logger.error('Failed to update booking', error);
      dispatch({ type: 'SET_ERROR', payload: { general: error.message } });
      return { success: false, error: error.message };
    }
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const clearSuccess = () => {
    dispatch({ type: 'SET_SUCCESS', payload: null });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        checkAvailability,
        getBookedSlots,
        isDateBlocked,
        createBooking,
        cancelBooking,
        updateBooking,
        clearMessages,
        clearSuccess,
        clearError,
        getBookings: () => state.bookings,
        getCustomers: () => state.customers,
        refreshData: loadData,
        isLoaded: state.isLoaded,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    return {
      bookings: [],
      customers: [],
      isLoaded: false,
      createBooking: async () => ({ success: false }),
      cancelBooking: async () => {},
      updateBooking: async () => ({ success: false }),
      checkAvailability: () => false,
      getBookedSlots: () => [],
      isDateBlocked: () => false,
      clearMessages: () => {},
      clearSuccess: () => {},
      clearError: () => {},
      getBookings: () => [],
      getCustomers: () => [],
      refreshData: async () => {},
      isLoading: false,
      error: null,
      success: null,
    };
  }

  return context;
}
