import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage/UsersPage';
import UserAlbumsPage from './pages/UserAlbumsPage/UserAlbumsPage';
import AlbumPhotosPage from './pages/AlbumPhotosPage/AlbumPhotosPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UsersPage />} />
        <Route path='/users/:userId/albums' element={<UserAlbumsPage />} />
        <Route path='/albums/:albumId/photos' element={<AlbumPhotosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
