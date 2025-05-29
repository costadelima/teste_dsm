import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getAlbumPhotos, createPhoto, updatePhoto, deletePhoto } from '../../api/photoApi';
import { getAlbum } from '../../api/albumApi';
import { getUser } from '../../api/userApi';
import PhotoForm from '../../components/PhotoForm/PhotoForm';
import PhotoGrid from '../../components/PhotoGrid/PhotoGrid';
import type { Album, Photo, User, CreatePhotoDto, UpdatePhotoDto } from '../../types';
import styles from './AlbumPhotosPage.module.css';

export default function AlbumPhotosPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const albumData = await getAlbum(Number(albumId));
        setAlbum(albumData);

        if (userId) {
          const userData = await getUser(Number(userId));
          setUser(userData);
        }

        const photosData = await getAlbumPhotos(Number(albumId));
        setPhotos(photosData);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId, userId]);

  const handlePhotoCreated = async (newPhoto: CreatePhotoDto) => {
    try {
      const createdPhoto = await createPhoto(newPhoto);
      setPhotos((prev) => [...prev, createdPhoto]);
    } catch (error) {
      console.error('Photo creation error:', error);
    }
  };

  const handlePhotoUpdated = async (photoId: number, updates: UpdatePhotoDto) => {
    try {
      const updatedPhoto = await updatePhoto(photoId, updates);
      setPhotos((prev) => prev.map((p) => (p.id === photoId ? updatedPhoto : p)));
    } catch (error) {
      console.error('Photo update error:', error);
    }
  };

  const handlePhotoDeleted = async (photoId: number) => {
    try {
      await deletePhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (error) {
      console.error('Photo deletion error:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading photos...</div>;
  }

  return (
    <div className={styles.container}>
      {album && user && (
        <div className={styles.albumHeader}>
          <h1 className={styles.albumTitle}>{album.title}</h1>
          <p className={styles.albumOwner}>
            Album by: {user.name} ({user.email})
          </p>
        </div>
      )}

      <PhotoForm albumId={Number(albumId)} onCreated={handlePhotoCreated} />

      <PhotoGrid photos={photos} onUpdate={handlePhotoUpdated} onDelete={handlePhotoDeleted} />
    </div>
  );
}
