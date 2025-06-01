// src/components/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // opcional para estilização

const Header: React.FC = () => {
  return (
    <nav className="nav">
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Cadastro</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
