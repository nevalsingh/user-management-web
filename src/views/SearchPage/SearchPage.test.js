import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchPage from './SearchPage';
import { ToastContainer } from 'react-toastify';
import api from '../../services/user-management/api';

// Mock axios
jest.mock('../../services/user-management/api', () => ({
  get: jest.fn(),
}));

describe('SearchPage Int Test', () => {
  test('searches and renders users', async () => {
    const mockUsers = [
      { id: 1, username: 'walter_white', email: 'ww@gmail.com' },
      { id: 2, username: 'jessie pinkman', email: 'jp@gmail.com' },
    ];

    api.get.mockResolvedValueOnce({ data: mockUsers });

    render(
      <>
        <SearchPage />
        <ToastContainer />
      </>
    );

    // fill search
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'white' },
    });

    // Execute search
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    // Assert > 1 result
    const userRows = await screen.findAllByRole('row');
    expect(userRows.length).toBeGreaterThan(1);

    // Ensure API Mapping
    expect(api.get).toHaveBeenCalledWith('/users/search', {
      params: { username: 'white' },
    });
  });
});
