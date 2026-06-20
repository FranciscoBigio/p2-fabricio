import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expert-fiesta-69vq65w54g572j45-3000.app.github.dev/api', 
});


api.interceptors.request.use(async (config) => {
  // 1. Mudamos para o nome exato da gaveta
  const token = localStorage.getItem('@App:token'); 
  
  // 2. Garantimos que não vai mandar a palavra "undefined"
  if (token && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;