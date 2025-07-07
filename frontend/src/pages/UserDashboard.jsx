import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import axios from '../api/axios';
import StoreCard from '../components/StoreCard';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all stores available for user to rate
  const fetchStores = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const res = await axios.get('/user/stores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStores(res.data);
    } catch (err) {
      console.error('Failed to load stores:', err);
      alert('Error loading stores');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit or update rating
  const submitRating = async (storeId, ratingValue) => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const res = await axios.post(
        '/stores/rate',
        { storeId, value: ratingValue },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.msg || 'Rating submitted');
      fetchStores(); // refresh ratings
    } catch (err) {
      console.error('❌ Rating error:', err.response?.data || err.message);
      alert(err.response?.data?.message || '❌ Failed to submit rating');
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(filter.toLowerCase()) ||
    store.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>🏪 Browse & Rate Stores</Typography>

      <TextField
        fullWidth
        label="Search by name or address"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredStores.length > 0 ? (
            filteredStores.map(store => (
              <Grid item xs={12} md={4} key={store.id}>
                <StoreCard store={store} refresh={fetchStores} onRate={submitRating} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ m: 2 }}>No stores found.</Typography>
          )}
        </Grid>
      )}

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

export default UserDashboard;
