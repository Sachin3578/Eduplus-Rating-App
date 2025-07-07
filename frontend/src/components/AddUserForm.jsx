import { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import axios from '../api/axios';

const AddUserForm = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'user' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/add-user', form);
      alert('User Added');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert('Failed to Add User');
    }
  };

  return (
    <Box>
      <Typography variant="h6">➕ Add New User</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth name="name" label="Name" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="email" label="Email" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="address" label="Address" margin="normal" onChange={handleChange} />
        <TextField fullWidth name="password" label="Password" margin="normal" onChange={handleChange} />
        <TextField select fullWidth name="role" label="Role" margin="normal" value={form.role} onChange={handleChange}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="store_owner">Store Owner</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Add User</Button>
      </form>
    </Box>
  );
};

export default AddUserForm;
