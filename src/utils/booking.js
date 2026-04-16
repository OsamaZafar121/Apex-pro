import {
  BUSINESS_HOURS,
  DEFAULT_BUFFER_DAYS,
  TIME_SLOTS,
  getBufferDates,
  getBufferEndDate,
  isBusinessDay,
  isWithinBufferPeriod,
} from '../../shared/bookingRules.js';
import { SERVICES, getServiceDefinition } from '../../shared/services.js';

export {
  BUSINESS_HOURS,
  DEFAULT_BUFFER_DAYS,
  SERVICES,
  TIME_SLOTS,
  getBufferDates,
  getBufferEndDate,
  getServiceDefinition,
  isBusinessDay,
  isWithinBufferPeriod,
};

export const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (typeof value === 'string') {
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
  }

  return new Date(value);
};

export const toDateKey = (value) => {
  const date = parseDateValue(value);
  if (!date || Number.isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getStartOfDay = (value) => {
  const date = parseDateValue(value);
  if (!date || Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
};

export const isPastDate = (date) => {
  const today = getStartOfDay(new Date());
  const checkDate = getStartOfDay(date);
  if (!checkDate) {
    return false;
  }
  return checkDate < today;
};

export const formatDate = (date) => {
  const parsedDate = parseDateValue(date);
  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  return parsedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const compareDateValues = (left, right) => {
  const leftDate = getStartOfDay(left);
  const rightDate = getStartOfDay(right);

  if (!leftDate || !rightDate) {
    return 0;
  }

  return leftDate.getTime() - rightDate.getTime();
};

export const formatTime = (time) => {
  return time;
};

export const displayBookingTime = (time) => {
  return !time || time === 'TBD' ? 'Scheduling to be confirmed' : time;
};

export const convertTo24Hour = (time) => {
  const [timeStr, period] = time.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);

  if (period === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const getAvailableSlots = (date, bookedSlots) => {
  if (!date || !isBusinessDay(date) || isPastDate(date)) {
    return [];
  }

  return TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot));
};

export const generateBookingId = () => {
  return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateBooking = (data) => {
  const errors = {};

  if (!data.name || data.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.phone || data.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  }

  if (!data.service) {
    errors.service = 'Service type is required';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.time) {
    data.time = 'TBD';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
