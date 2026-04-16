import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  totalBookings: { type: Number, default: 1 },
  lastBooking: { type: Date, default: Date.now },
}, { timestamps: true });

export const Customer = mongoose.model('Customer', customerSchema);
