const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');




// Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });


Store.hasMany(Rating, { as: 'Ratings', foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });



User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Store, Rating };
