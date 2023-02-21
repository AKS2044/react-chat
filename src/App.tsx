import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

function App() {
  console.log("Loading")
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
}

export default App;
