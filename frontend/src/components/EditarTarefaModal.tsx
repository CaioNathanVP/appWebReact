// src/components/EditarTarefaModal.tsx

import React, { useState, useEffect } from 'react';
import type { Tarefa } from '../types/Tarefa';

interface Props {
    tarefa: Tarefa;
    onClose: () => void;
    onSave: (tarefaAtualizada: Tarefa) => void;
}

const EditarTarefaModal: React.FC<Props> = ({ tarefa, onClose, onSave }) => {
    const [form, setForm] = useState<Tarefa>(tarefa);

    useEffect(() => {
        setForm(tarefa);
    }, [tarefa]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h3>Editar Tarefa</h3>

                <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" />

                <textarea name="descricao" value={form.descricao || ''} onChange={handleChange} placeholder="Descrição" />

                <select
                    name="status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'pendente' | 'finalizado' })}
                >
                    <option value="pendente">Pendente</option>
                    <option value="finalizado">Finalizado</option>
                </select>

                <input name="dataInicio" type="date" value={form.dataInicio?.toString().slice(0, 10) || ''} onChange={handleChange} />
                <input name="dataPrevisao" type="date" value={form.dataPrevisao?.toString().slice(0, 10) || ''} onChange={handleChange} />
                <input name="dataConclusao" type="date" value={form.dataConclusao?.toString().slice(0, 10) || ''} onChange={handleChange} />

                <div>
                    <button onClick={handleSubmit}>Salvar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 400,
        maxHeight: '90vh',
        overflowY: 'auto' as const,
    },
};

export default EditarTarefaModal;
