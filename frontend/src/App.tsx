// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Header /> {/* Aqui aparece o cabeçalho fixo */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
