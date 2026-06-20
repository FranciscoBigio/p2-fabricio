import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Quando o app liga, verifica se já existe um token salvo
  useEffect(() => {
    const token = localStorage.getItem('@App:token');
    if (token) {
      // Como o backend devolve só o token, usamos ele para sinalizar que está logado
      setUser({ token }); 
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // 1. A ARMADILHA: Vamos imprimir no console exatamente o que o backend devolveu
      console.log("DADOS QUE VIERAM DO LOGIN:", response.data);
      
      // 2. Busca inteligente: tenta pegar pelos nomes mais comuns que os backends usam
      const tokenReal = response.data.token || response.data.accessToken || response.data.jwt;
      
      // Se mesmo assim não achar nada, avisa em vez de salvar "undefined"
      if (!tokenReal) {
        console.error("Token não encontrado na resposta!");
        throw new Error("O servidor não devolveu o token de acesso.");
      }

      // Salva o token verdadeiro no storage e atualiza o estado
      localStorage.setItem('@App:token', tokenReal);
      setUser({ token: tokenReal });
      return true;
    } catch (error) {
      throw error.response?.data?.error || error.message || 'Erro ao fazer login';
    }
  };

  const logout = () => {
    localStorage.removeItem('@App:token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};