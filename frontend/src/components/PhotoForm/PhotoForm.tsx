import { useState } from 'react';
import { createPhoto } from '../../api/photoApi';
import type { CreatePhotoDto } from '../../types';
import styles from './PhotoForm.module.css';

interface PhotoFormProps {
  albumId: number;
  onCreated: (newPhoto: any) => void;
}

export default function PhotoForm({ albumId, onCreated }: PhotoFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setError('Title and URL are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const photoData: CreatePhotoDto = {
        albumId,
        title,
        url: url,
        thumbnailUrl: thumbnailUrl,
      };

      onCreated(photoData);

      setTitle('');
      setUrl('');
      setThumbnailUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.photoForm}>
      <h3 className={styles.formTitle}>Add New Photo</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor='photoTitle' className={styles.label}>
            Title
          </label>
          <input
            id='photoTitle'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter photo title'
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='photoUrl' className={styles.label}>
            Image URL
          </label>
          <input
            id='photoUrl'
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='https://example.com/photo.jpg'
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='thumbnailUrl' className={styles.label}>
            Thumbnail URL (optional)
          </label>
          <input
            id='thumbnailUrl'
            type='url'
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder='https://example.com/thumbnail.jpg'
            className={styles.input}
          />
          <p className={styles.hint}>Leave blank to use the main image URL</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <button type='submit' disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span> Adding...
            </>
          ) : (
            'Add Photo'
          )}
        </button>
      </form>
    </div>
  );
}
