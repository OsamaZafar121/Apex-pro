import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await req.prisma.admin.findUnique({
      where: { email },
    });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, admin.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      getJwtSecret(),
      { expiresIn: '24h' }
    );
    
    res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (error) {
    if (error.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({ error: 'Server authentication is not configured' });
    }

    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingAdmin = await req.prisma.admin.findUnique({
      where: { email },
    });
    
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await req.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    
    res.json({ message: 'Admin created', admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, getJwtSecret());
    
    const admin = await req.prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    res.json(admin);
  } catch (error) {
    if (error.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({ error: 'Server authentication is not configured' });
    }

    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
