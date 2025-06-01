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
    setMensagem(null);

    try {
      const response = await login({ email, senha });
      console.log('Login efetuado com sucesso:', response);
      navigate(`/usuario/${response.email}`);
    } catch (err: unknown) {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    const erro = err as { response?: { data?: { erro?: string } } };
    setMensagem(erro.response?.data?.erro || 'Erro ao efetuar login');
  } else {
    setMensagem('Erro ao efetuar login');
  }
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
};

export default LoginPage;
