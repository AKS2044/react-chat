import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import Main from './pages/main/Main';
import NotFound from './pages/notFound/NotFound';

function App() {
  console.log("Loading")
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
