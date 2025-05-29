import { User, Album, Photo } from './types/apiTypes';

// Banco de dados em memória
export let users: User[] = [];
export let albums: Album[] = [];
export let photos: Photo[] = [];

export const initializeDB = async () => {
  try {
    // Carregar dados iniciais
    const [usersRes, albumsRes, photosRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/albums'),
      fetch('https://jsonplaceholder.typicode.com/photos')
    ]);
    
    users = await usersRes.json();
    albums = await albumsRes.json();
    photos = await photosRes.json();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};

// Operações para álbuns
export const addAlbum = (album: Album) => {
  const newId = Math.max(0, ...albums.map(a => a.id)) + 1;
  const newAlbum = { ...album, id: newId };
  albums.push(newAlbum);
  return newAlbum;
};

export const updateAlbum = (id: number, updates: Partial<Album>) => {
  const index = albums.findIndex(a => a.id === id);
  if (index !== -1) {
    albums[index] = { ...albums[index], ...updates };
    return albums[index];
  }
  return null;
};

export const deleteAlbum = (id: number) => {
  const initialLength = albums.length;
  albums = albums.filter(a => a.id !== id);
  // Apagar fotos associadas
  photos = photos.filter(p => p.albumId !== id);
  return initialLength !== albums.length;
};

// Operações para fotos
export const addPhoto = (photo: Photo) => {
  const newId = Math.max(0, ...photos.map(p => p.id)) + 1;
  const newPhoto = { 
    ...photo, 
    id: newId,
    thumbnailUrl: photo.thumbnailUrl || photo.url 
  };
  photos.push(newPhoto);
  return newPhoto;
};

export const updatePhoto = (id: number, updates: Partial<Photo>) => {
  const index = photos.findIndex(p => p.id === id);
  if (index !== -1) {
    // Garantir que thumbnailUrl sempre tenha um valor
    if (updates.url && !updates.thumbnailUrl) {
      updates.thumbnailUrl = updates.url;
    }
    photos[index] = { ...photos[index], ...updates };
    return photos[index];
  }
  return null;
};

export const deletePhoto = (id: number) => {
  const initialLength = photos.length;
  photos = photos.filter(p => p.id !== id);
  return initialLength !== photos.length;
};

// Funções de consulta
export const getUser = (id: number) => {
  return users.find(u => u.id === id);
};

export const getUserAlbums = (userId: number) => {
  const userAlbums = albums.filter(a => a.userId === userId);
  return userAlbums.map(album => ({
    ...album,
    photoCount: photos.filter(p => p.albumId === album.id).length
  }));
};

export const getAlbum = (id: number) => {
  return albums.find(a => a.id === id);
};

export const getAlbumPhotos = (albumId: number) => {
  return photos.filter(p => p.albumId === albumId);
};