import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="menu-container">
      <Link to="/" className="menu-button">Início</Link>
      <Link to="/equipamentos" className="menu-button">Equipamentos</Link>
      <Link to="/cidades" className="menu-button">Cidades</Link>
      <Link to="/funcionarios" className="menu-button">Funcionários</Link>
      <Link to="/servicos" className="menu-button">Serviços</Link>
    </nav>
  );
}