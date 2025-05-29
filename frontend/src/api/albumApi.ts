import type { Album, AlbumWithPhotos, CreateAlbumDto, UpdateAlbumDto } from '../types';
import { API_BASE_URL, handleResponse } from '../utils/httpClient';

const toAlbumWithPhotos = (album: Album): AlbumWithPhotos => ({
  ...album,
  photoCount: album.photoCount || 0,
});

export const getUserAlbums = async (userId: number): Promise<AlbumWithPhotos[]> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/albums`);
  const albums = await handleResponse<Album[]>(response);
  return albums.map(toAlbumWithPhotos);
};

export const getAlbum = async (id: number): Promise<AlbumWithPhotos> => {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`);
  const album = await handleResponse<Album>(response);
  return toAlbumWithPhotos(album);
};

export const createAlbum = async (data: CreateAlbumDto): Promise<AlbumWithPhotos> => {
  const response = await fetch(`${API_BASE_URL}/albums`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const album = await handleResponse<Album>(response);
  return toAlbumWithPhotos(album);
};

export const updateAlbum = async (
  id: number,
  updates: UpdateAlbumDto,
): Promise<AlbumWithPhotos> => {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const album = await handleResponse<Album>(response);
  return toAlbumWithPhotos(album);
};

export const deleteAlbum = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete album');
  }
};
