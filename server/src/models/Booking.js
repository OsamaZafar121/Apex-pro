import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: 'TBD' },
  status: { type: String, default: 'confirmed' },
  notes: { type: String },
  price: { type: Number },
  address: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);
