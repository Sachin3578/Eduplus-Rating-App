// src/pages/Landing.jsx
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={{ mt: 8, p: 6, textAlign: "center", maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>Welcome to EduPlus Rating App</Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>Rate local stores or view your feedback as a store owner.</Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate("/login")}>Login</Button>
        <Button variant="outlined" onClick={() => navigate("/register")}>Register</Button>
      </Box>
    </Paper>
  );
};

export default Landing;
