// Server-side logging route for client logs
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOG_FILE = path.join(__dirname, '../../logs.txt');

// Ensure log file exists
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '', 'utf-8');
}

router.post('/', (req, res) => {
  try {
    const { logs } = req.body;

    if (!logs || !Array.isArray(logs)) {
      return res.status(400).json({ error: 'Invalid log data' });
    }

    // Format and write logs to file
    const logEntries = logs.map(log => {
      const timestamp = log.timestamp || new Date().toISOString();
      const level = log.level || 'INFO';
      const message = log.message || '';
      const data = log.data ? ` | Data: ${log.data}` : '';
      const meta = log.url ? ` | URL: ${log.url}` : '';
      return `[${timestamp}] ${level}: ${message}${data}${meta}`;
    });

    fs.appendFileSync(LOG_FILE, logEntries.join('\n') + '\n', 'utf-8');

    // Also log to console in development
    if (process.env.NODE_ENV !== 'production') {
      logEntries.forEach(entry => console.log(entry));
    }

    res.json({ success: true, count: logs.length });
  } catch (error) {
    console.error('Failed to write logs:', error);
    res.status(500).json({ error: 'Failed to write logs' });
  }
});

export default router;
