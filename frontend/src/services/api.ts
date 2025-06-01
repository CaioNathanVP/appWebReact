// src/services/api.ts

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // ajuste se necessário
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
