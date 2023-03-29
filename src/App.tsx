import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider, useRouteError } from 'react-router-dom';
import './App.scss';
import { fetchAuth } from './redux/Auth/asyncActions';
import { selectLoginData } from './redux/Auth/selectors';
import { useAppDispatch } from './redux/store';
import router from './router';

function App() {
  const dispatch = useAppDispatch();
  const { statusLogin, statusRegister, serverError } = useSelector(selectLoginData);
  
    
  useEffect(() => {
    dispatch(fetchAuth());
  }, [statusLogin, statusRegister] )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
