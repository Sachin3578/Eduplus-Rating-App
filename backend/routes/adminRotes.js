const express = require('express');
const { getDashboardCounts, addUser, addStore, getUsers, getStores } = require('../controllers/adminController');
const router = express.Router();

router.get('/dashboard-counts', getDashboardCounts);
router.post('/add-user', addUser);
router.post('/add-store', addStore);
router.get('/users', getUsers);
router.get('/stores', getStores);

module.exports = router;