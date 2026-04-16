import { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, TIME_SLOTS, isBusinessDay, isPastDate, formatDate, getBufferDates } from '../utils/booking';

const BookingForm = () => {
  const { createBooking, checkAvailability, getBookedSlots, isDateBlocked, isLoading, error, success, clearMessages } = useBooking();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset success message after 5 seconds
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        clearMessages();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, clearMessages]);

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date) {
      if (!isBusinessDay(formData.date)) {
        setErrors(prev => ({ ...prev, date: 'Please select a weekday (Mon-Fri)' }));
        setAvailableSlots([]);
        setFormData(prev => ({ ...prev, time: '' }));
        return;
      }

      if (isPastDate(formData.date)) {
        setErrors(prev => ({ ...prev, date: 'Please select a future date' }));
        setAvailableSlots([]);
        setFormData(prev => ({ ...prev, time: '' }));
        return;
      }

      // Check if date is blocked due to buffer period
      if (isDateBlocked(formData.date)) {
        setErrors(prev => ({ 
          ...prev, 
          date: 'This date is reserved as a buffer period. Please select another date.' 
        }));
        setAvailableSlots([]);
        setFormData(prev => ({ ...prev, time: '' }));
        return;
      }

      // Clear date error
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.date;
        return newErrors;
      });

      // Get booked slots for this date
      const bookedSlots = getBookedSlots(formData.date);
      
      // Check if all slots are booked (buffer day)
      if (bookedSlots.includes('ALL_SLOTS_BOOKED')) {
        setAvailableSlots([]);
        setErrors(prev => ({ ...prev, date: 'No available slots for this date' }));
        setFormData(prev => ({ ...prev, time: '' }));
        return;
      }
      
      const available = TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));
      setAvailableSlots(available);

      if (available.length === 0) {
        setErrors(prev => ({ ...prev, date: 'No available slots for this date' }));
        setFormData(prev => ({ ...prev, time: '' }));
      }
    } else {
      setAvailableSlots([]);
    }
  }, [formData.date, isDateBlocked, getBookedSlots]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Valid email is required';
      case 'phone':
        return value.trim() ? '' : 'Phone number is required';
      case 'service':
        return value ? '' : 'Service type is required';
      case 'date':
        return value ? '' : 'Date is required';
      case 'time':
        return value ? '' : 'Time slot is required';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit booking
    const result = await createBooking(formData);
    
    if (result.success) {
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
      setAvailableSlots([]);
    }
  };

  const selectedService = SERVICES[formData.service];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#1169a9] mb-2">Book Your Cleaning</h3>
        <p className="text-gray-600">Get 20% off your first cleaning!</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <div className="flex items-start">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <p className="text-green-800 font-semibold">Booking Confirmed!</p>
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (error.general || typeof error === 'string') && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
          <div className="flex items-start">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <p className="text-red-800 font-semibold">Booking Failed</p>
              <p className="text-red-700 text-sm">{error.general || error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a service</option>
            {Object.values(SERVICES).map(service => (
              <option key={service.id} value={service.id}>
                {service.icon} {service.name} - ${service.price} ({service.duration} min)
              </option>
            ))}
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
          {formData.date && isBusinessDay(formData.date) && !isPastDate(formData.date) && (
            <p className="mt-1 text-sm text-green-600">✓ {formatDate(formData.date)}</p>
          )}
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Time *
            {formData.date && (
              <span className="ml-2 text-xs text-gray-500">
                ({availableSlots.length} slots available)
              </span>
            )}
          </label>
          
          {formData.date && availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.time === slot
                      ? 'border-[#F08A7F] bg-[#F08A7F] text-white'
                      : 'border-gray-300 hover:border-[#F08A7F] bg-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : formData.date ? (
            <p className="text-sm text-gray-500 italic">
              {errors.date || 'Select a date to see available times'}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">Select a date first</p>
          )}
          
          {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08A7F] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tell us about your cleaning needs..."
          ></textarea>
        </div>

        {/* Summary */}
        {selectedService && formData.date && formData.time && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>📅 {formatDate(formData.date)}</p>
              <p>⏰ {formData.time}</p>
              <p>🧹 {selectedService.name}</p>
              <p>⏱️ Duration: {selectedService.duration} minutes</p>
              <p className="text-lg font-bold">💰 Total: ${selectedService.price}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#1169a9] to-[#F08A7F] text-white hover:from-[#0f5a8f] hover:to-[#e07868] hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Confirm Booking'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By booking, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
