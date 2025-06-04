// src/services/userService.ts

import axios from './api';

interface RegisterPayload {
  primeiro_nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

export const registerUser = async (userData: RegisterPayload) => {
  const response = await axios.post('/user', userData);
  return response.data;
};
