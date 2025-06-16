import React, { useState, useEffect } from 'react';
import {Container, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert} from '@mui/material';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { userService } from './services/userService';
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleAddUser = () => {
    setEditingUser(undefined);
    setShowForm(true);
  };
  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };
  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await userService.deleteUser(userToDelete);
        setUsers(users.filter(user => user.id !== userToDelete));
        setError(null);
      } catch (err) {
        setError('Failed to delete user');
      }
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };
  const handleFormSubmit = async (userData) => {
    try {
      if (editingUser) {
        const updatedUser = await userService.updateUser(editingUser.id, userData);
        setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      } else {
        const newUser = await userService.createUser(userData);
        setUsers([...users, newUser]);
      }
      setError(null);
      setShowForm(false);
    } catch (err) {
      setError(editingUser ? 'Failed to update user' : 'Failed to create user');
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          sx={{ mb: 2 }}
        >
          Add New User
        </Button>
        <UserList
          users={users}
          loading={loading}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        <Dialog open={showForm} onClose={() => setShowForm(false)}>
          <DialogTitle>
            {editingUser ? 'Edit User' : 'Add New User'}
          </DialogTitle>
          <DialogContent>
            <UserForm
              user={editingUser}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Box>
  );
}
export default App;