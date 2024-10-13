import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const EmailInput = ({ value, onChange, setIsValid, required = true }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (required && !validateEmail(value)) {
      setError(true);
      setHelperText('Please enter a valid email address.');
      setIsValid(false);
    } else {
      setError(false);
      setHelperText('');
      setIsValid(true);
    }
  }, [value, required, setIsValid]);

  const handleEmailChange = (e) => {
    onChange(e);
  };

  return (
    <TextField
      label="Email"
      name="email"
      type="email"
      fullWidth
      margin="normal"
      value={value}
      onChange={handleEmailChange}
      required={required}
      error={error}
      helperText={helperText}
    />
  );
};

export default EmailInput;
