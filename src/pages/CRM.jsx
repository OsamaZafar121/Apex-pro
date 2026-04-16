import { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, formatDate } from '../utils/booking';
import AdminPageHeader from '../components/admin/AdminPageHeader';

const CRM = () => {
  const { customers, bookings } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  // Enrich customers with booking data
  const enrichedCustomers = useMemo(() => {
    return customers.map(customer => {
      const customerBookings = bookings.filter(b => b.customerId === customer.id);
      const confirmedBookings = customerBookings.filter(b => b.status === 'confirmed');
      const cancelledBookings = customerBookings.filter(b => b.status === 'cancelled');
      const totalSpent = confirmedBookings.reduce((sum, booking) => {
        const service = SERVICES[booking.service];
        return sum + (service ? service.price : 0);
      }, 0);

      return {
        ...customer,
        totalBookings: confirmedBookings.length,
        cancelledBookings: cancelledBookings.length,
        totalSpent,
        lastBookingDate: confirmedBookings.length > 0 
          ? confirmedBookings.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
          : null,
        bookings: customerBookings,
      };
    });
  }, [customers, bookings]);

  // Filter and sort customers
  const filteredCustomers = useMemo(() => {
    let filtered = enrichedCustomers;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.includes(term)
      );
    }

    // Status filter
    if (filterStatus === 'active') {
      filtered = filtered.filter(c => c.totalBookings > 0);
    } else if (filterStatus === 'inactive') {
      filtered = filtered.filter(c => c.totalBookings === 0);
    } else if (filterStatus === 'high-value') {
      filtered = filtered.filter(c => c.totalSpent >= 500);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'bookings':
          return b.totalBookings - a.totalBookings;
        default:
          return 0;
      }
    });

    return filtered;
  }, [enrichedCustomers, searchTerm, sortBy, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const totalCustomers = enrichedCustomers.length;
    const activeCustomers = enrichedCustomers.filter(c => c.totalBookings > 0).length;
    const highValueCustomers = enrichedCustomers.filter(c => c.totalSpent >= 500).length;
    const totalRevenue = enrichedCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

    return {
      totalCustomers,
      activeCustomers,
      highValueCustomers,
      totalRevenue,
    };
  }, [enrichedCustomers]);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Relationships"
        title="Customers"
        description="Review customer value, booking history, and repeat activity in a CRM view that matches the rest of the admin dashboard."
        stats={[
          { label: 'Customers', value: stats.totalCustomers },
          { label: 'Active', value: stats.activeCustomers },
          { label: 'High Value', value: stats.highValueCustomers },
        ]}
      />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-[#1169a9]">{stats.totalCustomers}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeCustomers}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">High Value</p>
                <p className="text-3xl font-bold text-purple-600">{stats.highValueCustomers}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-[#F08A7F]">${stats.totalRevenue}</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08A7F] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08A7F] outline-none"
              >
                <option value="all">All Customers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
                <option value="high-value">High Value ($500+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08A7F] outline-none"
              >
                <option value="name">Name (A-Z)</option>
                <option value="recent">Most Recent</option>
                <option value="spent">Total Spent</option>
                <option value="bookings">Total Bookings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#1169a9] to-[#0f5a8f] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Bookings</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Total Spent</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Last Booking</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="text-6xl mb-4">🔍</div>
                      <p className="text-lg">No customers found</p>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => (
                    <tr
                      key={customer.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-500">
                              Customer since {formatDate(customer.createdAt).split(',')[1] || 'recently'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{customer.email}</p>
                          <p className="text-gray-500">{customer.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="space-y-1">
                          <p className="font-semibold text-green-600">{customer.totalBookings}</p>
                          {customer.cancelledBookings > 0 && (
                            <p className="text-xs text-red-600">
                              {customer.cancelledBookings} cancelled
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-[#F08A7F]">
                          ${customer.totalSpent}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {customer.lastBookingDate ? (
                          <span className="text-sm text-gray-700">
                            {formatDate(customer.lastBookingDate)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">No bookings</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewDetails(customer)}
                          className="px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f] transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Details Modal */}
        {showCustomerDetails && selectedCustomer && (
          <CustomerDetailsModal
            customer={selectedCustomer}
            onClose={() => setShowCustomerDetails(false)}
          />
        )}
    </div>
  );
};

// Customer Details Modal Component
const CustomerDetailsModal = ({ customer, onClose }) => {
  const { bookings } = useBooking();

  const customerBookings = bookings.filter(b => b.customerId === customer.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1169a9]">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Customer Info */}
          <div className="bg-gradient-to-r from-[#1169a9] to-[#F08A7F] rounded-xl p-6 text-white mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{customer.name}</h3>
                <p className="text-sm opacity-90">{customer.email}</p>
                <p className="text-sm opacity-90">{customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{customer.totalBookings}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{customer.cancelledBookings}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">${customer.totalSpent}</p>
            </div>
          </div>

          {/* Booking History */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Booking History</h4>
            {customerBookings.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {customerBookings
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(booking => {
                    const service = SERVICES[booking.service];
                    return (
                      <div
                        key={booking.id}
                        className={`border-l-4 p-4 rounded-lg ${
                          booking.status === 'confirmed'
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {service?.icon} {service?.name || booking.service}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(booking.date)} at {booking.time}
                            </p>
                            {booking.notes && (
                              <p className="text-sm text-gray-500 mt-2">
                                Notes: {booking.notes}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ${service?.price || 0}
                            </p>
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
