import { useState } from 'react';
import { getCalendarSyncOptions, exportAllBookingsICS } from '../utils/calendarSync';
import { useBooking } from '../context/BookingContext';

const CalendarSyncModal = ({ booking, onClose }) => {
  const { bookings } = useBooking();
  const syncOptions = getCalendarSyncOptions(booking);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.origin + '/booking';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportAll = () => {
    exportAllBookingsICS(bookings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1169a9]">Add to Calendar</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Booking Info */}
        <div className="mb-6 p-4 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] rounded-lg text-white">
          <p className="font-semibold text-lg">{booking.service}</p>
          <p className="text-sm opacity-90">
            {new Date(booking.date).toLocaleDateString()} at {booking.time}
          </p>
        </div>

        {/* Calendar Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {syncOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1169a9] hover:shadow-md transition-all"
              style={{ borderColor: option.color }}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-sm font-medium text-gray-900">{option.name}</span>
            </button>
          ))}
        </div>

        {/* Share Link */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Booking Page
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={window.location.origin + '/booking'}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f] transition-colors text-sm font-medium"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Export All */}
        <button
          onClick={handleExportAll}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#1169a9] hover:bg-gray-50 transition-all text-sm font-medium text-gray-700"
        >
          📥 Export All Bookings as ICS
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Calendar events include a 24-hour reminder
        </p>
      </div>
    </div>
  );
};

export default CalendarSyncModal;
