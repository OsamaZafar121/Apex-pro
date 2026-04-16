export const DEFAULT_BUFFER_DAYS = 1;

export const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const BUSINESS_HOURS = {
  start: 8,
  end: 17,
  days: [1, 2, 3, 4, 5],
};

export function isBusinessDay(date) {
  const day = new Date(date).getDay();
  return BUSINESS_HOURS.days.includes(day);
}

export function getBufferEndDate(bookingDate, bufferDays = DEFAULT_BUFFER_DAYS) {
  const date = new Date(bookingDate);
  date.setDate(date.getDate() + bufferDays);
  return date;
}

export function isWithinBufferPeriod(checkDate, bookingDate, bufferDays = DEFAULT_BUFFER_DAYS) {
  const check = new Date(checkDate);
  check.setHours(0, 0, 0, 0);

  const booking = new Date(bookingDate);
  booking.setHours(0, 0, 0, 0);

  const bufferEnd = getBufferEndDate(bookingDate, bufferDays);
  bufferEnd.setHours(0, 0, 0, 0);

  return check > booking && check <= bufferEnd;
}

export function getBufferDates(bookingDate, bufferDays = DEFAULT_BUFFER_DAYS) {
  const dates = [];
  const booking = new Date(bookingDate);

  for (let i = 1; i <= bufferDays; i += 1) {
    const bufferDate = new Date(booking);
    bufferDate.setDate(booking.getDate() + i);
    dates.push(bufferDate.toISOString().split('T')[0]);
  }

  return dates;
}
