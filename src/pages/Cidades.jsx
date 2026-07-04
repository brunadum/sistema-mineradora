import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null); // NOVO: Controla a edição

  useEffect(() => { carregarCidades(); }, []);

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      if (response.data) setCidades(response.data);
    } catch (error) { console.error("Erro ao buscar", error); }
  };

  const salvar = async () => {
    if (!nome) return alert("Preencha o nome da cidade!");
    try {
      if (idEmEdicao) {
        await cidadeService.atualizar(idEmEdicao, { nome });
        alert("Cidade atualizada com sucesso!");
      } else {
        await cidadeService.criar({ nome });
        alert("Cidade cadastrada com sucesso!");
      }
      setNome('');
      setIdEmEdicao(null);
      carregarCidades(); 
    } catch (error) { console.error("Erro ao salvar", error); }
  };

  const prepararEdicao = (cidade) => {
    setNome(cidade.nome);
    setIdEmEdicao(cidade.id);
  };

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta cidade?")) {
      try {
        await cidadeService.excluir(id);
        carregarCidades();
      } catch (error) { console.error("Erro ao excluir", error); }
    }
  };

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-pagina">Gestão de Cidades</h1>
      
      <div className="form-box">
        <input 
          type="text" 
          placeholder="Nome da Cidade" 
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

      <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Cidades Cadastradas</h2>
      <div className="lista-grid">
        {cidades.map(cidade => (
          <div key={cidade.id} className="cartao-item">
            <p><strong>🗺️ Cidade:</strong> {cidade.nome}</p>
            <div className="botoes-acao">
              <button className="btn-editar" onClick={() => prepararEdicao(cidade)}>Editar</button>
              <button className="btn-excluir" onClick={() => excluir(cidade.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}