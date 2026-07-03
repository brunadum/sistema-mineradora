import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => { carregarServicos(); }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      if (response.data) setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar", error);
    }
  };

  const cadastrar = async () => {
    if (!descricao || !valor) return alert("Preencha todos os campos!");
    try {
      await servicoService.criar({ descricao, valor });
      setDescricao(''); 
      setValor('');
      carregarServicos();
      alert("Serviço cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar serviço.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gestão de Serviços</h2>
      <div style={{ marginBottom: '20px', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
        <input type="text" placeholder="Descrição do Serviço" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <input type="number" placeholder="Valor (R$)" value={valor} onChange={(e) => setValor(e.target.value)} style={{ marginRight: '10px', padding: '5px' }} />
        <button onClick={cadastrar} className="counter">Cadastrar</button>
      </div>
      <h3>Serviços Cadastrados</h3>
      <ul>
        {servicos.map(srv => <li key={srv.id}>{srv.descricao} - R$ {srv.valor}</li>)}
      </ul>
    </div>
  );
}