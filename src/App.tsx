import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { fetchAuth } from './redux/Auth/asyncActions';
import { selectLoginData } from './redux/Auth/selectors';
import { useAppDispatch } from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  const { statusLogin, statusRegister, serverError } = useSelector(selectLoginData);
  useEffect(() => {
    dispatch(fetchAuth());
  }, [statusLogin, statusRegister] )

  return (
    <Routes>
      <Route path='/:id' element={<Main />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/:user' element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
