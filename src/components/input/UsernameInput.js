import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

const UsernameInput = ({ value, onChange, setIsValid, required = true }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(String(username).toLowerCase());
  };

  useEffect(() => {
    if (required && !validateUsername(value)) {
      setError(true);
      setHelperText('Please enter a valid username.');
      setIsValid(false);
    } else {
      setError(false);
      setHelperText('');
      setIsValid(true);
    }
  }, [value, required, setIsValid]);

  const handleUsernameChange = (e) => {
    onChange(e);
  };

  return (
    <TextField
      label="Username"
      name="username"
      type="username"
      fullWidth
      margin="normal"
      value={value}
      onChange={handleUsernameChange}
      required={required}
      error={error}
      helperText={helperText}
    />
  );
};

export default UsernameInput;
