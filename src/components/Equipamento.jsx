import "./Equipamento.css"

function Equipamento(props){
    return (
    <div className="pagina-cadastro">
      <h1 className="titulo-pagina">Gestão de Equipamentos</h1>

      <div className="form-box">
        <input 
          type="text" 
          className="input-elegante"
          placeholder="Digite o setor..." 
          value={setor} 
          onChange={(e) => setSetor(e.target.value)} 
        />
        <button className="btn-cadastrar" onClick={cadastrar}>
          Cadastrar
        </button>
      </div>

      <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Equipamentos Cadastrados</h2>
      
      <div className="lista-grid">
        {lista.map((item) => (
          <div key={item.id} className="cartao-item">
            <p><strong>Setor:</strong> {item.setor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Equipamento
