import React, { useState } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/user-management/api';
import EmailInput from '../input/EmailInput';
import UsernameInput from '../input/UsernameInput';

function UserEditModal({ user, onUpdate, onClose }) {
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    api
      .put(`/users/${user.id}`, formData)
      .then((response) => {
        onUpdate(response.data);
        toast.success('User updated successfully!');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to update user:', error);
        toast.error('Failed to update user.');
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Edit User
      </Typography>
      <UsernameInput
        value={formData.username}
        onChange={handleChange}
        setIsValid={setIsUsernameValid}
      />
      <EmailInput
        value={formData.email}
        onChange={handleChange}
        setIsValid={setIsEmailValid}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !isEmailValid || !isUsernameValid}
        >
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </Box>
    </Box>
  );
}

export default UserEditModal;
