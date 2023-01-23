import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://movies-api-n4bq.onrender.com',
  baseURL: 'http://localhost:3333',
});

export default api;