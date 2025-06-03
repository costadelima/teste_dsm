import { Album, Photo, CreateAlbumDto, User } from '../types/apiTypes';
import { addAlbum, albums, photos, users } from '../memoryDB';

export const getUserAlbums = (userId: number): Album[] => {
  return albums.filter(album => album.userId === userId);
};

export const getAlbumPhotos = (albumId: number): Photo[] => {
  return photos.filter(photo => photo.albumId === albumId);
};

export const createAlbum = (dto: CreateAlbumDto): Album => {
  return addAlbum({
    id: 0, 
    userId: dto.userId,
    title: dto.title
  });
};
