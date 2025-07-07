// routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const {
  getStoresForUser,
  submitOrUpdateRating
} = require('../controllers/storeController');

const { protect } = require('../middleware/authMiddleware');
const { createStore } = require('../controllers/storeController');

// Routes for general users to rate and view stores
router.get('/', protect, getStoresForUser);
router.post('/rate', protect, submitOrUpdateRating);
router.post('/', protect, createStore);

module.exports = router;
