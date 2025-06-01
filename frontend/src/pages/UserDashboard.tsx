// src/pages/UserDashboard.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  getTarefasByEmail,
  deleteTarefa,
  createTarefa,
  updateTarefa
} from '../services/taskService';
import EditarTarefaModal from '../components/EditarTarefaModal';
import type { Tarefa } from '../types/Tarefa';

const UserDashboard: React.FC = () => {
  const { emailEncoded } = useParams();
  const email = decodeURIComponent(emailEncoded!); // ✅ Descodificando corretamente

  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [criando, setCriando] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

  const carregarTarefas = useCallback(async () => {
    try {
      const data = await getTarefasByEmail(email);
      setTarefas(data);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    carregarTarefas();
  }, [carregarTarefas]);

  const handleCriarTarefa = async () => {
    if (!novaTarefa.trim()) return alert('Título obrigatório');

    try {
      await createTarefa(email, novaTarefa.trim());
      setNovaTarefa('');
      setCriando(false);
      carregarTarefas();
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  };

  const excluirTarefa = async (id: string) => {
    if (confirm('Deseja realmente excluir essa tarefa?')) {
      await deleteTarefa(id);
      carregarTarefas();
    }
  };

  return (
    <div className='container'>
      <h2>Tarefas de {email}</h2>

      <button onClick={() => setCriando(!criando)}>
        {criando ? 'Cancelar' : 'Nova Tarefa'}
      </button>

      {criando && (
        <div>
          <input
            type="text"
            placeholder="Título da tarefa"
            value={novaTarefa}
            onChange={e => setNovaTarefa(e.target.value)}
          />
          <button onClick={handleCriarTarefa}>Criar</button>
        </div>
      )}

      {loading ? (
        <p>Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa._id}>
              <strong>{tarefa.titulo}</strong> - Status: {tarefa.status}
              <button onClick={() => excluirTarefa(tarefa._id)}>Excluir</button>
              <button onClick={() =>
                setTarefaEditando({
                  ...tarefa,
                  status: tarefa.status as 'pendente' | 'finalizado'
                })
              }>
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      {tarefaEditando && (
        <EditarTarefaModal
          tarefa={tarefaEditando}
          onClose={() => setTarefaEditando(null)}
          onSave={async (tarefaAtualizada) => {
            await updateTarefa(tarefaAtualizada._id, tarefaAtualizada);
            setTarefaEditando(null);
            carregarTarefas();
          }}
        />
      )}
    </div>
  );
};

export default UserDashboard;
