import express from 'express';

const router = express.Router();

// POST Calculate Macros and Daily Calorie Targets
router.post('/macro', (req, res) => {
  try {
    const {
      gender = 'female',
      age = 30,
      weightKg = 65,
      heightCm = 170,
      activityLevel = 'moderate', // sedentary, light, moderate, active, very_active
      goal = 'maintain', // lose, maintain, gain, endurance, longevity
      dietType = 'balanced' // balanced, keto, high_protein, plant_based, low_carb
    } = req.body;

    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    const a = parseInt(age, 10);

    // Mifflin-St Jeor Equation for BMR
    let bmr = 10 * w + 6.25 * h - 5 * a;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity Multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    const multiplier = activityMultipliers[activityLevel] || 1.55;
    const tdee = Math.round(bmr * multiplier);

    // Goal Calorie Target Adjustment
    let targetCalories = tdee;
    if (goal === 'lose') {
      targetCalories = Math.round(tdee * 0.8); // 20% deficit
    } else if (goal === 'gain') {
      targetCalories = Math.round(tdee * 1.15); // 15% surplus
    } else if (goal === 'endurance') {
      targetCalories = Math.round(tdee * 1.05);
    } else if (goal === 'longevity') {
      targetCalories = Math.round(tdee * 0.9); // slight caloric restriction
    }

    // Macro distributions (percentage of total calories)
    let proteinPct = 0.25;
    let carbsPct = 0.50;
    let fatPct = 0.25;

    if (dietType === 'high_protein') {
      proteinPct = 0.35;
      carbsPct = 0.35;
      fatPct = 0.30;
    } else if (dietType === 'keto') {
      proteinPct = 0.20;
      carbsPct = 0.05;
      fatPct = 0.75;
    } else if (dietType === 'low_carb') {
      proteinPct = 0.30;
      carbsPct = 0.25;
      fatPct = 0.45;
    } else if (dietType === 'plant_based') {
      proteinPct = 0.20;
      carbsPct = 0.55;
      fatPct = 0.25;
    }

    // Protein: 4 cal/g, Carbs: 4 cal/g, Fat: 9 cal/g
    const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
    const carbsGrams = Math.round((targetCalories * carbsPct) / 4);
    const fatGrams = Math.round((targetCalories * fatPct) / 9);

    // BMI Calculation
    const heightM = h / 100;
    const bmi = (w / (heightM * heightM)).toFixed(1);

    let bmiCategory = 'Normal weight';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';

    // Daily Water recommendation (liters)
    const waterLiters = (w * 0.035).toFixed(1);

    res.json({
      success: true,
      data: {
        bmr: Math.round(bmr),
        tdee,
        targetCalories,
        bmi,
        bmiCategory,
        waterLiters,
        macros: {
          protein: { grams: proteinGrams, calories: proteinGrams * 4, percentage: Math.round(proteinPct * 100) },
          carbs: { grams: carbsGrams, calories: carbsGrams * 4, percentage: Math.round(carbsPct * 100) },
          fat: { grams: fatGrams, calories: fatGrams * 9, percentage: Math.round(fatPct * 100) }
        },
        recommendation: goal === 'lose'
          ? "Targeting a steady, sustainable 0.5kg/week fat reduction with muscle preservation."
          : goal === 'gain'
          ? "Promoting lean muscle hypertrophy with adequate amino acid delivery."
          : "Optimizing mitochondrial function, metabolic flexibility, and daily stamina."
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Calculation failed', error: error.message });
  }
});

export default router;
