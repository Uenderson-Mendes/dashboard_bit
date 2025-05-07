// src/components/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importa o CSS externo

const App = () => {
  const [dados, setDados] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  const fetchDados = async () => {
    try {
      const response = await axios.get('https://api-node-dash-bitdoglab.onrender.com/dados/');
      
      // Ordena os dados por data (mais recente primeiro)
      const dadosOrdenados = response.data.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
      const ultimoDado = dadosOrdenados[0];

      setDados(ultimoDado);
      setUltimaAtualizacao(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchDados();
    const interval = setInterval(fetchDados, 100); // Atualiza a cada 1 segundo
    return () => clearInterval(interval);
  }, []);

  const getButtonColor = (estado) => {
    return estado === 'pressionado' ? 'green' : 'red';
  };

  return (
    <div className="app">
    <div className="app-container">
      <h1 className="titulo">📊 Últimos Dados do Sistema</h1>
      
      <div className="cards-container">
    
{/* Card de Temperatura */}
<div className={`card card-temperatura ${dados ? (dados.temperatura > 30 ? 'quente' : dados.temperatura < 15 ? 'frio' : 'morno') : ''}`}>
  <div className="card-header">
    <h5>Temperatura</h5>
  </div>
  <div className="card-body">
    {dados ? (
      <>
        <p><strong>🌡️ Temperatura:</strong> {dados.temperatura} °C</p>
        <div className={`temperatura-indicador ${dados.temperatura > 30 ? 'quente' : dados.temperatura < 15 ? 'frio' : 'morno'}`}></div>
      </>
    ) : (
      <div className="loading-spinner"></div>
    )}
  </div>
</div>

<div className="card-joystick-direcao">
  <div className="card-headerj">
    Rosa dos ventos
  </div>
  <div className="card-body">
    {dados ? (
      <>
        <div className="joystick-valores">
          <div><strong>🅧:</strong> {dados.joystick?.x}</div>
          <div><strong>🅨:</strong> {dados.joystick?.y}</div>
        </div>
        <div className="bussola-container">
          <div className={`bussola bussola-${dados.joystick?.direcao?.toLowerCase() || ''}`}>
            <div className="ponteiro"></div>
          </div>
          <p className="direcao-texto">🧭 {dados.joystick?.direcao || 'Desconhecido'}</p>
        </div>
      </>
    ) : (
      <p>Carregando dados...</p>
    )}
  </div>
</div>

        {/* Card de Botões (Botão 1 e Botão 2) */}
        <div className="card-bt">
   
          <div className="card-headerbt">
            
            <h5>Botões</h5>
           </div>
           <div className="card-body">
           <hr />
            {dados ? (
              <>
                <p>
                 
                  <span
                    className="botao"
                    style={{ backgroundColor: getButtonColor(dados.botao1) }}
                  >
                    {dados.botao1 === 'pressionado' ? ' 🔘Botão 1 ON' : '🔘Botão 1 OFF'}
                  </span>
                </p>
                <p>
               
                  <span
                    className="botao"
                    style={{ backgroundColor: getButtonColor(dados.botao2) }}
                  >
                    {dados.botao2 === 'pressionado' ? '🔘 Botão 2 ON' : '🔘Botão 2 OFF'}
                  </span>
                </p>
              </>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        </div>
      </div>

   
    </div>
       {/* Linha de ID e Atualização */}
       <div className="info-line">
        {dados && ultimaAtualizacao ? (
          <>
     
            <p><em>⏱️ Atualizado às {ultimaAtualizacao}</em></p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
     </div>
  );
};

export default App;
