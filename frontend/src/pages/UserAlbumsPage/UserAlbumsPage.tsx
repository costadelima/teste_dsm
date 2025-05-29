import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserAlbums, createAlbum, deleteAlbum } from '../../api/albumApi';
import { getUser } from '../../api/userApi';
import AlbumForm from '../../components/AlbumForm/AlbumForm';
import type { User, AlbumWithPhotos, CreateAlbumDto } from '../../types';
import styles from './UserAlbumsPage.module.css';

export default function UserAlbumsPage() {
  const { userId } = useParams<{ userId: string }>();
  const [albums, setAlbums] = useState<AlbumWithPhotos[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userData = await getUser(Number(userId));
        setUser(userData);

        const albumsData = await getUserAlbums(Number(userId));
        setAlbums(albumsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleAlbumCreated = async (newAlbum: CreateAlbumDto) => {
    try {
      const createdAlbum = await createAlbum(newAlbum);
      setAlbums((prev) => [...prev, createdAlbum]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create album');
    }
  };

  const handleAlbumDeleted = async (albumId: number) => {
    try {
      await deleteAlbum(albumId);
      setAlbums((prev) => prev.filter((a) => a.id !== albumId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete album');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading albums...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {user && <h1 className={styles.title}>{user.name}'s Albums</h1>}

      <AlbumForm userId={Number(userId)} onCreated={handleAlbumCreated} />

      <div className={styles.albumGrid}>
        {albums.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No albums found. Create your first album!</p>
          </div>
        ) : (
          albums.map((album) => (
            <div key={album.id} className={styles.albumCard}>
              <Link
                to={`/albums/${album.id}/photos?userId=${user?.id}`}
                className={styles.albumLink}
              >
                <div className={styles.albumContent}>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  <p className={styles.photoCount}>
                    {album.photoCount} {album.photoCount === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
              </Link>
              <div className={styles.albumActions}>
                <button
                  onClick={() => handleAlbumDeleted(album.id)}
                  className={styles.deleteButton}
                  aria-label={`Delete album ${album.title}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
