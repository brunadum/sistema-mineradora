import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => { 
    carregarCidades(); 
  }, []);

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      console.log("Dados recebidos de Cidades:", response.data); // Vai nos mostrar se a lista chegou!
      
      if (response.data) {
        setCidades(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  const cadastrar = async () => {
    if (!nome) return alert("Preencha o nome!");
    try {
      await cidadeService.criar({ nome });
      setNome('');
      carregarCidades(); // Atualiza a lista na mesma hora
      alert("Cidade cadastrada com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar cidade.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gestão de Cidades</h2>
      <div style={{ marginBottom: '20px', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
        <input 
          type="text" 
          placeholder="Nome da Cidade" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ marginRight: '10px', padding: '5px' }} 
        />
        <button onClick={cadastrar} className="counter">Cadastrar</button>
      </div>
      
      <h3>Cidades Cadastradas</h3>
      <ul>
        {cidades.length === 0 ? (
          <p>Nenhuma cidade aparecendo ainda...</p>
        ) : (
          cidades.map((cid) => (
            <li key={cid.id}>{cid.nome}</li>
          ))
        )}
      </ul>
    </div>
  );
}