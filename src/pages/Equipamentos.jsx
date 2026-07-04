import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  useEffect(() => { carregarEquipamentos(); }, []);

  const carregarEquipamentos = async () => {
    try {
      const response = await equipamentoService.listar();
      if (response.data) setEquipamentos(response.data);
    } catch (error) { console.error("Erro ao buscar equipamentos", error); }
  };

  const salvar = async () => {
    if (!nome || !setor) return alert("Preencha todos os campos!");
    try {
      if (idEmEdicao) {
        await equipamentoService.atualizar(idEmEdicao, { nome, setor });
        alert("Equipamento atualizado com sucesso!");
      } else {
        await equipamentoService.criar({ nome, setor });
        alert("Equipamento cadastrado com sucesso!");
      }
      setNome('');
      setSetor('');
      setIdEmEdicao(null);
      carregarEquipamentos(); 
    } catch (error) { console.error("Erro ao salvar", error); }
  };

  const prepararEdicao = (eq) => {
    setNome(eq.nome);
    setSetor(eq.setor);
    setIdEmEdicao(eq.id);
  };

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      try {
        await equipamentoService.excluir(id);
        carregarEquipamentos();
      } catch (error) { console.error("Erro ao excluir", error); }
    }
  };

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-pagina">Gestão de Equipamentos</h1>
      
      <div className="form-box">
        <input 
          type="text" 
          placeholder="Nome do Equipamento" 
          className="input-elegante"
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Setor" 
          className="input-elegante"
          value={setor}
          onChange={(e) => setSetor(e.target.value)} 
        />
        <button onClick={salvar} className="btn-cadastrar">
          {idEmEdicao ? "Atualizar" : "Cadastrar"}
        </button>
        {idEmEdicao && (
          <button onClick={() => { setNome(''); setSetor(''); setIdEmEdicao(null); }} className="btn-excluir" style={{marginLeft: '10px'}}>
            Cancelar
          </button>
        )}
      </div>

      <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Equipamentos Cadastrados</h2>
      <div className="lista-grid">
        {equipamentos.map(eq => (
          <div key={eq.id} className="cartao-item">
            <p><strong>🚜 Equipamento:</strong> {eq.nome}</p>
            <p><strong>📍 Setor:</strong> {eq.setor}</p>
            <div className="botoes-acao">
              <button className="btn-editar" onClick={() => prepararEdicao(eq)}>Editar</button>
              <button className="btn-excluir" onClick={() => excluir(eq.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}