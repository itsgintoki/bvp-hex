const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();

const usdaRoutes = require('./routes/usda');

dotenv.config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/usda', usdaRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
