import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' errorElement={<NotFound />}>
        <Route path=':id' element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile' element={<Profile />} />
        <Route path='profile/:user' element={<Profile />} />
        <Route path='oops' element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
    </Route>
));

export default router;