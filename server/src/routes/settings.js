import express from 'express';
import { requireAdminAuth } from '../middleware/auth.js';
import { Settings } from '../models/Settings.js';
import { Contact } from '../models/Contact.js';

const router = express.Router();
const PASSWORD_MASK = '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022';

const DEFAULT_SETTINGS = {
  emailEnabled: false,
  smtpHost: 'smtp.gmail.com',
  smtpPort: '587',
  smtpEmail: '',
  smtpPassword: '',
  notificationEmail: '',
  showPrices: true,
  bufferDays: 1,
};

let settingsCache = { ...DEFAULT_SETTINGS };

function normalizeSettingValue(key, value) {
  if (key === 'emailEnabled' || key === 'showPrices') {
    return value === 'true';
  }

  if (key === 'bufferDays') {
    return parseInt(value, 10) || DEFAULT_SETTINGS.bufferDays;
  }

  return value;
}

router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};

    settings.forEach((setting) => {
      settingsObj[setting.key] = normalizeSettingValue(setting.key, setting.value);
    });

    res.json({
      ...DEFAULT_SETTINGS,
      ...settingsObj,
      smtpPassword: settingsObj.smtpPassword ? PASSWORD_MASK : '',
    });
  } catch {
    res.json(DEFAULT_SETTINGS);
  }
});

router.put('/', requireAdminAuth, async (req, res) => {
  try {
    const updates = req.body;
    const keys = ['emailEnabled', 'smtpHost', 'smtpPort', 'smtpEmail', 'smtpPassword', 'notificationEmail', 'showPrices', 'bufferDays'];

    for (const key of keys) {
      if (updates[key] === undefined) {
        continue;
      }

      if (key === 'smtpPassword' && updates[key] === PASSWORD_MASK) {
        continue;
      }

      let value = updates[key];
      if (key === 'bufferDays') {
        value = parseInt(value, 10) || DEFAULT_SETTINGS.bufferDays;
      }
      if (key === 'emailEnabled' || key === 'showPrices') {
        value = value ? 'true' : 'false';
      }

      await Settings.findOneAndUpdate(
        { key },
        { value: String(value) },
        { upsert: true, new: true }
      );
    }

    keys.forEach((key) => {
      if (updates[key] === undefined) {
        return;
      }

      if (key === 'smtpPassword' && updates[key] === PASSWORD_MASK) {
        return;
      }

      if (key === 'bufferDays') {
        settingsCache[key] = parseInt(updates[key], 10) || DEFAULT_SETTINGS.bufferDays;
        return;
      }

      if (key === 'emailEnabled' || key === 'showPrices') {
        settingsCache[key] = !!updates[key];
        return;
      }

      settingsCache[key] = updates[key];
    });

    res.json({ message: 'Settings saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/email', requireAdminAuth, async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsObj = {};

    settings.forEach((setting) => {
      if (setting.key === 'smtpPassword') {
        settingsObj[setting.key] = setting.value && setting.value !== PASSWORD_MASK ? setting.value : '';
        return;
      }

      settingsObj[setting.key] = normalizeSettingValue(setting.key, setting.value);
    });

    res.json(settingsObj);
  } catch {
    res.json(DEFAULT_SETTINGS);
  }
});

export default router;
