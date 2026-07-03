import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');

  useEffect(() => { carregarFuncionarios(); }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      if (response.data) setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !cargo) return alert("Preencha todos os campos!");
    try {
      await funcionarioService.criar({ nome, cargo });
      setNome(''); 
      setCargo('');
      carregarFuncionarios();
      alert("Funcionário cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar funcionário.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gestão de Funcionários</h2>
      <div style={{ marginBottom: '20px', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <button onClick={cadastrar} className="counter">Cadastrar</button>
      </div>
      <h3>Funcionários Cadastrados</h3>
      <ul>
        {funcionarios.map(func => <li key={func.id}>{func.nome} - {func.cargo}</li>)}
      </ul>
    </div>
  );
}