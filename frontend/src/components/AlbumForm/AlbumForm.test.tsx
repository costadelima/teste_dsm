import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlbumForm from './AlbumForm';

describe('AlbumForm', () => {
  it('submits the form with valid data', async () => {
    const mockOnCreated = vi.fn();
    const user = userEvent.setup();

    const mockFetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ userId: 1, title: 'Vacation Photos' }),
      ok: true,
    } as any);

    render(<AlbumForm userId={1} onCreated={mockOnCreated} />);

    const inputElement = screen.getByLabelText('Album Title');
    const buttonElement = await screen.findByRole('button', { name: 'Create Album' });

    await act(async () => {
      await user.type(inputElement, 'Vacation Photos');
      fireEvent.click(buttonElement);
    });

    await waitFor(() => {
      expect(mockOnCreated).toHaveBeenCalledTimes(1);
      expect(mockOnCreated).toHaveBeenCalledWith({ userId: 1, title: 'Vacation Photos' });
    });

    mockFetch.mockRestore();
  });

  it('shows error when title is empty', async () => {
    const mockOnCreated = vi.fn();

    render(<AlbumForm userId={1} onCreated={mockOnCreated} />);

    const buttonElement = await screen.findByRole('button', { name: 'Create Album' });

    await act(async () => {
      fireEvent.click(buttonElement);
    });

    expect(await screen.findByText('Album title is required')).toBeInTheDocument();
    expect(mockOnCreated).not.toHaveBeenCalled();
  });
});
