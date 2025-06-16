import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';

export const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        username: user.username
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      username: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 3 }}>
      
      
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          {user ? 'Update' : 'Add'} User
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}; 