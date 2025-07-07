import { useState } from 'react';
import {
  Card, CardContent, Typography, Rating, Button, Box
} from '@mui/material';

const StoreCard = ({ store, refresh, onRate }) => {
  const [userRating, setUserRating] = useState(store.userRating || 0);
  const [editing, setEditing] = useState(false);

  const handleRatingSubmit = async () => {
    try {
      await onRate(store.id, userRating); // ✅ call parent function to submit rating
      setEditing(false);
      refresh(); // optional: refresh after rating
    } catch (err) {
      console.error('❌ Rating submission failed:', err);
      alert('❌ Failed to submit rating');
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6">{store.name}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{store.address}</Typography>

        <Typography variant="body2" color="text.secondary">
          Avg. Rating:{' '}
          {typeof store.rating === 'number' ? store.rating.toFixed(1) : 'N/A'}
        </Typography>

        <Box mt={2}>
          <Typography variant="body2">Your Rating:</Typography>
          <Rating
            value={userRating}
            onChange={(e, newVal) => {
              setUserRating(newVal);
              setEditing(true);
            }}
          />
        </Box>

        {editing && (
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1 }}
            onClick={handleRatingSubmit}
          >
            Submit / Update
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreCard;
