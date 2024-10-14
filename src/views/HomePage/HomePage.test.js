import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { ToastContainer } from 'react-toastify';
import api from '../../services/user-management/api';

jest.mock('../../services/user-management/api', () => ({
  get: jest.fn(),
}));

describe('HomePage Int Test', () => {
  test('displays loader when getting user count', async () => {
    api.get.mockResolvedValueOnce({ data: 1000 });

    render(
      <>
        <HomePage />
        <ToastContainer />
      </>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/users/count'));
    await waitFor(() =>
      expect(screen.getByText(/Total Users: 100/i)).toBeInTheDocument()
    );
  });

  test('displays error when getting user count fails', async () => {
    api.get.mockRejectedValueOnce(new Error('API error'));

    render(
      <>
        <HomePage />
        <ToastContainer />
      </>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/users/count'));
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to fetch total users/i)
      ).toBeInTheDocument()
    );
  });
});
