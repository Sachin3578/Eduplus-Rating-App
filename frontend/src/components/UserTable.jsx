import { useEffect, useState } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import axios from '../api/axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('/admin/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.toLowerCase()) ||
    u.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>📋 All Users</Typography>
      <TextField fullWidth label="Search by name/email/role" onChange={e => setFilter(e.target.value)} sx={{ mb: 2 }} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Address</TableCell><TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.address}</TableCell>
              <TableCell>{u.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserTable;
