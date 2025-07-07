const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models/associations');

const sequelize = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const storeOwnerRoutes = require('./routes/storOwnerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/stores', storeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeOwnerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

app.get('/', (req, res) => res.send({ msg: 'Server is running' }));

// DB connection
sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch((err) => console.error('DB connection failed:', err));

// Sync models
sequelize.sync({ alter: true })
  .then(() => console.log("Models synced with MySQL"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


