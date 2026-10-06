import express from 'express';
import servicesData from '../data/services.json' with { type: 'json' };

const router = express.Router();

// GET all services with search & filters
router.get('/', (req, res) => {
  try {
    let result = [...servicesData];
    const { goal, condition, ageGroup, maxPrice, search } = req.query;

    if (goal && goal !== 'All') {
      result = result.filter(s => s.goal.toLowerCase() === goal.toLowerCase());
    }

    if (condition && condition !== 'All') {
      result = result.filter(s => s.condition.toLowerCase().includes(condition.toLowerCase()));
    }

    if (ageGroup && ageGroup !== 'All') {
      result = result.filter(s => s.ageGroup.toLowerCase().includes(ageGroup.toLowerCase()) || s.ageGroup === 'All Ages');
    }

    if (maxPrice) {
      result = result.filter(s => s.price <= Number(maxPrice));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving services', error: error.message });
  }
});

// GET service by ID
router.get('/:id', (req, res) => {
  const service = servicesData.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

export default router;
