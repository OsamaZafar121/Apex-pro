import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, displayBookingTime, formatDate } from '../utils/booking';
import CalendarSyncModal from '../components/CalendarSyncModal';

const MyBookings = () => {
  const { bookings, cancelBooking } = useBooking();
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'confirmed') return booking.status === 'confirmed';
    if (filter === 'cancelled') return booking.status === 'cancelled';
    if (filter === 'upcoming') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return booking.status === 'confirmed' && bookingDate >= today;
    }
    if (filter === 'past') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return booking.status === 'confirmed' && bookingDate < today;
    }
    return true;
  });

  // Sort by date (most recent first)
  filteredBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setShowCancelConfirm(null);
  };

  const handleSyncCalendar = (booking) => {
    setSelectedBooking(booking);
    setShowSyncModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1169a9] mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-600">
            View and manage all your cleaning appointments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Total</p>
            <p className="text-3xl font-bold text-[#1169a9]">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Confirmed</p>
            <p className="text-3xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Upcoming</p>
            <p className="text-3xl font-bold text-blue-600">
              {bookings.filter(b => {
                const date = new Date(b.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return b.status === 'confirmed' && date >= today;
              }).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Cancelled</p>
            <p className="text-3xl font-bold text-red-600">
              {bookings.filter(b => b.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', icon: '📋' },
              { key: 'upcoming', label: 'Upcoming', icon: '📅' },
              { key: 'confirmed', label: 'Confirmed', icon: '✅' },
              { key: 'past', label: 'Past', icon: '⏰' },
              { key: 'cancelled', label: 'Cancelled', icon: '❌' },
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === filterOption.key
                    ? 'bg-[#1169a9] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.icon} {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'You haven\'t made any bookings yet'
                : `No ${filter} bookings`}
            </p>
            <a
              href="/booking"
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white rounded-lg font-semibold hover:from-[#0f5a8f] hover:to-[#e07868] transition-all shadow-lg"
            >
              Book Now
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => {
              const service = SERVICES[booking.service] || SERVICES.residential;
              const bookingDate = new Date(booking.date);
              const isPast = bookingDate < new Date();

              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${
                    booking.status === 'confirmed' ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-3xl">{service.icon}</span>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {service.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Booking ID: {booking.id.split('_').slice(0, 2).join('_')}
                                </p>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">📅</span>
                            <div>
                              <p className="text-xs text-gray-500">Date</p>
                              <p className="font-medium text-gray-900">
                                {formatDate(booking.date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">⏰</span>
                            <div>
                              <p className="text-xs text-gray-500">Time</p>
                              <p className="font-medium text-gray-900">{displayBookingTime(booking.time)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">💰</span>
                            <div>
                              <p className="text-xs text-gray-500">Price</p>
                              <p className="font-medium text-[#F08A7F]">${service.price}</p>
                            </div>
                          </div>
                        </div>

                        {booking.notes && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Notes</p>
                            <p className="text-sm text-gray-700">{booking.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {booking.status === 'confirmed' && !isPast && booking.time && booking.time !== 'TBD' && (
                        <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:ml-4">
                          <button
                            onClick={() => handleSyncCalendar(booking)}
                            className="flex-1 md:flex-none px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f] transition-colors text-sm font-medium"
                          >
                            📅 Sync Calendar
                          </button>
                          <button
                            onClick={() => setShowCancelConfirm(booking.id)}
                            className="flex-1 md:flex-none px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
              <div className="text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Booking?</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCancelConfirm(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={() => handleCancelBooking(showCancelConfirm)}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Sync Modal */}
        {showSyncModal && selectedBooking && (
          <CalendarSyncModal
            booking={selectedBooking}
            onClose={() => setShowSyncModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookings;
