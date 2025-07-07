import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import axios from '../api/axios';
import StatsCard from '../components/StatsCard';
import AddUserForm from '../components/AddUserForm';
import AddStoreForm from '../components/AddStoreForm';
import UserTable from '../components/UserTable';
import StoreTable from '../components/StoreTable';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  const fetchCounts = async () => {
    const res = await axios.get('/admin/dashboard-counts');
    setCounts(res.data);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>🧑‍💼 Admin Dashboard</Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <StatsCard label="Total Users" value={counts.totalUsers} />
        <StatsCard label="Total Stores" value={counts.totalStores} />
        <StatsCard label="Total Ratings" value={counts.totalRatings} />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><AddUserForm /></Grid>
        <Grid item xs={12} md={6}><AddStoreForm /></Grid>
      </Grid>

      <Box sx={{ mt: 4 }}><UserTable /></Box>
      <Box sx={{ mt: 4 }}><StoreTable /></Box>

      <Button onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/';
      }} variant="contained" color="error" sx={{ mt: 3 }}>Logout</Button>
    </Box>
  );
};

export default AdminDashboard;
