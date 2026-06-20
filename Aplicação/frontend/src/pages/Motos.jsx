import { useState, useEffect } from 'react';
import api from '../services/api';

const Motos = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Campos EXATAMENTE iguais ao seu motoSchema
  const [formData, setFormData] = useState({ 
    marca: '', 
    modelo: '', 
    cilindradas: '', 
    ano: '' 
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMotos();
  }, []);

  const fetchMotos = async () => {
    try {
      const response = await api.get('/motos'); 
      if (Array.isArray(response.data)) {
        setMotos(response.data);
      } else if (response.data && Array.isArray(response.data.motos)) {
        setMotos(response.data.motos);
      } else {
        setMotos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
      setMotos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setFormData({ marca: '', modelo: '', cilindradas: '', ano: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (moto) => {
    setFormData({ 
      marca: moto.marca, 
      modelo: moto.modelo, 
      cilindradas: moto.cilindradas, 
      ano: moto.ano 
    });
    setEditingId(moto.id || moto._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Forçamos a conversão das strings do HTML para Números Reais
    const payload = {
      marca: formData.marca,
      modelo: formData.modelo,
      cilindradas: Number(formData.cilindradas),
      ano: Number(formData.ano)
    };

    try {
      if (editingId) {
        await api.put(`/motos/${editingId}`, payload);
      } else {
        await api.post('/motos', payload);
      }
      setIsModalOpen(false);
      fetchMotos();
    } catch (error) {
      console.error("Erro ao salvar moto:", error);
      alert("Erro do servidor: " + JSON.stringify(error.response?.data));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta moto?")) {
      try {
        await api.delete(`/motos/${id}`);
        fetchMotos();
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Carregando dados...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Motos</h1>
          <p className="text-gray-600">Gerencie o catálogo de motocicletas do sistema.</p>
        </div>
        <button 
          onClick={handleOpenAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          + Nova Moto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cilindradas</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ano</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!Array.isArray(motos) || motos.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">Nenhuma moto cadastrada.</td></tr>
            ) : (
              motos.map((moto) => (
                <tr key={moto.id || moto._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{moto.marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{moto.modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{moto.cilindradas}cc</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{moto.ano}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenEdit(moto)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(moto.id || moto._id)} className="text-red-600 hover:text-red-900">Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Moto' : 'Nova Moto'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                <input type="text" name="marca" value={formData.marca} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cilindradas</label>
                  <input type="number" name="cilindradas" value={formData.cilindradas} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                  <input type="number" name="ano" value={formData.ano} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Motos