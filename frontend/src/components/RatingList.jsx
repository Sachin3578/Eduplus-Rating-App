import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

const RatingList = ({ ratings }) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 3 }}>📋 Ratings Received</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.userName}</TableCell>
              <TableCell>{r.userEmail}</TableCell>
              <TableCell>{r.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RatingList;
