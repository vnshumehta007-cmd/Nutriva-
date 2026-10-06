import express from 'express';
import testimonialsData from '../data/testimonials.json' with { type: 'json' };

const router = express.Router();

// Mock registered users
const users = [
  {
    id: "usr-1",
    name: "Alex Morgan",
    email: "alex@nutriva.health",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    membership: "Premium Tier",
    joinedDate: "January 2024"
  }
];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    // If not found, provide simulated seamless demo login for testing
    return res.json({
      success: true,
      message: 'Demo login successful',
      data: {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        membership: "Standard Tier",
        token: `nutriva_token_${Date.now()}`
      }
    });
  }

  res.json({
    success: true,
    message: 'Welcome back!',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      membership: user.membership,
      token: `nutriva_token_${user.id}`
    }
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password required' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    membership: "Standard Tier",
    joinedDate: new Date().toLocaleDateString()
  };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      membership: newUser.membership,
      token: `nutriva_token_${newUser.id}`
    }
  });
});

// GET /api/testimonials
router.get('/testimonials', (req, res) => {
  res.json({ success: true, count: testimonialsData.length, data: testimonialsData });
});

// POST /api/contact
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  res.json({
    success: true,
    message: `Thank you, ${name || 'there'}! Our clinical intake team has received your message and will respond within 24 hours.`
  });
});

export default router;
