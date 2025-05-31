// src/components/RegisterForm.tsx

import React, { useState } from 'react';
import { registerUser } from '../services/userService';

interface UserFormData {
    primeiro_nome: string;
    sobrenome: string;
    email: string;
    senha: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<UserFormData>({
        primeiro_nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    });

    const [mensagem, setMensagem] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Enviando dados para o backend:', formData);

        try {
            const response = await registerUser(formData);
            setMensagem(response.myUserSucesso);
        } catch (err: unknown) {
            const erro = err as { response?: { data?: { erro?: string } } };
            setMensagem(erro?.response?.data?.erro || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Usuário</h2>
            <input
                type="text"
                name="primeiro_nome"
                placeholder="Primeiro Nome"
                value={formData.primeiro_nome}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="sobrenome"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
            />
            <button type="submit">Cadastrar</button>
            {mensagem && <p>{mensagem}</p>}
        </form>
    );
};

export default RegisterForm;
