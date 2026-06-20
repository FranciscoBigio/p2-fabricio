import { useState, useEffect } from 'react';
import api from '../services/api';

const Roupas = () => {
  const [roupas, setRoupas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Campos EXATAMENTE iguais ao Mongoose Model (sem o "De")
  const [formData, setFormData] = useState({ 
    nome: '', 
    paisOrigem: '', 
    anoFundacao: '' 
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRoupas();
  }, []);

  const fetchRoupas = async () => {
    try {
      const response = await api.get('/roupas'); 
      setRoupas(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar roupas:", error);
      setRoupas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenAdd = () => {
    setFormData({ nome: '', paisOrigem: '', anoFundacao: '' });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (roupa) => {
    // Pegando as propriedades exatas que vêm do banco
    setFormData({ 
      nome: roupa.nome, 
      paisOrigem: roupa.paisOrigem, 
      anoFundacao: roupa.anoFundacao 
    });
    setEditingId(roupa.id || roupa._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      nome: formData.nome,
      paisOrigem: formData.paisOrigem,
      anoFundacao: Number(formData.anoFundacao)
    };

    try {
      if (editingId) {
        await api.put(`/roupas/${editingId}`, payload);
      } else {
        await api.post('/roupas', payload);
      }
      setIsModalOpen(false);
      fetchRoupas();
    } catch (error) {
      console.error("Erro ao salvar roupa:", error);
      alert("Erro do servidor: " + JSON.stringify(error.response?.data));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta peça?")) {
      try {
        await api.delete(`/roupas/${id}`);
        fetchRoupas();
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
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Roupas</h1>
          <p className="text-gray-600">Catálogo de marcas e vestuário.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          + Nova Peça
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">País de Origem</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ano de Fundação</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roupas.length === 0 ? (
              <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Nenhuma roupa cadastrada.</td></tr>
            ) : (
              roupas.map((roupa) => (
                <tr key={roupa.id || roupa._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{roupa.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{roupa.paisOrigem}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{roupa.anoFundacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleOpenEdit(roupa)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(roupa.id || roupa._id)} className="text-red-600 hover:text-red-900">Excluir</button>
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Peça' : 'Nova Peça'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">País de Origem</label>
                {/* Repare no name="paisOrigem" */}
                <input type="text" name="paisOrigem" value={formData.paisOrigem} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Fundação</label>
                {/* Repare no name="anoFundacao" */}
                <input type="number" name="anoFundacao" value={formData.anoFundacao} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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

export default Roupas;