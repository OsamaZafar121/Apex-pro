import { useState, useMemo } from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, displayBookingTime, getBufferDates, isBusinessDay, formatDate } from '../utils/booking';
import { FaChevronLeft, FaChevronRight, FaCheck, FaTimes, FaHome, FaBuilding, FaMagic, FaBoxes, FaSoap, FaWindowMaximize, FaCalendarAlt, FaUser, FaMapMarker, FaClipboardCheck } from 'react-icons/fa';

const SERVICE_ICONS = {
  residential: FaHome,
  commercial: FaBuilding,
  deep: FaMagic,
  moveinout: FaBoxes,
  carpet: FaSoap,
  window: FaWindowMaximize,
};

const BookingEngine = () => {
  const bookingContext = useBooking();
  const bookings = bookingContext?.bookings || [];
  const { createBooking, isLoading, success, error, clearSuccess, clearError } = bookingContext;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [completedBooking, setCompletedBooking] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalPrice = selectedServices.reduce((sum, id) => sum + (SERVICES[id]?.price || 0), 0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startPadding = firstDay.getDay();
    for (let i = 0; i < startPadding; i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const isDateBlocked = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(b => {
      if (b.status !== 'confirmed') return false;
      const bufferDates = getBufferDates(b.date);
      return bufferDates.includes(dateStr);
    });
  };

  const isDatePast = (date) => {
    if (!date) return false;
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isDateBooked = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(b => b.status === 'confirmed' && b.date === dateStr);
  };

  const isBufferDate = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return bookings.some(b => {
      if (b.status !== 'confirmed') return false;
      const bufferDates = getBufferDates(b.date);
      return bufferDates.includes(dateStr);
    });
  };

  const isAvailable = (date) => {
    if (!date || !isBusinessDay(date) || isDatePast(date)) return false;
    return !isDateBooked(date) && !isBufferDate(date);
  };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinueToDate = () => {
    if (selectedServices.length === 0) return;
    setStep(2);
  };

  const handleDateSelect = (date) => {
    if (!date || !isBusinessDay(date) || isDatePast(date) || isDateBlocked(date)) return;
    setSelectedDate(date);
    setShowModal(true);
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.phone) errors.phone = 'Phone is required';
    if (!formData.address) errors.address = 'Address is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    clearError();
    const result = await createBooking({
      ...formData,
      service: selectedServices.join(','),
      date: selectedDate.toISOString().split('T')[0],
      time: 'TBD',
    });

    if (result.success) {
      setCompletedBooking(result.booking);
      setShowModal(false);
      setStep(4);
    }
  };

  const resetBooking = () => {
    setSelectedServices([]);
    setSelectedDate(null);
    setStep(1);
    setFormData({ name: '', email: '', phone: '', address: '', notes: '' });
    setFormErrors({});
    setCompletedBooking(null);
    clearSuccess();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const selectedServiceNames = selectedServices.map(id => SERVICES[id]?.name).filter(Boolean).join(', ');

  if (step === 4 && completedBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-4xl text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#1169a9] mb-4">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Thank you for your booking. We've sent a confirmation to your email.</p>

            <div className="bg-blue-50 rounded-2xl p-6 text-left mb-8">
              <h3 className="font-bold text-gray-800 mb-4">Booking Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Services:</span>
                  <span className="font-medium">{selectedServiceNames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(completedBooking.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduling:</span>
                  <span className="font-medium">{displayBookingTime(completedBooking.time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{completedBooking.customer?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{completedBooking.customer?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{completedBooking.customer?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium">{completedBooking.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-green-600">${completedBooking.price}</span>
                </div>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="px-8 py-3 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1169a9] mb-3">
            Book Your Cleaning
          </h1>
          <p className="text-lg text-gray-600">
            {step === 1 && 'Select one or more services to get started'}
            {step === 2 && 'Choose the service date that works best for you'}
            {step === 3 && 'Complete your details and we will confirm the arrival time after booking'}
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2">
            <FaCheck className="text-green-600" />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <FaTimes className="text-red-600" />
            {typeof error === 'string' ? error : error.general || 'An error occurred'}
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-[#1169a9] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <FaCheck /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 ${step > s ? 'bg-[#1169a9]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(SERVICES).map((service) => {
                const Icon = SERVICE_ICONS[service.id] || FaHome;
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl hover:transform hover:scale-105 ${
                      isSelected ? 'ring-4 ring-[#1169a9]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center relative">
                        <Icon className="text-2xl text-[#1169a9]" />
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.duration} min</p>
                      </div>
                      <div className="text-2xl font-bold text-[#1169a9]">${service.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedServices.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Selected: <span className="font-medium text-gray-800">{selectedServiceNames}</span></p>
                    <p className="text-2xl font-bold text-[#1169a9] mt-1">Total: ${totalPrice}</p>
                  </div>
                  <button
                    onClick={handleContinueToDate}
                    className="px-8 py-3 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="mb-4 p-3 bg-blue-50 rounded-xl text-sm text-gray-700">
              <strong>Selected Services:</strong> {selectedServiceNames} — <strong>Total: ${totalPrice}</strong>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button onClick={handleBack} className="text-[#1169a9] font-medium hover:underline">
                ← Back to Services
              </button>
              <div className="flex items-center gap-4">
                <button onClick={handlePrevMonth} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <FaChevronLeft className="text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={handleNextMonth} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <FaChevronRight className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((date, index) => {
                if (!date) return <div key={`empty-${index}`} className="h-14"></div>;

                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const isPast = isDatePast(date);
                const isBooked = isDateBooked(date);
                const available = isAvailable(date);
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === today.toDateString();

                let dayClass = 'h-14 rounded-2xl flex items-center justify-center font-medium transition-all cursor-pointer ';
                if (isSelected) dayClass += 'bg-[#1169a9] text-white shadow-lg';
                else if (isPast || isWeekend) dayClass += 'bg-gray-100 text-gray-400 cursor-not-allowed';
                else if (isBooked) dayClass += 'bg-red-100 text-red-700 cursor-not-allowed';
                else if (available) dayClass += 'bg-green-100 text-green-700 border-2 border-green-300 hover:border-green-500 hover:bg-green-200';
                else if (isToday) dayClass += 'bg-blue-50 text-[#1169a9] border-2 border-[#1169a9]';
                else dayClass += 'bg-white border-2 border-gray-100 text-gray-700 hover:border-[#1169a9]';

                return (
                  <div key={date.toISOString()} onClick={() => handleDateSelect(date)} className={dayClass}>
                    {date.getDate()}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                  <span className="text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100"></div>
                  <span className="text-gray-600">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-50 border-2 border-[#1169a9]"></div>
                  <span className="text-gray-600">Today</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Customer Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#1169a9] to-[#0f5a8f] px-6 py-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white">Complete Your Booking</h2>
              <div className="flex items-center gap-4 mt-2 text-blue-200 text-sm">
                <span>{selectedServiceNames}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><FaCalendarAlt /> {formatDate(selectedDate)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-10 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none ${
                        formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none ${
                      formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none ${
                      formErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <div className="relative">
                    <FaMapMarker className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full pl-10 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none ${
                        formErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="123 Main St, City"
                    />
                  </div>
                  {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1169a9] focus:border-transparent outline-none resize-none"
                  placeholder="Any special instructions, access codes, pet information..."
                ></textarea>
              </div>

              <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                <FaClipboardCheck className="text-green-600 text-xl" />
                <div>
                  <p className="font-medium text-green-800">Estimated Total: ${totalPrice}</p>
                  <p className="text-sm text-green-600">Arrival time will be confirmed after your booking is reviewed.</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setStep(2); }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingEngine;
