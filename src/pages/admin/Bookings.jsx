import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { SERVICES, compareDateValues, displayBookingTime, formatDate, toDateKey } from '../../utils/booking';
import { FaSearch, FaEye, FaEdit, FaTrash, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import AdminPageHeader from '../../components/admin/AdminPageHeader';

const getCustomerName = (booking) => booking.customer?.name || 'Unknown customer';
const getCustomerEmail = (booking) => booking.customer?.email || 'No email';
const getCustomerPhone = (booking) => booking.customer?.phone || 'No phone';

const AdminBookings = () => {
  const { bookings, cancelBooking, updateBooking } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const filteredBookings = useMemo(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          getCustomerName(b).toLowerCase().includes(term) ||
          getCustomerEmail(b).toLowerCase().includes(term) ||
          getCustomerPhone(b).toLowerCase().includes(term) ||
          b.id.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((b) => b.status === filterStatus);
    }

    // Service filter
    if (filterService !== 'all') {
      filtered = filtered.filter((b) => b.service === filterService);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return compareDateValues(a.date, b.date);
        case 'date-desc':
          return compareDateValues(b.date, a.date);
        case 'name-asc':
          return getCustomerName(a).localeCompare(getCustomerName(b));
        case 'created-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [bookings, searchTerm, filterStatus, filterService, sortBy]);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      total: bookings.length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
      today: bookings.filter(
        (b) =>
          b.status === 'confirmed' &&
          toDateKey(b.date) === toDateKey(today)
      ).length,
    };
  }, [bookings]);

  const handleStatusChange = (bookingId, status) => {
    updateBooking({ id: bookingId, status });
    setShowStatusModal(null);
    setNewStatus('');
  };

  const handleDeleteBooking = (bookingId) => {
    cancelBooking(bookingId);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Scheduling"
        title="Bookings"
        description="Review the live schedule, adjust statuses, and monitor today’s booking pipeline from one consistent workspace."
        stats={[
          { label: 'Total', value: stats.total },
          { label: 'Confirmed', value: stats.confirmed },
          { label: 'Today', value: stats.today },
        ]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total</p>
          <p className="text-xl sm:text-2xl font-bold text-[#1169a9]">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Confirmed</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Cancelled</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.cancelled}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 col-span-2 sm:col-span-1">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Today</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.today}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <FaFilter className="text-gray-500" />
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Filters & Search</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name, email, phone, ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none"
            >
              <option value="all">All Services</option>
              {Object.entries(SERVICES).map(([key, service]) => (
                <option key={key} value={key}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none"
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="created-desc">Recently Created</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings - Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
            <FaCalendarAlt className="text-4xl mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No bookings found</p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const service = SERVICES[booking.service];
            return (
              <div key={booking.id} className="bg-white rounded-2xl shadow-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/admin/bookings/${booking.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <FaEye className="text-sm" />
                    </Link>
                    <button
                      onClick={() => { setSelectedBooking(booking); setNewStatus(booking.status); setShowStatusModal(booking.id); }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(booking.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
                <p className="font-medium text-gray-900 text-sm">{getCustomerName(booking)}</p>
                <p className="text-xs text-gray-500">{getCustomerEmail(booking)}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">{formatDate(booking.date)}</p>
                    <p className="text-xs text-gray-400">{service?.name || booking.service}</p>
                  </div>
                  {booking.price && <p className="font-bold text-[#1169a9]">${booking.price}</p>}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bookings Table - Desktop */}
      <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#1169a9] to-[#0f5a8f] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Booking</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Service</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <FaCalendarAlt className="text-4xl mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">No bookings found</p>
                    <p className="text-sm mt-2">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const service = SERVICES[booking.service];
                  return (
                    <tr
                      key={booking.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 text-sm">
                          {booking.id.split('_').slice(0, 2).join('_')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Created {formatDate(booking.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{getCustomerName(booking)}</p>
                          <p className="text-sm text-gray-500">{getCustomerEmail(booking)}</p>
                          <p className="text-xs text-gray-400">{getCustomerPhone(booking)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <p className="font-medium text-gray-900">{formatDate(booking.date)}</p>
                        <p className="text-sm text-gray-500">{displayBookingTime(booking.time)}</p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span>{service?.icon}</span>
                          <span className="text-sm text-gray-700">{service?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/bookings/${booking.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setNewStatus(booking.status);
                              setShowStatusModal(booking.id);
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Update Status"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(booking.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Update Booking Status</h3>
            <p className="text-sm text-gray-600 mb-4">
              Booking: {selectedBooking.id.split('_').slice(0, 2).join('_')}
            </p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#1169a9] outline-none"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowStatusModal(null);
                  setSelectedBooking(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(selectedBooking.id, newStatus)}
                className="flex-1 px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f]"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Booking?</h3>
              <p className="text-gray-600 mb-6">
                This will mark the booking as cancelled. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleDeleteBooking(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
