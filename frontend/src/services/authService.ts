import axios from './api';

interface LoginPayload {
  email: string;
  senha: string;
}

export const login = async (data: LoginPayload) => {
  const response = await axios.post('/login', data);
  return response.data;
};
