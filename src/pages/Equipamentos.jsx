import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';
import Equipamento from '../components/Equipamento';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');

  useEffect(() => {
    carregarEquipamentos();
  }, []);

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.listar();
      if (response.data) {
        setEquipamentos(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !setor) return alert("Preencha todos os campos!");
    
    try {
      await equipamentoService.criar({ nome, setor });
      setNome('');
      setSetor('');
      carregarEquipamentos(); 
      alert("Equipamento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>
      
      <div style={{ marginBottom: '20px', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
        <h3>Novo Equipamento</h3>
        <input 
          type="text" 
          placeholder="Nome do Equipamento" 
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
          style={{ marginRight: '10px', padding: '5px' }} 
        />
        <input 
          type="text" 
          placeholder="Setor" 
          value={setor}
          onChange={(e) => setSetor(e.target.value)} 
          style={{ marginRight: '10px', padding: '5px' }} 
        />
        <button onClick={cadastrar} className="counter">Cadastrar</button>
      </div>

      <h3>Equipamentos Cadastrados</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {equipamentos.map(eq => (
          <Equipamento 
            key={eq.id} 
            nome={eq.nome} 
            setor={eq.setor} 
          />
        ))}
      </div>
    </div>
  );
}