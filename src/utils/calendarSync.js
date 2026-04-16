// Calendar synchronization utilities

import { SERVICES, convertTo24Hour } from './booking';

const getCustomerName = (booking) => booking.customer?.name || 'Unknown customer';
const getCustomerEmail = (booking) => booking.customer?.email || 'No email';
const getCustomerPhone = (booking) => booking.customer?.phone || 'No phone';

// Generate ICS file content for calendar download
export const generateICSFile = (booking) => {
  const service = SERVICES[booking.service] || SERVICES.residential;
  const startDate = new Date(booking.date);
  const startTime = convertTo24Hour(booking.time);
  const [hours, minutes] = startTime.split(':').map(Number);
  
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + service.duration * 60000);
  
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex Pro Cleaners//Booking System//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${service.name} - Apex Pro Cleaners
DESCRIPTION:Booking ID: ${booking.id}\\nService: ${service.name}\\nDuration: ${service.duration} minutes\\nNotes: ${booking.notes || 'None'}
LOCATION:${booking.address || 'TBD'}
STATUS:CONFIRMED
UID:${booking.id}@apexprocleaners.com
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${service.name} tomorrow at ${booking.time}
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
};

// Download ICS file
export const downloadICS = (booking) => {
  const icsContent = generateICSFile(booking);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `booking-${booking.id}.ics`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// Generate Google Calendar URL
export const generateGoogleCalendarURL = (booking) => {
  const service = SERVICES[booking.service] || SERVICES.residential;
  const startDate = new Date(booking.date);
  const startTime = convertTo24Hour(booking.time);
  const [hours, minutes] = startTime.split(':').map(Number);
  
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + service.duration * 60000);
  
  const formatGCalDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const text = `${service.name} - Apex Pro Cleaners`;
  const details = `Booking ID: ${booking.id}\nService: ${service.name}\nDuration: ${service.duration} minutes\nNotes: ${booking.notes || 'None'}`;
  const location = booking.address || 'TBD';
  const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(text)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${dates}`;
};

// Generate Outlook Calendar URL
export const generateOutlookCalendarURL = (booking) => {
  const service = SERVICES[booking.service] || SERVICES.residential;
  const startDate = new Date(booking.date);
  const startTime = convertTo24Hour(booking.time);
  const [hours, minutes] = startTime.split(':').map(Number);
  
  startDate.setHours(hours, minutes, 0, 0);
  
  const endDate = new Date(startDate.getTime() + service.duration * 60000);

  const formatOutlookDate = (date) => {
    return date.toISOString().split('.')[0] + 'Z';
  };

  return `https://outlook.live.com/calendar/0/action/compose?rru=addevent&subject=${encodeURIComponent(`${service.name} - Apex Pro Cleaners`)}&startdt=${formatOutlookDate(startDate)}&enddt=${formatOutlookDate(endDate)}&body=${encodeURIComponent(`Booking ID: ${booking.id}\nService: ${service.name}\nNotes: ${booking.notes || 'None'}`)}`;
};

// Generate Apple Calendar URL (uses same ICS download)
export const generateAppleCalendarAction = (booking) => {
  downloadICS(booking);
};

// Export all bookings as ICS file
export const exportAllBookingsICS = (bookings) => {
  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apex Pro Cleaners//Booking System//EN`;

  bookings
    .filter(b => b.status === 'confirmed')
    .forEach(booking => {
      const service = SERVICES[booking.service] || SERVICES.residential;
      const startDate = new Date(booking.date);
      const startTime = convertTo24Hour(booking.time);
      const [hours, minutes] = startTime.split(':').map(Number);
      
      startDate.setHours(hours, minutes, 0, 0);
      
      const endDate = new Date(startDate.getTime() + service.duration * 60000);
      
      const formatICSDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      icsContent += `
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${service.name} - ${getCustomerName(booking)}
DESCRIPTION:Booking ID: ${booking.id}\\nCustomer: ${getCustomerName(booking)}\\nEmail: ${getCustomerEmail(booking)}\\nPhone: ${getCustomerPhone(booking)}\\nNotes: ${booking.notes || 'None'}
LOCATION:${booking.address || 'TBD'}
STATUS:CONFIRMED
UID:${booking.id}@apexprocleaners.com
END:VEVENT`;
    });

  icsContent += '\nEND:VCALENDAR';

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `apex-bookings-${new Date().toISOString().split('T')[0]}.ics`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// Calendar sync component data
export const getCalendarSyncOptions = (booking) => {
  return [
    {
      name: 'Google Calendar',
      icon: '📅',
      color: '#4285F4',
      action: () => {
        window.open(generateGoogleCalendarURL(booking), '_blank');
      },
    },
    {
      name: 'Outlook',
      icon: '📧',
      color: '#0078D4',
      action: () => {
        window.open(generateOutlookCalendarURL(booking), '_blank');
      },
    },
    {
      name: 'Apple Calendar',
      icon: '🍎',
      color: '#000000',
      action: () => {
        downloadICS(booking);
      },
    },
    {
      name: 'Download ICS',
      icon: '📥',
      color: '#1169a9',
      action: () => {
        downloadICS(booking);
      },
    },
  ];
};
