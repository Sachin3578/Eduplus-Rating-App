import { Card, CardContent, Typography, Grid } from '@mui/material';

const StatsCard = ({ label, value }) => (
  <Grid item xs={12} md={4}>
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="h4" color="primary">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default StatsCard;
