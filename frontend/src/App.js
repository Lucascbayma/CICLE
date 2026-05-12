import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Leaf, TreePine, Award, Lock } from 'lucide-react';

function App() {
  const [progresso, setProgresso] = useState({
    emissaoReduzida: 0,
    meta: 100,
    conquistas: []
  });

  useEffect(() => {
    // Busca os dados do seu backend Spring Boot
    axios.get('/api/gamificacao/status')
        .then(res => setProgresso(res.data))
        .catch(err => console.log("Aguardando API do Spring Boot..."));
  }, []);

  return (
      <div style={{ padding: '40px', backgroundColor: '#f0fdf4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#166534' }}>🌿 Engajamento Ambiental</h1>

        {/* Card de Progresso */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h3>Sua Redução: {progresso.emissaoReduzida}kg de CO2</h3>
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '10px', height: '20px' }}>
            <div style={{
              width: `${(progresso.emissaoReduzida / progresso.meta) * 100}%`,
              backgroundColor: '#22c55e', height: '100%', borderRadius: '10px', transition: 'width 0.5s'
            }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>Meta para o próximo colecionável: {progresso.meta}kg</p>
        </div>

        {/* Grid de Colecionáveis */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
          {progresso.conquistas.map((item, index) => (
              <div key={index} style={{
                background: item.desbloqueado ? '#fff' : '#f8fafc',
                padding: '20px', borderRadius: '12px', textAlign: 'center',
                border: item.desbloqueado ? '2px solid #22c55e' : '2px solid #e2e8f0'
              }}>
                {item.desbloqueado ? <TreePine size={48} color="#22c55e" /> : <Lock size={48} color="#cbd5e1" />}
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{item.nome}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;