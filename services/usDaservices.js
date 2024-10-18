const axios = require('axios');

// Get the USDA API Key from the environment variable
const API_KEY = process.env.USDA_API_KEY;

// Fetch food data from USDA API
const fetchFoodData = async (query) => {
  try {
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        api_key: API_KEY,
        query: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw error;
  }
};

module.exports = {
  fetchFoodData
};
