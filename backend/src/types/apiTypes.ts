// Tipos para as APIs externas
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Tipo para resposta do BFF
export interface UserWithAlbums {
  id: number;
  name: string;
  email: string;
  albumCount: number;
  albums: {
    id: number;
    title: string;
    photoCount: number;
    firstPhoto?: string; // URL da primeira foto
  }[];
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
}

export interface UpdatePhotoDto {
  title?: string;
  url?: string;
}