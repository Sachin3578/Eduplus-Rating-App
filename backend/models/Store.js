const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const User = require('./User'); 

const Store = sequelize.define('Store', {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  email: DataTypes.STRING,
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

module.exports = Store;
