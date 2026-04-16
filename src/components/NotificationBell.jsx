import { useState, useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import { formatDate } from '../utils/booking';

const getCustomerName = (booking) => booking.customer?.name || 'Unknown customer';

const NotificationBell = () => {
  const { bookings, customers } = useBooking();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Generate notifications based on bookings
  useEffect(() => {
    const generatedNotifications = [];

    // Recent bookings (last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentBookings = bookings.filter(
      b => new Date(b.createdAt) > oneDayAgo && b.status === 'confirmed'
    );

    recentBookings.forEach(booking => {
      generatedNotifications.push({
        id: booking.id,
        type: 'booking',
        icon: '✅',
        title: 'New Booking Confirmed',
        message: `${getCustomerName(booking)} - ${booking.service} on ${formatDate(booking.date)}`,
        time: booking.createdAt,
        read: false,
      });
    });

    // Upcoming bookings (tomorrow)
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const tomorrowBookings = bookings.filter(b => {
      const bookingDate = new Date(b.date);
      return (
        bookingDate.toDateString() === tomorrow.toDateString() &&
        b.status === 'confirmed'
      );
    });

    tomorrowBookings.forEach(booking => {
      generatedNotifications.push({
        id: `reminder_${booking.id}`,
        type: 'reminder',
        icon: '⏰',
        title: 'Reminder: Tomorrow',
        message: `${getCustomerName(booking)} - ${booking.service} at ${booking.time}`,
        time: new Date().toISOString(),
        read: false,
      });
    });

    // Cancelled bookings (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const cancelledBookings = bookings.filter(
      b => new Date(b.createdAt) > sevenDaysAgo && b.status === 'cancelled'
    );

    cancelledBookings.forEach(booking => {
      generatedNotifications.push({
        id: `cancelled_${booking.id}`,
        type: 'cancelled',
        icon: '❌',
        title: 'Booking Cancelled',
        message: `${getCustomerName(booking)} - ${booking.service} on ${formatDate(booking.date)}`,
        time: booking.createdAt,
        read: false,
      });
    });

    // Sort by time (most recent first)
    generatedNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));

    setNotifications(generatedNotifications);
    setUnreadCount(generatedNotifications.filter(n => !n.read).length);
  }, [bookings, customers]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    setIsOpen(false);
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-green-50 border-green-200';
      case 'reminder':
        return 'bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-[#1169a9] transition-colors"
        aria-label="Notifications"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-fade-in">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#1169a9] hover:text-[#0f5a8f] font-medium"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-5xl mb-4">🔔</div>
                <p className="text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`px-6 py-4 border-b border-gray-100 cursor-pointer transition-all hover:shadow-md ${getNotificationColor(
                    notification.type
                  )} ${!notification.read ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{notification.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#1169a9] rounded-full flex-shrink-0 mt-1"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-[#1169a9] hover:text-[#0f5a8f] font-medium"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
