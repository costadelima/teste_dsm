export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  photoCount?: number;
}

export interface AlbumWithPhotos extends Album {
  photoCount: number;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface CreateAlbumDto {
  userId: number;
  title: string;
}

export interface UpdateAlbumDto {
  title?: string;
}

export interface CreatePhotoDto {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export interface UpdatePhotoDto {
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface UserWithAlbums {
  id: number;
  name: string;
  email: string;
  albumCount: number;
}

export interface AlbumWithPhotos {
  id: number;
  title: string;
  userId: number;
  photoCount: number;
}

export type RootStackParamList = {
  Users: undefined;
  UserAlbums: { userId: number };
  AlbumPhotos: { albumId: number; userId: number };
};
