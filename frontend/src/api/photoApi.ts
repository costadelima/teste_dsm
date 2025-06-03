import type { Photo, CreatePhotoDto, UpdatePhotoDto } from '../types';
import { API_BASE_URL, handleResponse } from '../utils/httpClient';

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await fetch(`${API_BASE_URL}/albums/${albumId}/photos`);
  return handleResponse<Photo[]>(response);
};

export const createPhoto = async (data: CreatePhotoDto): Promise<Photo> => {
  const response = await fetch(`${API_BASE_URL}/photos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      thumbnailUrl: data.thumbnailUrl || data.url,
    }),
  });
  return handleResponse<Photo>(response);
};

export const updatePhoto = async (id: number, updates: UpdatePhotoDto): Promise<Photo> => {
  const finalUpdates =
    updates.url && !updates.thumbnailUrl ? { ...updates, thumbnailUrl: updates.url } : updates;

  const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalUpdates),
  });
  return handleResponse<Photo>(response);
};

export const deletePhoto = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/photos/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete photo');
  }
};
