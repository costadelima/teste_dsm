import axios from 'axios';
import { Photo } from '../types/apiTypes';

export const getAlbumPhotos = async (albumId: number): Promise<Photo[]> => {
  const response = await axios.get<Photo[]>(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  return response.data;
};