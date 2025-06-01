// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div className='container'><center><h1>Bem vindo ao meu gerenciador de tarefas</h1></center></div>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuario/:emailEncoded" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
