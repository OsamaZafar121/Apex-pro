import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingRoutes from './server/src/routes/bookings.js';
import customerRoutes from './server/src/routes/customers.js';
import adminRoutes from './server/src/routes/admin.js';
import serviceRoutes from './server/src/routes/services.js';
import logRoutes from './server/src/routes/logs.js';
import settingsRoutes from './server/src/routes/settings.js';
import contactRoutes from './server/src/routes/contacts.js';

dotenv.config({ path: './server/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://osamamughal0072_db_user:wxIzitkh8wLb68nG@cluster0.odqbe2n.mongodb.net/';

app.use(cors());
app.use(express.json());

function transformDoc(doc) {
  if (!doc || typeof doc !== 'object') return doc;
  if (Array.isArray(doc)) return doc.map(transformDoc);
  const obj = { ...doc };
  if (obj._id) {
    obj.id = String(obj._id);
    delete obj._id;
  }
  if (obj.__v !== undefined) delete obj.__v;
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object' && obj[key]._id) {
      obj[key] = transformDoc(obj[key]);
    }
  });
  return obj;
}

app.use((req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = function (data) {
    return originalJson(transformDoc(data));
  };
  next();
});

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await mongoose.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down...');
  await mongoose.disconnect();
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
