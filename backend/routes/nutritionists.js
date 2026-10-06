import express from 'express';
import nutritionistsData from '../data/nutritionists.json' with { type: 'json' };

const router = express.Router();

// GET all nutritionists
router.get('/', (req, res) => {
  try {
    const { specialty } = req.query;
    let result = [...nutritionistsData];

    if (specialty && specialty !== 'All') {
      result = result.filter(n => n.specialty.toLowerCase().includes(specialty.toLowerCase()));
    }

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving nutritionists', error: error.message });
  }
});

// GET nutritionist by ID
router.get('/:id', (req, res) => {
  const nutritionist = nutritionistsData.find(n => n.id === req.params.id);
  if (!nutritionist) {
    return res.status(404).json({ success: false, message: 'Nutritionist not found' });
  }
  res.json({ success: true, data: nutritionist });
});

export default router;
