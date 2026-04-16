import express from 'express';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

function buildStoredMessage({ service, address, message }) {
  const sections = [];

  if (service) {
    sections.push(`Requested service: ${service}`);
  }

  if (address) {
    sections.push(`Service address: ${address}`);
  }

  if (message) {
    sections.push(`Details:\n${message}`);
  }

  return sections.join('\n\n');
}

router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const contacts = await req.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, address, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const storedMessage = buildStoredMessage({ service, address, message });

    const contact = await req.prisma.contact.create({
      data: { name, email, phone, message: storedMessage },
    });

    // Send notification email
    try {
      const settings = await req.prisma.settings.findMany();
      const settingsObj = {};
      settings.forEach(s => {
        if (s.key === 'emailEnabled') settingsObj[s.key] = s.value === 'true';
        else if (s.key === 'smtpPassword') settingsObj[s.key] = s.value;
        else settingsObj[s.key] = s.value;
      });
      
      const { sendContactEmail } = await import('../utils/email.js');
      await sendContactEmail(settingsObj, contact);
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError.message);
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await req.prisma.contact.delete({ where: { id } });
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
