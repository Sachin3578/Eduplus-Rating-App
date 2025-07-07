import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Paper,
  CircularProgress
} from '@mui/material';
import axios from '../api/axios';
import RatingList from '../components/RatingList';

const StoreOwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({ name: '', address: '', email: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      if (!token) {
        alert("❌ You are not logged in");
        return;
      }

      const res = await axios.get('/store-owner/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      let data = res.data;

      // Ensure always an array
      if (!Array.isArray(data)) data = [data];

      // Format safely
      const formatted = data.map((store) => ({
        ...store,
        avgRating: typeof store.avgRating === 'number' && !isNaN(store.avgRating)
          ? store.avgRating
          : null,
        ratings: Array.isArray(store.ratings) ? store.ratings : [],
      }));

      // Sort alphabetically
      formatted.sort((a, b) => a.name.localeCompare(b.name));

      setStores(formatted);
    } catch (err) {
      console.error('❌ Failed to load store data:', err?.response?.data || err.message);
      alert('Failed to load store data');
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStore = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      await axios.post('/stores', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('✅ Store created successfully!');
      setFormData({ name: '', address: '', email: '' });
      setShowAddForm(false);
      fetchStores();
    } catch (err) {
      alert(err?.response?.data?.msg || '❌ Failed to create store');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>🏬 Store Owner Dashboard</Typography>
      <Divider sx={{ my: 2 }} />

      {/* Add Store Form */}
      {showAddForm ? (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">➕ Add New Store</Typography>
          <TextField
            fullWidth
            label="Store Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={handleCreateStore}>Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </Box>
        </Box>
      ) : (
        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Store
        </Button>
      )}

      <Divider sx={{ my: 4 }} />

      {/* Store List */}
      <Typography variant="h5" gutterBottom>📋 Your Existing Stores</Typography>
      {loading ? (
        <CircularProgress />
      ) : stores.length > 0 ? (
        stores.map((store) => (
          <Paper
            key={store.id}
            sx={{
              mb: 4,
              p: 2,
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
            elevation={2}
          >
            <Typography variant="h6">📌 {store.name}</Typography>
            <Typography variant="body2">📧 {store.email}</Typography>
            <Typography variant="body2">📍 {store.address}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              ⭐ Avg. Rating:{' '}
              {typeof store.avgRating === 'number'
                ? store.avgRating.toFixed(1)
                : 'N/A'}
            </Typography>
            {store.ratings.length > 0 ? (
              <RatingList ratings={store.ratings} />
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>No ratings yet.</Typography>
            )}
          </Paper>
        ))
      ) : (
        <Typography>No stores found. Add your first store above.</Typography>
      )}

      {/* Logout */}
      <Button
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/';
        }}
        variant="contained"
        color="error"
        sx={{ mt: 4 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default StoreOwnerDashboard;
