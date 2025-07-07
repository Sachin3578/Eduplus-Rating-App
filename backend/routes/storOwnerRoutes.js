const express = require('express');
const router = express.Router();
const {
  getStoreOwnerDashboard,
  createStore,
} = require('../controllers/storeOwnerController');
const { protect } = require('../middleware/authMiddleware');
const storeOwnerController = require('../controllers/storeOwnerController');

// ✅ Routes
// router.get('/dashboard', protect, getStoreOwnerDashboard);
router.post('/add-store', protect, createStore);
router.get('/dashboard', protect, storeOwnerController.getStoreOwnerDashboard);

module.exports = router;
