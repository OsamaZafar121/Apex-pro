// Notification utilities for booking system

// Email notification template generator
export const generateBookingConfirmationEmail = (booking) => {
  const service = {
    residential: { name: 'Residential Cleaning', price: 150 },
    commercial: { name: 'Commercial Cleaning', price: 250 },
    deep: { name: 'Deep Cleaning', price: 300 },
    moveinout: { name: 'Move In/Out Cleaning', price: 220 },
    carpet: { name: 'Carpet Cleaning', price: 120 },
    window: { name: 'Window Cleaning', price: 80 },
  }[booking.service] || { name: booking.service, price: 0 };

  return {
    to: booking.email,
    subject: 'Booking Confirmation - Apex Pro Cleaners',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1169a9, #F08A7F); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .detail-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #1169a9; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #1169a9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Thank you for choosing Apex Pro Cleaners</p>
          </div>
          <div class="content">
            <p>Dear ${booking.name},</p>
            <p>Your booking has been successfully confirmed. Here are your booking details:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Booking ID:</span>
                <span>${booking.id}</span>
              </div>
              <div class="detail-row">
                <span class="label">Service:</span>
                <span>${service.name}</span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span>${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="detail-row">
                <span class="label">Time:</span>
                <span>${booking.time}</span>
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span>
                <span>Approximately 2-3 hours</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount:</span>
                <span style="color: #F08A7F; font-size: 18px; font-weight: bold;">$${service.price}</span>
              </div>
            </div>

            ${booking.notes ? `<p><strong>Special Requests:</strong> ${booking.notes}</p>` : ''}

            <p style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107;">
              <strong>💡 Reminder:</strong> Our team will arrive at your location at the scheduled time. Please ensure someone is available to provide access.
            </p>

            <div style="text-align: center;">
              <a href="${window.location.origin}/booking" class="button">View My Bookings</a>
            </div>

            <p>If you need to make any changes or have questions, please don't hesitate to contact us.</p>

            <div class="footer">
              <p><strong>Apex Pro Cleaners</strong></p>
              <p>📞 (555) 123-4567 | ✉️ info@apexprocleaners.com</p>
              <p>20% off your first cleaning!</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Cancellation email template
export const generateBookingCancellationEmail = (booking) => {
  return {
    to: booking.email,
    subject: 'Booking Cancellation - Apex Pro Cleaners',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #dc3545, #c82333); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>❌ Booking Cancelled</h1>
            <p>Your booking has been cancelled</p>
          </div>
          <div class="content">
            <p>Dear ${booking.name},</p>
            <p>Your booking has been successfully cancelled.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${booking.id}</p>
              <p><strong>Service:</strong> ${booking.service}</p>
              <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${booking.time}</p>
            </div>

            <p>If this was a mistake or you'd like to rebook, please visit our website or contact us.</p>

            <div class="footer">
              <p><strong>Apex Pro Cleaners</strong></p>
              <p>📞 (555) 123-4567 | ✉️ info@apexprocleaners.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// Reminder notification (24 hours before booking)
export const generateBookingReminderEmail = (booking) => {
  return {
    to: booking.email,
    subject: 'Reminder: Your Cleaning is Tomorrow - Apex Pro Cleaners',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ffc107, #ff9800); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #1169a9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏰ Reminder: Tomorrow</h1>
            <p>Your cleaning service is scheduled for tomorrow</p>
          </div>
          <div class="content">
            <p>Hi ${booking.name},</p>
            <p>This is a friendly reminder that your cleaning service is scheduled for:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="font-size: 24px; font-weight: bold; color: #1169a9; margin: 10px 0;">
                ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p style="font-size: 20px; color: #F08A7F;">
                at ${booking.time}
              </p>
            </div>

            <p><strong>Please ensure:</strong></p>
            <ul>
              <li>Someone is available to provide access to the property</li>
              <li>Pets are secured or arrangements are made</li>
              <li>Any special instructions are communicated to our team</li>
            </ul>

            <div style="text-align: center;">
              <a href="${window.location.origin}/booking" class="button">View Booking Details</a>
            </div>

            <div class="footer">
              <p><strong>Apex Pro Cleaners</strong></p>
              <p>📞 (555) 123-4567 | ✉️ info@apexprocleaners.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
};

// In-app notification creator
export const createInAppNotification = (type, data) => {
  const notifications = {
    booking_confirmed: {
      id: `notif_${Date.now()}`,
      type: 'success',
      title: 'Booking Confirmed!',
      message: `Your ${data.service} is scheduled for ${new Date(data.date).toLocaleDateString()} at ${data.time}`,
      icon: '✅',
      timestamp: new Date().toISOString(),
      read: false,
    },
    booking_cancelled: {
      id: `notif_${Date.now()}`,
      type: 'warning',
      title: 'Booking Cancelled',
      message: `Your booking for ${new Date(data.date).toLocaleDateString()} has been cancelled`,
      icon: '❌',
      timestamp: new Date().toISOString(),
      read: false,
    },
    booking_reminder: {
      id: `notif_${Date.now()}`,
      type: 'info',
      title: 'Reminder: Tomorrow',
      message: `You have a ${data.service} scheduled for tomorrow at ${data.time}`,
      icon: '⏰',
      timestamp: new Date().toISOString(),
      read: false,
    },
  };

  return notifications[type] || null;
};

// Check and send reminders for upcoming bookings
export const checkAndSendReminders = (bookings) => {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tomorrowBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return (
      booking.status === 'confirmed' &&
      bookingDate.toDateString() === tomorrow.toDateString()
    );
  });

  return tomorrowBookings.map(booking => ({
    booking,
    email: generateBookingReminderEmail(booking),
    notification: createInAppNotification('booking_reminder', booking),
  }));
};

// SMS notification template (for future integration)
export const generateSMSTemplate = (type, data) => {
  const templates = {
    confirmation: `Hi ${data.name}! Your ${data.service} with Apex Pro Cleaners is confirmed for ${new Date(data.date).toLocaleDateString()} at ${data.time}. See you soon! 🧹`,
    reminder: `Reminder: You have a cleaning service tomorrow at ${data.time}. Apex Pro Cleaners 🧹`,
    cancellation: `Hi ${data.name}, your booking for ${new Date(data.date).toLocaleDateString()} has been cancelled. Contact us to rebook. Apex Pro Cleaners`,
  };

  return templates[type] || '';
};
