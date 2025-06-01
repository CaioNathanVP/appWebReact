// src/services/taskService.ts

import axios from './api';
import type { Tarefa } from '../types/Tarefa';

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
export const updateTarefa = async (id: string, dados: Partial<Tarefa>) => {
  const response = await axios.put(`/tarefas/${id}`, dados);
  return response.data.tarefa;
};
