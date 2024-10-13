import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../../services/user-management/api';
import UserEditModal from '../../components/common/UserEditModal';

function SearchPage() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const searchUsers = () => {
    if (!username.trim()) {
      toast.error('Please enter a username to search');
      return;
    }

    api
      .get('/users/search', { params: { username } })
      .then((response) => {
        setUsers(response.data);
        if (response.data.length === 0) {
          toast.error('Failed to find users. Please refine search');
        }
      })
      .catch((error) => {
        console.error('Error searching users:', error);
        toast.error('Something went wrong. Please try again');
      });
  };

  const deleteUser = (userId) => {
    api
      .delete(`/users/${userId}`)
      .then((response) => {
        toast.success('User deleted successfully!');
      })
      .catch((error) => {
        console.error('Failed to delete user:', error);
        toast.error('Failed to delete user.');
      });

    searchUsers();
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
    searchUsers();
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Search Users
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mr: 2, flex: 1 }}
        />
        <Button variant="contained" onClick={searchUsers}>
          Search
        </Button>
      </Box>
      {users.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover style={{ cursor: 'pointer' }}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleUserClick(user)}>Edit</Button>
                    <Button onClick={() => deleteUser(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No users found.</Typography>
      )}
      <Modal open={Boolean(selectedUser)} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 1,
          }}
        >
          {selectedUser && (
            <UserEditModal
              user={selectedUser}
              onUpdate={handleUserUpdate}
              onClose={handleModalClose}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchPage;
