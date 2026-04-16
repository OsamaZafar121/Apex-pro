import nodemailer from 'nodemailer';
import { getServiceDefinition } from '../../../shared/services.js';

async function sendBookingEmail(settings, booking) {
  if (!settings.emailEnabled || !settings.smtpEmail || !settings.smtpPassword) {
    console.log('Email sending skipped: SMTP not configured');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost || 'smtp.gmail.com',
    port: parseInt(settings.smtpPort, 10) || 587,
    secure: false,
    auth: {
      user: settings.smtpEmail,
      pass: settings.smtpPassword,
    },
  });

  const serviceName = getServiceDefinition(booking.service).name || booking.service;
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mailOptions = {
    from: settings.smtpEmail,
    to: booking.customer?.email,
    cc: settings.notificationEmail,
    subject: `Booking Confirmed - ${serviceName} on ${formattedDate}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1169a9, #0f5a8f); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <p>Hi ${booking.customer?.name},</p>
          <p>Your cleaning service has been booked successfully. Here are your booking details:</p>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #666;">Service</td>
                <td style="padding: 10px 0; font-weight: bold;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-top: 1px solid #eee; color: #666;">Date</td>
                <td style="padding: 10px 0; border-top: 1px solid #eee; font-weight: bold;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-top: 1px solid #eee; color: #666;">Time</td>
                <td style="padding: 10px 0; border-top: 1px solid #eee; font-weight: bold;">${booking.time}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-top: 1px solid #eee; color: #666;">Address</td>
                <td style="padding: 10px 0; border-top: 1px solid #eee; font-weight: bold;">${booking.address || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-top: 1px solid #eee; color: #666;">Bedrooms/Bathrooms</td>
                <td style="padding: 10px 0; border-top: 1px solid #eee; font-weight: bold;">${booking.bedrooms || '-'} / ${booking.bathrooms || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-top: 1px solid #eee; color: #666;">Price</td>
                <td style="padding: 10px 0; border-top: 1px solid #eee; font-weight: bold; font-size: 18px; color: #1169a9;">$${booking.price}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Need to make changes? Reply to this email or call us at (555) 123-4567.
          </p>
        </div>
        
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: white; margin: 0;">Apex Pro Cleaners</p>
          <p style="color: #999; font-size: 12px; margin: 5px 0 0;">Professional Cleaning Services</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${booking.customer?.email}`);
  } catch (error) {
    console.error('Failed to send booking email:', error.message);
  }
}

async function sendContactEmail(settings, contact) {
  if (!settings.emailEnabled || !settings.smtpEmail || !settings.smtpPassword) {
    console.log('Email sending skipped: SMTP not configured');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtpHost || 'smtp.gmail.com',
    port: parseInt(settings.smtpPort, 10) || 587,
    secure: false,
    auth: {
      user: settings.smtpEmail,
      pass: settings.smtpPassword,
    },
  });

  const mailOptions = {
    from: settings.smtpEmail,
    to: settings.notificationEmail,
    subject: `New Contact Form - ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1169a9; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Contact Form</h1>
        </div>
        
        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #1169a9;">${contact.name}</h2>
          <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
          ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <h3 style="color: #333;">Message:</h3>
          <p style="background: white; padding: 15px; border-radius: 5px;">${contact.message}</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Contact notification email sent to ${settings.notificationEmail}`);
  } catch (error) {
    console.error('Failed to send contact email:', error.message);
  }
}

export { sendBookingEmail, sendContactEmail };
