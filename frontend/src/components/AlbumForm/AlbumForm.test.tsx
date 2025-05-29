import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlbumForm from './AlbumForm';

describe('AlbumForm', () => {
  it('submits the form with valid data', async () => {
    const mockOnCreated = vi.fn();
    const user = userEvent.setup();

    render(<AlbumForm userId={1} onCreated={mockOnCreated} />);

    await user.type(screen.getByLabelText('Album Title'), 'Vacation Photos');

    fireEvent.click(screen.getByText('Create Album'));

    await vi.waitFor(() => {
      expect(mockOnCreated).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Vacation Photos' }),
      );
    });
  });

  it('shows error when title is empty', async () => {
    const mockOnCreated = vi.fn();

    render(<AlbumForm userId={1} onCreated={mockOnCreated} />);

    fireEvent.click(screen.getByText('Create Album'));

    expect(await screen.findByText('Album title is required')).toBeInTheDocument();
    expect(mockOnCreated).not.toHaveBeenCalled();
  });
});
