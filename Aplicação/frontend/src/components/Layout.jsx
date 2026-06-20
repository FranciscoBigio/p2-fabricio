import { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de Navegação */}
      <nav className="bg-blue-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-white font-bold text-xl tracking-wider">
                SISTEMA
              </Link>
              
              {/* Links do Menu */}
              <div className="hidden md:flex gap-6">
                <Link to="/carros" className="text-blue-100 hover:text-white font-medium transition">Carros</Link>
                <Link to="/motos" className="text-blue-100 hover:text-white font-medium transition">Motos</Link>
                <Link to="/roupas" className="text-blue-100 hover:text-white font-medium transition">Roupas</Link>
              </div>
            </div>

            {/* Botão de Logout */}
            <button 
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-bold shadow transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      {/* Área de Conteúdo Dinâmico */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet /> {/* É aqui que as páginas vão aparecer! */}
      </main>
    </div>
  );
};

export default Layout;