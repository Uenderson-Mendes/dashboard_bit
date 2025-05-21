import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import './App.css';

const App = () => {
  const [dados, setDados] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get('https://api-node-dash-bitdoglab.vercel.app/dados');
        // Pega os 24 registros mais recentes
        const dadosOrdenados = response.data
          .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
          .slice(0, 24);

        const ultimoDado = dadosOrdenados[0];

        setDados(ultimoDado);
        setUltimaAtualizacao(new Date().toLocaleTimeString());

        // Prepara o histórico para o gráfico (ordem do mais antigo para o mais recente)
        const historicoFiltrado = dadosOrdenados
          .map(item => ({
            temperatura: item.temperatura,
            hora: new Date(item.criado_em).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }))
          .reverse();

        setHistorico(historicoFiltrado);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchDados();
    const interval = setInterval(fetchDados, 1000);

    return () => clearInterval(interval);
  }, []);

  const getButtonColor = (estado) => {
    return estado === 'pressionado' ? 'green' : 'red';
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🌐 Monitor BitDog</div>
      </nav>

      <div className="app-container">
        <h1 className="titulo">📊 Últimos Dados do Sistema</h1>

        <div className="cards-container">
          {/* Card de Temperatura */}
          <div id="temperatura" className={`card card-temperatura ${dados ? (dados.temperatura > 30 ? 'quente' : dados.temperatura < 15 ? 'frio' : 'morno') : ''}`}>
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

          {/* Card Joystick Direção */}
          <div id="joystick" className="card-joystick-direcao">
            <div className="card-headerj">Rosa dos ventos</div>
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

          {/* Card de Botões */}
          <div id="botoes" className="card-bt">
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

        {/* Gráfico de Temperatura */}
        <div id="grafico" className="grafico-container">
          <h3>📈 Variação de Temperatura (últimos 24 registros)</h3>
          {historico.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="temperatura" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>Carregando gráfico...</p>
          )}
        </div><br />

        {/* Linha de ID e Atualização */}
        <div className="info-line">
          {dados && ultimaAtualizacao ? (
            <p><em>⏱️ Atualizado às {ultimaAtualizacao}</em></p>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
