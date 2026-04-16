import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { SERVICES, displayBookingTime, formatDate, toDateKey } from '../../utils/booking';
import { FaArrowLeft, FaEdit, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const getCustomerName = (booking) => booking.customer?.name || 'Unknown customer';
const getCustomerEmail = (booking) => booking.customer?.email || 'No email';
const getCustomerPhone = (booking) => booking.customer?.phone || 'No phone';

const AdminBookingDetail = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, updateBooking, cancelBooking } = useBooking();

  const booking = useMemo(() => {
    return bookings.find((b) => b.id === bookingId);
  }, [bookings, bookingId]);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [adminNote, setAdminNote] = useState('');
  const [adminNotes, setAdminNotes] = useState([]);

  if (!booking) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
        <Link
          to="/admin/bookings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f]"
        >
          <FaArrowLeft /> Back to Bookings
        </Link>
      </div>
    );
  }

  const service = SERVICES[booking.service];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateBooking({
        id: booking.id,
        ...editForm,
      });
    } else {
      setEditForm({
        date: booking.date,
        service: booking.service,
        notes: booking.notes || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleAddAdminNote = () => {
    if (adminNote.trim()) {
      const newNote = {
        id: `note_${Date.now()}`,
        text: adminNote,
        timestamp: new Date().toISOString(),
        author: 'Admin',
      };
      const updatedNotes = [...(booking.adminNotes || []), newNote];
      updateBooking({ id: booking.id, adminNotes: updatedNotes });
      setAdminNotes(updatedNotes);
      setAdminNote('');
    }
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = (booking.adminNotes || []).filter((n) => n.id !== noteId);
    updateBooking({ id: booking.id, adminNotes: updatedNotes });
    setAdminNotes(updatedNotes);
  };

  const handleStatusChange = (newStatus) => {
    updateBooking({ id: booking.id, status: newStatus });
  };

  const displayNotes = adminNotes.length > 0 ? adminNotes : booking.adminNotes || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/bookings')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-500">ID: {booking.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f]"
            >
              <FaEdit /> Edit Booking
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FaSave /> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Info Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#1169a9] to-[#0f5a8f] text-white">
              <h3 className="text-lg font-semibold">Booking Information</h3>
            </div>
            <div className="p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                      <select
                        value={editForm.service || ''}
                        onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                      >
                        {Object.entries(SERVICES).map(([key, svc]) => (
                          <option key={key} value={key}>
                            {svc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={editForm.date ? toDateKey(editForm.date) : ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer Notes</label>
                    <textarea
                      value={editForm.notes || ''}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1169a9] to-[#F08A7F] rounded-xl flex items-center justify-center text-3xl">
                      {service?.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{service?.name}</h4>
                      <p className="text-gray-500">{formatDate(booking.date)}</p>
                      <p className="text-sm text-gray-500">{displayBookingTime(booking.time)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                      <p className="font-medium text-gray-900">{getCustomerName(booking)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900">{getCustomerEmail(booking)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-900">{getCustomerPhone(booking)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Price</p>
                      <p className="font-medium text-[#F08A7F]">${service?.price || 0}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Customer Notes</p>
                      <p className="text-gray-700">{booking.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#F08A7F] to-[#e07868] text-white">
              <h3 className="text-lg font-semibold">Admin Notes</h3>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1169a9] outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddAdminNote()}
                />
                <button
                  onClick={handleAddAdminNote}
                  className="px-4 py-2 bg-[#1169a9] text-white rounded-lg hover:bg-[#0f5a8f] flex items-center gap-2"
                >
                  <FaPlus /> Add
                </button>
              </div>

              {displayNotes.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No admin notes yet</p>
              ) : (
                <div className="space-y-3">
                  {displayNotes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{note.text}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {note.author} • {formatDate(note.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('pending')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-50'
                }`}
              >
                ⏳ Pending
              </button>
              <button
                onClick={() => handleStatusChange('confirmed')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800 border-2 border-green-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                }`}
              >
                ✅ Confirmed
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  booking.status === 'completed'
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                }`}
              >
                🎉 Completed
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                  booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800 border-2 border-red-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                }`}
              >
                ❌ Cancelled
              </button>
            </div>

            {booking.status !== 'cancelled' && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel this booking?')) {
                    cancelBooking(booking.id);
                  }
                }}
                className="w-full mt-4 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Cancel This Booking
              </button>
            )}
          </div>

          {/* Timeline Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Booking Created</p>
                  <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                </div>
              </div>
              {booking.updatedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-xs text-gray-500">{formatDate(booking.updatedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/admin/bookings"
                className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                ← Back to Bookings
              </Link>
              <a
                href={`/admin/customers`}
                className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                👤 View Customer Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetail;
