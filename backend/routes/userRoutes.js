const express = require('express');
const router = express.Router();
const { getStoresForUser, submitOrUpdateRating } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stores', protect, getStoresForUser);
router.post('/submit-rating', submitOrUpdateRating);

module.exports = router;
