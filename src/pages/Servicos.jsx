import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  useEffect(() => { carregarServicos(); }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      if (response.data) setServicos(response.data);
    } catch (error) { console.error("Erro ao buscar", error); }
  };

  const salvar = async () => {
    if (!descricao) return alert("Preencha a descrição!");
    try {
      if (idEmEdicao) {
        await servicoService.atualizar(idEmEdicao, { descricao });
        alert("Serviço atualizado com sucesso!");
      } else {
        await servicoService.criar({ descricao });
        alert("Serviço cadastrado com sucesso!");
      }
      setDescricao('');
      setIdEmEdicao(null);
      carregarServicos(); 
    } catch (error) { console.error("Erro ao salvar", error); }
  };

  const prepararEdicao = (serv) => {
    setDescricao(serv.descricao);
    setIdEmEdicao(serv.id);
  };

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await servicoService.excluir(id);
        carregarServicos();
      } catch (error) { console.error("Erro ao excluir", error); }
    }
  };

  return (
    <div className="pagina-cadastro">
      <h1 className="titulo-pagina">Gestão de Serviços</h1>
      
      <div className="form-box">
        <input 
          type="text" 
          placeholder="Descrição do Serviço" 
          className="input-elegante"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)} 
        />
        <button onClick={salvar} className="btn-cadastrar">
          {idEmEdicao ? "Atualizar" : "Cadastrar"}
        </button>
        {idEmEdicao && (
          <button onClick={() => { setDescricao(''); setIdEmEdicao(null); }} className="btn-excluir" style={{marginLeft: '10px'}}>
            Cancelar
          </button>
        )}
      </div>

      <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Serviços Cadastrados</h2>
      <div className="lista-grid">
        {servicos.map(serv => (
          <div key={serv.id} className="cartao-item">
            <p><strong>⚙️ Serviço:</strong> {serv.descricao}</p>
            <div className="botoes-acao">
              <button className="btn-editar" onClick={() => prepararEdicao(serv)}>Editar</button>
              <button className="btn-excluir" onClick={() => excluir(serv.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}