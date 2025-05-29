import { useState } from 'react';
import type { CreateAlbumDto } from '../../types';
import styles from './AlbumForm.module.css';

interface AlbumFormProps {
  userId: number;
  onCreated: (newAlbum: any) => void;
}

export default function AlbumForm({ userId, onCreated }: AlbumFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Album title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/bff/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, title } as CreateAlbumDto),
      });

      if (!response.ok) {
        throw new Error(`Failed to create album: ${response.statusText}`);
      }

      const newAlbum = await response.json();
      onCreated(newAlbum);
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.albumForm}>
      <h3 className={styles.formTitle}>Create New Album</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor='albumTitle' className={styles.label}>
            Album Title
          </label>
          <input
            id='albumTitle'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter album title'
            aria-describedby='titleError'
            className={styles.input}
          />
          {error && (
            <div id='titleError' className={styles.errorMessage}>
              {error}
            </div>
          )}
        </div>

        <button type='submit' disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span> Creating...
            </>
          ) : (
            'Create Album'
          )}
        </button>
      </form>
    </div>
  );
}
