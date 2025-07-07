const Store = require('../models/Store');
const Rating = require('../models/Rating');
const User = require('../models/User');
const { Op, Sequelize } = require('sequelize');

// @desc    Get all stores with avg rating & current user's rating
// @route   GET /api/user/stores
// @access  Private
exports.getStoresForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const stores = await Store.findAll({
      include: [
        {
          model: Rating,
          as: 'Ratings', // must match Store.hasMany(Rating, { as: 'ratings' })
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("Ratings.value")), "rating"]
        ]
      },
      group: ['Store.id']
    });

    // Get the user's own ratings separately
    const userRatings = await Rating.findAll({ where: { userId } });

    const formatted = stores.map(store => {
      const userRating = userRatings.find(r => r.storeId === store.id);
      return {
        id: store.id,
        name: store.name,
        address: store.address,
        rating: store.dataValues.rating,
        userRating: userRating ? userRating.value : 0
      };
    });

    res.json(formatted);

  } catch (error) {
    console.error('[getStoresForUser]', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Submit or update rating
// @route   POST /api/user/rate
// @access  Private

exports.submitOrUpdateRating = async (req, res) => {
  try {
    const { storeId, value } = req.body;
    const userId = req.user?.id;

    console.log('Incoming Rating:', { storeId, value, userId });

    // Check all required fields
    if (!storeId || !value || !userId) {
      return res.status(400).json({ message: 'Missing required fields (storeId, value, or userId)' });
    }

    // Check if store exists (optional but recommended)
    const storeExists = await require('../models/Store').findByPk(storeId);
    if (!storeExists) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Check if rating already exists
    const existing = await Rating.findOne({ where: { storeId, userId } });

    if (existing) {
      existing.value = value;
      await existing.save();
      console.log('✅ Rating updated:', existing.toJSON());
      return res.status(200).json({ msg: 'Rating updated successfully' });
    }

    // Create new rating
    const newRating = await Rating.create({ storeId, userId, value });
    console.log('✅ New Rating submitted:', newRating.toJSON());
    res.status(201).json({ msg: 'Rating submitted successfully' });

  } catch (err) {
    console.error('❌ [submitOrUpdateRating]', err);
    res.status(500).json({ message: 'Rating submission failed', error: err.message });
  }
};
