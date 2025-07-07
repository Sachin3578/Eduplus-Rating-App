import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from '../api/axios';

const AddStoreForm = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerId: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/add-store', form);
      alert('Store Added');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to Add Store');
    }
  };

  return (
    <Box>
      <Typography variant="h6">🏪 Add New Store</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth name="name" label="Store Name" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="email" label="Email" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="address" label="Address" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="ownerId" label="Owner ID" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Add Store</Button>
      </form>
    </Box>
  );
};

export default AddStoreForm;
