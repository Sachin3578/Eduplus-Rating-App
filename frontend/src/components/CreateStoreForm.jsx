// src/components/CreateStoreForm.jsx
import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from '../api/axios';

const CreateStoreForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData?.token;

      if (!token) {
        alert('Unauthorized: Please log in again');
        return;
      }

      const res = await axios.post('/store-owner/add-store', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Store created successfully');
      onSuccess(); // Refresh dashboard
    } catch (err) {
      console.error('Error adding store:', err.response?.data || err.message);
      alert(err?.response?.data?.msg || 'Error adding store');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Add Your Store</Typography>
      <TextField
        label="Store Name"
        name="name"
        fullWidth
        required
        margin="normal"
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        label="Address"
        name="address"
        fullWidth
        required
        margin="normal"
        value={form.address}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        required
        margin="normal"
        value={form.email}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Store
      </Button>
    </Box>
  );
};

export default CreateStoreForm;
