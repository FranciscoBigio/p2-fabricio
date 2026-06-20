import { useState, useEffect } from 'react';
import api from '../services/api';

const Carros = () => {
  // Estados da Tela
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados do Formulário (Apenas os campos originais do seu model)
  const [formData, setFormData] = useState({ marca: '', modelo: '', ano: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCarros();
  }, []);

  const fetchCarros = async () => {
    try {
      const response = await api.get('/carros'); 
      if (Array.isArray(response.data)) {
        setCarros(response.data);
      } else if (response.data && Array.isArray(response.data.carros)) {
        setCarros(response.data.carros);
      } else {
        setCarros([]);
      }
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
      setCarros([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setFormData({ marca: '', modelo: '', ano: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (carro) => {
    setFormData({ marca: carro.marca, modelo: carro.modelo, ano: carro.ano });
    setEditingId(carro.id || carro._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // A mágica acontece aqui: convertemos a string do HTML para um Número real
    const payload = {
      marca: formData.marca,
      modelo: formData.modelo,
      ano: Number(formData.ano)
    };

    try {
      if (editingId) {
        await api.put(`/carros/${editingId}`, payload);
      } else {
        await api.post('/carros', payload);
      }
      setIsModalOpen(false);
      fetchCarros(); // Recarrega a lista
    } catch (error) {
      console.error("Erro ao salvar carro:", error);
      // Mostra o erro exato que o Mongoose devolveu
      alert("Erro do servidor: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este carro?")) {
      try {
        await api.delete(`/carros/${id}`);
        fetchCarros(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Carregando dados...</div>;

  return (
    <div className="animate-fade-in">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Carros</h1>
          <p className="text-gray-600">Gerencie o catálogo de automóveis do sistema.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          + Novo Carro
        </button>
      </div>

      {/* Tabela de Listagem */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ano</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(carros) || carros.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Nenhum carro cadastrado.</td>
              </tr>
            ) : (
              carros.map((carro) => (
                <tr key={carro.id || carro._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{carro.marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{carro.modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{carro.ano}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenEdit(carro)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(carro.id || carro._id)} className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Carro' : 'Novo Carro'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <input 
                  type="text" name="marca" value={formData.marca} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <input 
                  type="text" name="modelo" value={formData.modelo} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <input 
                  type="number" name="ano" value={formData.ano} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carros;