import React from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <div className="inicio-container">
      
      <section className="hero-section">
        <h1>Sistema Mineradora</h1>
        <p>Plataforma centralizada de registro e gestão de atividades, frotas e operações.</p>
      </section>

      <section className="cards-grid">
        <Link to="/equipamentos" className="card-modulo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-icone">🚜</div>
          <h3>Equipamentos</h3>
          <p>Controle de maquinário e alocações</p>
        </Link>
        
        <Link to="/cidades" className="card-modulo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-icone">🗺️</div>
          <h3>Cidades</h3>
          <p>Mapeamento de polos de extração</p>
        </Link>

        <Link to="/funcionarios" className="card-modulo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-icone">👷🏽‍♂️</div>
          <h3>Funcionários</h3>
          <p>Gestão da equipe de campo</p>
        </Link>

        <Link to="/servicos" className="card-modulo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="card-icone">⚙️</div>
          <h3>Serviços</h3>
          <p>Registro de atividades diárias</p>
        </Link>
      </section>
      
    </div>
  );
}