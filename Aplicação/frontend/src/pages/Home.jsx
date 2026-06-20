import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel de Controle</h1>
      <p className="text-gray-600 mb-8">Bem-vindo ao sistema de gerenciamento de recursos.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Carros */}
        <Link to="/carros" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <h2 className="text-xl font-bold text-blue-600 mb-2 group-hover:text-blue-700">🚘 Gestão de Carros</h2>
          <p className="text-gray-500 text-sm">Cadastre, edite, visualize e remova automóveis do seu banco de dados MongoDB.</p>
        </Link>

        {/* Card Motos */}
        <Link to="/motos" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <h2 className="text-xl font-bold text-green-600 mb-2 group-hover:text-green-700">🏍️ Gestão de Motos</h2>
          <p className="text-gray-500 text-sm">Controle o inventário de motocicletas e suas especificações técnicas.</p>
        </Link>

        {/* Card Roupas */}
        <Link to="/roupas" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition group">
          <h2 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">👕 Gestão de Roupas</h2>
          <p className="text-gray-500 text-sm">Gerencie o catálogo de vestuário, marcas e países de origem.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;