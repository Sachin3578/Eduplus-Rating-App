const User = require('../models/User');
const Store = require('../models/Store');
const Rating = require('../models/Rating');

exports.getDashboardCount = async (req, res) => {
    try{
        const totalCount = await User.count();
        const totalStore = await Store.count();
        const totalRating = await Rating.count();
        res.json({totalCount, totalStore, totalRating});
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.addUser = async (req, res) => {
    try{
        const {name, email, password, address, role} = req.body;
        const hashedPassword = await require('bcryptjs').hash(password, 10);
        const newUser = await User.create({name, email, address, password: hashedPassword, role});
        res.status(201).json({msg: 'User added successfully', user: newUser});
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const newStore = await Store.create({ name, email, address, ownerId });
    res.status(201).json({ msg: 'Store added successfully', store: newStore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const filters = req.query;
    const users = await User.findAll({ where: filters });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const filters = req.query;
    const stores = await Store.findAll({ where: filters });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};