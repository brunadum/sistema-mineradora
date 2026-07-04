import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  useEffect(() => { carregarFuncionarios(); }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      if (response.data) setFuncionarios(response.data);
    } catch (error) { console.error("Erro ao buscar", error); }
  };

  const salvar = async () => {
    if (!nome) return alert("Preencha o nome!");
    try {
      if (idEmEdicao) {
        await funcionarioService.atualizar(idEmEdicao, { nome });
        alert("Funcionário atualizado com sucesso!");
      } else {
        await funcionarioService.criar({ nome });
        alert("Funcionário cadastrado com sucesso!");
      }
      setNome('');
      setIdEmEdicao(null);
      carregarFuncionarios(); 
    } catch (error) { console.error("Erro ao salvar", error); }
  };

  const prepararEdicao = (func) => {
    setNome(func.nome);
    setIdEmEdicao(func.id);
  };

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      try {
        await funcionarioService.excluir(id);
        carregarFuncionarios();
      } catch (error) { console.error("Erro ao excluir", error); }
    }
  };

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-pagina">Gestão de Funcionários</h1>
      
      <div className="form-box">
        <input 
          type="text" 
          placeholder="Nome do Funcionário" 
          className="input-elegante"
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <button onClick={salvar} className="btn-cadastrar">
          {idEmEdicao ? "Atualizar" : "Cadastrar"}
        </button>
        {idEmEdicao && (
          <button onClick={() => { setNome(''); setIdEmEdicao(null); }} className="btn-excluir" style={{marginLeft: '10px'}}>
            Cancelar
          </button>
        )}
      </div>

      <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Funcionários Cadastrados</h2>
      <div className="lista-grid">
        {funcionarios.map(func => (
          <div key={func.id} className="cartao-item">
            <p><strong>👷🏽‍♂️ Nome:</strong> {func.nome}</p>
            <div className="botoes-acao">
              <button className="btn-editar" onClick={() => prepararEdicao(func)}>Editar</button>
              <button className="btn-excluir" onClick={() => excluir(func.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}