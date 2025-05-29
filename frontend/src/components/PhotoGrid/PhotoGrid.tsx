import { useState } from 'react';
import type { Photo, UpdatePhotoDto } from '../../types';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: Photo[];
  onUpdate: (photoId: number, updates: UpdatePhotoDto) => void;
  onDelete: (id: number) => void;
}

export default function PhotoGrid({ photos, onUpdate, onDelete }: PhotoGridProps) {
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleEditClick = (photo: Photo) => {
    setEditingPhoto(photo);
    setEditedTitle(photo.title);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, url: string) => {
    console.error(`Failed to load image: ${url}`, e);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    onUpdate(editingPhoto.id, { title: editedTitle });
    setEditingPhoto(null);
  };

  return (
    <div className={styles.photoGrid}>
      <h2 className={styles.sectionTitle}>Photos ({photos.length})</h2>

      {editingPhoto && (
        <div className={styles.editModal}>
          <form onSubmit={handleSave} className={styles.editForm}>
            <h3 className={styles.modalTitle}>Edit Photo</h3>
            <input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className={styles.editInput}
              autoFocus
            />
            <div className={styles.buttonGroup}>
              <button type='submit' className={styles.saveButton}>
                Save
              </button>
              <button
                type='button'
                onClick={() => setEditingPhoto(null)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.photoCard}>
            <img
              src={photo.url}
              alt={photo.title}
              className={styles.photoImage}
              onError={(e) => handleImageError(e, photo.url)}
            />
            <div className={styles.photoInfo}>
              <p className={styles.photoTitle}>{photo.title}</p>
              <div className={styles.photoActions}>
                <button onClick={() => handleEditClick(photo)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => onDelete(photo.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
