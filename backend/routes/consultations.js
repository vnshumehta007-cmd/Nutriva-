import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory store initialized with some demo sessions
let consultations = [
  {
    id: "con-1",
    clientName: "Alex Morgan",
    clientEmail: "alex.morgan@example.com",
    serviceName: "Personalized Diet",
    nutritionistName: "Dr. Elena Vance, PhD, RD",
    date: "2026-09-20",
    time: "10:00 AM",
    goal: "Weight Loss & Energy",
    dietaryRestrictions: "Gluten Free",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  },
  {
    id: "con-2",
    clientName: "Jordan Hayes",
    clientEmail: "jordan.hayes@example.com",
    serviceName: "Sports Nutrition & Performance",
    nutritionistName: "Marcus Sterling, MS, CSCS",
    date: "2026-09-24",
    time: "2:00 PM",
    goal: "Marathon Prep & Recovery",
    dietaryRestrictions: "None",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// GET all consultations
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: consultations.length,
    data: consultations
  });
});

// POST book consultation
router.post('/', (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      serviceName,
      nutritionistName,
      date,
      time,
      goal,
      dietaryRestrictions,
      notes
    } = req.body;

    if (!clientName || !clientEmail || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide client name, email, date, and time.'
      });
    }

    const newBooking = {
      id: `con-${uuidv4().substring(0, 8)}`,
      clientName,
      clientEmail,
      clientPhone: clientPhone || 'N/A',
      serviceName: serviceName || 'General Consultation',
      nutritionistName: nutritionistName || 'Next Available Expert',
      date,
      time,
      goal: goal || 'Overall Wellness',
      dietaryRestrictions: dietaryRestrictions || 'None',
      notes: notes || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    consultations.unshift(newBooking);

    res.status(201).json({
      success: true,
      message: 'Consultation successfully booked! Confirmation email has been dispatched.',
      data: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create booking', error: error.message });
  }
});

// DELETE cancel consultation
router.delete('/:id', (req, res) => {
  const index = consultations.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Consultation not found' });
  }
  const cancelled = consultations.splice(index, 1)[0];
  res.json({ success: true, message: 'Consultation cancelled', data: cancelled });
});

export default router;
