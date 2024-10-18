const express = require('express');
const { fetchFoodData } = require('../services/usDaservices');

const router = express.Router();

// Route to fetch food data from USDA API
router.get('/food', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ msg: 'Query is required' });
  }

  try {
    const data = await fetchFoodData(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching food data' });
  }
});

module.exports = router;
