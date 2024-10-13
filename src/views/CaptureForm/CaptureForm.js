import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/user-management/api';
import EmailInput from '../../components/input/EmailInput';
import UsernameInput from '../../components/input/UsernameInput';

function CaptureForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('/users', formData)
      .then((response) => {
        setLoading(false);
        toast.success('User captured successfully!');
        setFormData({ username: '', password: '', email: '' });
      })
      .catch((error) => {
        console.error('Failed to capture user:', error);
        toast.error('Failed to capture user.');
        setLoading(false);
      });
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Capture New User
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
        <UsernameInput
          value={formData.username}
          onChange={handleChange}
          setIsValid={setIsUsernameValid}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <EmailInput
          value={formData.email}
          onChange={handleChange}
          setIsValid={setIsEmailValid}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading || !isEmailValid || !isUsernameValid}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Capture'}
        </Button>
      </Box>
    </Box>
  );
}

export default CaptureForm;
