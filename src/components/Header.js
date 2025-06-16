import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export const Header = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4" component="h1">
            User Management
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}; 