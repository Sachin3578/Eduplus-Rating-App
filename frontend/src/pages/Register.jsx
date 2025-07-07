import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import {
  Box, TextField, Button, Typography, Paper, MenuItem
} from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      alert('User Registered Successfully');
      navigate('/login');
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response?.data?.msg === 'User already exists'
      ) {
        alert('User already exists. Please login.');
      } else {
        alert(err.response?.data?.msg || 'Registration Failed');
      }
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="address"
          label="Address"
          value={form.address}
          onChange={handleChange}
          autoComplete="street-address"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <TextField
          select
          fullWidth
          margin="normal"
          name="role"
          label="Register As"
          value={form.role}
          onChange={handleChange}
          required
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="storeOwner">Store Owner</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleGoToLogin}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Register;
