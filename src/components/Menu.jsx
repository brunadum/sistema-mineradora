import React from 'react';

function Menu(props) {
    return (
        <div className="menu" style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
            <button onClick={() => props.mudarPagina("inicio")} style={{ marginRight: '10px' }}>Início</button>
            <button onClick={() => props.mudarPagina("equipamentos")} style={{ marginRight: '10px' }}>Equipamentos</button>
            <button onClick={() => props.mudarPagina("cidades")} style={{ marginRight: '10px' }}>Cidades</button>
            <button onClick={() => props.mudarPagina("funcionarios")} style={{ marginRight: '10px' }}>Funcionários</button>
            <button onClick={() => props.mudarPagina("servicos")}>Serviços</button>
        </div>
    );
}

export default Menu;