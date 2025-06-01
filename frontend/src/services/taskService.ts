// src/services/taskService.ts

import axios from './api';

export const getTarefasByEmail = async (email: string) => {
  const response = await axios.get(`/tarefas/${email}`);
  return response.data.objTaskRecovered;
};

export const deleteTarefa = async (id: string) => {
  const response = await axios.delete(`/tarefas/${id}`);
  return response.data;
};
export const createTarefa = async (email: string, titulo: string) => {
  const response = await axios.post(`/tarefas/${email}`, { titulo });
  return response.data.tarefa;
};