import React, { useEffect, useState } from 'react';
import {
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/user-management/api';

function HomePage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/users/count')
      .then((response) => {
        setTotalUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch total users:', error);
        toast.error('Failed to fetch total users.');
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the User Management App
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h6">
              Total Users: {totalUsers !== null ? totalUsers : 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default HomePage;
