import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UsersPage from './UsersPage';
import * as userApi from '../../api/userApi';

describe('UsersPage', () => {
  it('fetches and displays users', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        username: 'john.doe',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        username: 'jane.smith',
      },
    ];
    const getUsersMock = vi.spyOn(userApi, 'getUsers').mockResolvedValue(mockUsers);

    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();

    getUsersMock.mockRestore();
  });

  it('displays loading message initially', () => {
    const getUsersMock = vi.spyOn(userApi, 'getUsers').mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]);
        }, 50);
      });
    });

    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading users...')).toBeInTheDocument();

    getUsersMock.mockRestore();
  });

  it('handles API error', async () => {
    const getUsersMock = vi.spyOn(userApi, 'getUsers').mockRejectedValue(new Error('API Error'));
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <UsersPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument();
    });

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();

    getUsersMock.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
