// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ email, senha });
      console.log('🔍 Resposta completa do login:', response);

      // ✅ Redirecionamento com encoding
      const encodedEmail = encodeURIComponent(response.email);
      navigate(`/usuario/${encodedEmail}`);
    } catch (err: unknown) {
      console.error('Erro no login:', err);
      setMensagem('Email ou senha inválidos');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha" required />
        <button type="submit">Entrar</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
