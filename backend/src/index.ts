import express from 'express';
import cors from 'cors';
import { 
  initializeDB, 
  users, 
  getUser,
  getUserAlbums,
  getAlbum,
  getAlbumPhotos,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  addPhoto,
  updatePhoto,
  deletePhoto
} from './memoryDB';

export const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


initializeDB();


app.get('/bff/users', (req, res) => {
  res.json(users);
});

app.get('/bff/users/:id', (req, res) => {
  const user = getUser(Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

app.get('/bff/users/:userId/albums', (req, res) => {
  const albums = getUserAlbums(Number(req.params.userId));
  res.json(albums);
});

app.get('/bff/albums/:id', (req, res) => {
  const album = getAlbum(Number(req.params.id));
  album ? res.json(album) : res.status(404).json({ error: 'Album not found' });
});

app.get('/bff/albums/:albumId/photos', (req, res) => {
  const photos = getAlbumPhotos(Number(req.params.albumId));
  res.json(photos);
});


app.post('/bff/albums', (req, res) => {
  const newAlbum = addAlbum(req.body);
  res.status(201).json(newAlbum);
});

app.put('/bff/albums/:id', (req, res) => {
  const updatedAlbum = updateAlbum(Number(req.params.id), req.body);
  updatedAlbum ? res.json(updatedAlbum) : res.status(404).json({ error: 'Album not found' });
});

app.delete('/bff/albums/:id', (req, res) => {
  const success = deleteAlbum(Number(req.params.id));
  success ? res.status(204).end() : res.status(404).json({ error: 'Album not found' });
});


app.post('/bff/photos', (req, res) => {  
  const photoData = {
    ...req.body,
    thumbnailUrl: req.body.thumbnailUrl || req.body.url
  };
  const newPhoto = addPhoto(photoData);
  res.status(201).json(newPhoto);
});

app.put('/bff/photos/:id', (req, res) => {
  const updatedPhoto = updatePhoto(Number(req.params.id), req.body);
  updatedPhoto ? res.json(updatedPhoto) : res.status(404).json({ error: 'Photo not found' });
});

app.delete('/bff/photos/:id', (req, res) => {
  const success = deletePhoto(Number(req.params.id));
  success ? res.status(204).end() : res.status(404).json({ error: 'Photo not found' });
});

app.listen(PORT, () => {
  
});