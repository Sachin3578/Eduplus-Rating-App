const Store = require('../models/Store');
const Rating = require('../models/Rating');
const User = require('../models/User');
const { Sequelize } = require('sequelize');

exports.getStoresForUser = async (req, res) => {
  const userId = req.user.id;

  const stores = await Store.findAll({
    include: [
      {
        model: Rating,
        as: 'ratings',
        attributes: []
      },
      {
        model: Rating,
        as: 'userRatings',
        where: { userId },
        required: false
      }
    ],
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("ratings.value")), "rating"]
      ]
    },
    group: ['Store.id', 'userRatings.id']
  });

  const formatted = stores.map(s => ({
    id: s.id,
    name: s.name,
    address: s.address,
    rating: s.dataValues.rating,
    userRating: s.userRatings?.[0]?.value || 0
  }));

  res.json(formatted);
};

exports.submitOrUpdateRating = async (req, res) => {
  const { storeId, value } = req.body;
  const userId = req.user.id;

  const existing = await Rating.findOne({ where: { storeId, userId } });
  if (existing) {
    existing.value = value;
    await existing.save();
    return res.json({ msg: 'Rating updated' });
  }

  await Rating.create({ storeId, userId, value });
  res.json({ msg: 'Rating submitted' });
};

exports.getStoreOwnerDashboard = async (req, res) => {
  const userId = req.user.id;

  const store = await Store.findOne({ where: { ownerId: userId } });

  if (!store) return res.status(404).json({ message: 'No store found for this user' });

  const ratings = await Rating.findAll({
    where: { storeId: store.id },
    include: [{ model: User, attributes: ['name', 'email'] }]
  });

  const avgRating = ratings.reduce((acc, r) => acc + r.value, 0) / (ratings.length || 1);

  const formattedRatings = ratings.map(r => ({
    userName: r.User.name,
    userEmail: r.User.email,
    value: r.value
  }));

  res.json({
    id: store.id,
    name: store.name,
    avgRating,
    ratings: formattedRatings
  });
};

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