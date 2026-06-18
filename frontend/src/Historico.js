import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function Historico() {
    const navigate = useNavigate();
    const [dataAtual, setDataAtual] = useState('');

    useEffect(() => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mesAtual = hoje.toLocaleString('pt-BR', { month: 'long' });
        const ultimoDia = new Date(ano, hoje.getMonth() + 1, 0).getDate();
        
        setDataAtual(`01 de ${mesAtual} a ${ultimoDia} de ${mesAtual} de ${ano}`);
    }, []);

    const dadosHistorico = [
        { mes: 'Março', emitido: 1850.2, evitado: 2100.5, meta: 1900 },
        { mes: 'Abril', emitido: 1620.0, evitado: 2950.0, meta: 1900 },
        { mes: 'Maio', emitido: 1540.8, evitado: 3420.0, meta: 1900 },
        { mes: 'Junho (Atual)', emitido: 1425.5, evitado: 3774.5, meta: 1900 }
    ];

    const maxEvitado = Math.max(...dadosHistorico.map(d => d.evitado));

    return (
        <div className="login-background" style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="aurora-wrapper">
                <Aurora colorStops={["#72bca1","#1d5c42","#7ea488"]} blend={0.5} amplitude={1.0} speed={1} />
            </div>

            <div className="glass-container" style={{ width: '95%', height: '90%', maxWidth: '1400px', display: 'flex', flexDirection: 'row', overflow: 'hidden', borderRadius: '20px' }}>
                
                <div style={{ flex: '0 0 320px', background: 'linear-gradient(180deg, #1d5c42 0%, #72bca1 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <div style={{ background: 'white', padding: '15px', borderRadius: '15px', marginBottom: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            <img src={logoImg} alt="Logo Cicle" style={{ width: '160px' }} />
                        </div>
                        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Painel ESG</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.4' }}>Análise de dados contínuos para o atingimento das metas ambientais.</p>
                    </div>
                    <button onClick={() => navigate('/empresa')} className="login-button" style={{ backgroundColor: '#ff6b6b', width: '100%', border: 'none' }}>Voltar para o Painel</button>
                </div>

                <div style={{ flex: 1, padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    
                    <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '32px' }}>Histórico e Evolução</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '35px', fontSize: '16px', textTransform: 'capitalize' }}>Ciclo atual: {dataAtual}</p>
                    
                    <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                        <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0', color: 'white' }}>Emissão Acumulada no Mês</p>
                            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#ff6b6b' }}>{dadosHistorico[3].emitido.toLocaleString('pt-BR')} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO₂e</span></p>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'rgba(114, 188, 161, 0.15)', padding: '25px', borderRadius: '15px', border: '1px solid #72bca1' }}>
                            <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#72bca1', fontWeight: 'bold' }}>Carbono Evitado Oficial</p>
                            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#72bca1' }}>{dadosHistorico[3].evitado.toLocaleString('pt-BR')} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO₂e</span></p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: 'white', margin: '0 0 30px 0', fontSize: '20px' }}>Evolução da Pegada de Carbono (Últimos Meses)</h3>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, paddingTop: '20px' }}>
                            {dadosHistorico.map((item, index) => {
                                const heightEvitado = (item.evitado / maxEvitado) * 100;
                                const heightEmitido = (item.emitido / maxEvitado) * 100;
                                
                                return (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', height: '200px', marginBottom: '15px' }}>
                                            
                                            <div style={{ width: '40px', height: `${heightEmitido}%`, backgroundColor: '#ff6b6b', borderRadius: '6px 6px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                                <span style={{ position: 'absolute', top: '-25px', color: '#ff6b6b', fontSize: '12px', fontWeight: 'bold' }}>{item.emitido}</span>
                                            </div>

                                            <div style={{ width: '40px', height: `${heightEvitado}%`, backgroundColor: '#72bca1', borderRadius: '6px 6px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                                <span style={{ position: 'absolute', top: '-25px', color: '#72bca1', fontSize: '12px', fontWeight: 'bold' }}>{item.evitado}</span>
                                            </div>
                                            
                                        </div>
                                        <span style={{ color: 'white', fontWeight: item.mes.includes('Atual') ? 'bold' : 'normal', fontSize: '14px' }}>{item.mes}</span>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '15px', height: '15px', backgroundColor: '#ff6b6b', borderRadius: '3px' }} />
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Emissões Geradas</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '15px', height: '15px', backgroundColor: '#72bca1', borderRadius: '3px' }} />
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Carbono Evitado</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Historico;