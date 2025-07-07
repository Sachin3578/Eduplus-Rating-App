import { useState, useContext } from 'react';
import {
  Box, TextField, Button, Typography, Paper
} from '@mui/material';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      // login(res.data); // Save user + token to context
      localStorage.setItem('user', JSON.stringify(res.data));
      const role = res.data.user.role;

      alert('Login Successful!');

      // Redirect based on role
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'storeOwner') navigate('/owner/dashboard');
      else navigate('/user/dashboard');

    } catch (err) {
      console.error('Login Error:', err);
      alert(err.response?.data?.msg || 'Login Failed');
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleGoToRegister}
        >
          Don&apos;t have an account? Register
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
