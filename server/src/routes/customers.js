import express from 'express';
import { requireAdminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAdminAuth, async (req, res) => {
  try {
    const customers = await req.prisma.customer.findMany({
      include: {
        bookings: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await req.prisma.customer.findUnique({
      where: { id },
      include: { bookings: true },
    });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    const customer = await req.prisma.customer.update({
      where: { id },
      data: { name, email, phone },
    });
    
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await req.prisma.customer.delete({
      where: { id },
    });
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
