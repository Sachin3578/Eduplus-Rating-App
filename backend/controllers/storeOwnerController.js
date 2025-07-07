// controllers/storeOwnerController.js

const Store = require('../models/Store');
const Rating = require('../models/Rating');
const User = require('../models/User');
const { Sequelize } = require('sequelize');

// ✅ GET all stores for current store owner
exports.getStoreOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const stores = await Store.findAll({
      where: { ownerId: userId },
      include: [
        {
          model: Rating,
          as: "Ratings",
          include: [{ model: User, attributes: ['name', 'email'] }]
        }
      ]
    });

    const formatted = stores.map(store => {
      const ratings = store.Ratings || [];

      const avgRating =
        ratings.reduce((sum, r) => sum + r.value, 0) / (ratings.length || 1);

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        avgRating: +avgRating.toFixed(1),
        ratings: ratings.map(r => ({
          userName: r.User.name,
          userEmail: r.User.email,
          value: r.value
        }))
      };
    });

    res.status(200).json(formatted);
  } catch (error) {
    console.error('[Dashboard Error]', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// ✅ Create a new store
exports.createStore = async (req, res) => {
  try {
    const { name, address, email } = req.body;
    const ownerId = req.user.id;

    const newStore = await Store.create({ name, address, email, ownerId });

    res.status(201).json(newStore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create store' });
  }
};
