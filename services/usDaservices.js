const axios = require('axios');

// Get the USDA API Key from the environment variable
const API_KEY = process.env.USDA_API_KEY;

// Fetch food data from USDA API
const fetchFoodData = async (query) => {
  try {
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
      params: {
        api_key: API_KEY,
        query: query,
        pageSize: 1 // Limit to 5 results for example
      }
    });

    // Process and filter the data
    const processedFoods = response.data.foods.map(food => ({
      description: food.description,
      foodCategory: food.foodCategory || 'Unknown',
      ingredients: food.ingredients || 'Not listed',
      servingSize: food.servingSize ? `${food.servingSize} ${food.servingSizeUnit || ''}` : 'Not specified',
      keyNutrients: food.foodNutrients
        .filter(nutrient => ['Protein', 'Total lipid (fat)', 'Carbohydrate, by difference', 'Energy'].includes(nutrient.nutrientName))
        .map(nutrient => ({
          name: nutrient.nutrientName,
          amount: nutrient.value,
          unit: nutrient.unitName
        }))
    }));

    return processedFoods;
  } catch (error) {
    console.error('Error fetching food data:', error);
    throw error;
  }
};

module.exports = {
  fetchFoodData
};
