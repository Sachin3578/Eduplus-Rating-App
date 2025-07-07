import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel
} from '@mui/material';
import axios from '../api/axios';

const StoreTable = () => {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  const fetchStores = async () => {
    try {
      const res = await axios.get('/admin/stores');
      setStores(res.data);
    } catch (err) {
      console.error('Failed to fetch stores:', err.message);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtered = stores
    .filter((store) =>
      store.name.toLowerCase().includes(filter.toLowerCase()) ||
      store.email.toLowerCase().includes(filter.toLowerCase()) ||
      store.address.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === 'rating') {
        const valA = a.rating || 0;
        const valB = b.rating || 0;
        return order === 'asc' ? valA - valB : valB - valA;
      }
      const valA = a[orderBy]?.toLowerCase?.() || '';
      const valB = b[orderBy]?.toLowerCase?.() || '';
      return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>🏪 All Stores</Typography>
      <TextField
        fullWidth
        label="Search by name, email or address"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['name', 'email', 'address', 'rating'].map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? order : 'asc'}
                    onClick={() => handleSort(col)}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.email}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.rating || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StoreTable;
