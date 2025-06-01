// src/pages/UserDashboard.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTarefasByEmail, deleteTarefa } from '../services/taskService';
import { createTarefa } from '../services/taskService'; // já no topo

interface Tarefa {
    _id: string;
    titulo: string;
    descricao?: string;
    status: string;
    dataInicio?: string;
    dataPrevisao?: string;
    dataConclusao?: string;
}

const UserDashboard: React.FC = () => {
    const { email } = useParams();
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [loading, setLoading] = useState(true);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [criando, setCriando] = useState(false);

    const handleCriarTarefa = async () => {
        if (!novaTarefa.trim()) return alert('Título obrigatório');

        try {
            await createTarefa(email!, novaTarefa.trim());
            setNovaTarefa('');
            setCriando(false);
            carregarTarefas(); // recarrega a lista
        } catch (err) {
            console.error('Erro ao criar tarefa:', err);
        }
    };

    const carregarTarefas = async () => {
        try {
            const data = await getTarefasByEmail(email!);
            setTarefas(data);
        } catch (err) {
            console.error('Erro ao buscar tarefas:', err);
        } finally {
            setLoading(false);
        }
    };

    const excluirTarefa = async (id: string) => {
        if (confirm('Deseja realmente excluir essa tarefa?')) {
            await deleteTarefa(id);
            carregarTarefas(); // recarrega lista
        }
    };

    useEffect(() => {
        const carregarTarefas = async () => {
            try {
                const data = await getTarefasByEmail(email!);
                setTarefas(data);
            } catch (err) {
                console.error('Erro ao buscar tarefas:', err);
            } finally {
                setLoading(false);
            }
        };

        carregarTarefas();
    }, [email]);

    return (
        <div>
            <h2>Tarefas de {email}</h2>
            {/* 👇 INSIRA AQUI O BLOCO DO FORMULÁRIO DE NOVA TAREFA */}
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDashboard;
