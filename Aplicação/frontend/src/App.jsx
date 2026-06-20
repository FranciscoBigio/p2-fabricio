import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useContext } from 'react';

// Importações
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Carros from './pages/Carros';
import Motos from './pages/Motos';
import Roupas from './pages/Roupas';

const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50">Carregando...</div>;
  if (!authenticated) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Home />} />
            <Route path="carros" element={<Carros />} /> 
            <Route path="motos" element={<Motos />} />   
            <Route path="roupas" element={<Roupas />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;