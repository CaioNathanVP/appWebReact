import axios from './api';

interface LoginPayload {
  email: string;
  senha: string;
}

export const login = async (data: LoginPayload): Promise<{ email: string }> => {
  const response = await axios.post('/login', data);
  return response.data; // <- Aqui é onde obtemos o { email: ... }
};
