import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function Floresta() {
    const navigate = useNavigate();

    const dadosReais = {
        volumeTotal: 1500000,
        digitalPercent: 80,
        digitalTotal: 1200000,
        fisicoPercent: 20,
        fisicoTotal: 300000,
        recicladoPercent: 70,
        recicladoTotal: 210000,
        padraoPercent: 30,
        padraoTotal: 90000,
        emissoesCenarioAtual: 1425.50,
        emissoesCenario100Fisico: 5200.00,
        carbonoEconomizado: 3774.50,
        arvoresSalvas: 1240
    };

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
                        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Dados Oficiais</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.4' }}>Cálculo real de impacto baseado nas transações processadas pela Edenred no mês atual.</p>
                    </div>
                    <button onClick={() => navigate('/empresa')} className="login-button" style={{ backgroundColor: '#ff6b6b', width: '100%', border: 'none' }}>Voltar para o Painel</button>
                </div>

                <div style={{ flex: 1, padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', gap: '40px', overflowY: 'auto' }}>
                    
                    <div style={{ flex: 1.2 }}>
                        <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '32px' }}>Memória de Cálculo</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '35px', fontSize: '16px' }}>Entenda como sua economia de carbono foi convertida em árvores preservadas.</p>
                        
                        <div style={{ width: '100%', margin: 0 }}>
                            <div className="input-group" style={{ marginBottom: '35px' }}>
                                <label style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '16px' }}>Volume Total de Transações (Mês Atual)</label>
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '8px', color: 'white', fontSize: '24px', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    {dadosReais.volumeTotal.toLocaleString('pt-BR')}
                                </div>
                            </div>

                            <div style={{ marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '14px' }}>Meios de Pagamento Utilizados</label>
                                </div>
                                <div style={{ position: 'relative', height: '46px', borderRadius: '25px', backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${dadosReais.digitalPercent}%`, backgroundColor: '#8ab493', borderRadius: '25px' }} />
                                    <span style={{ position: 'absolute', left: '15px', color: 'white', fontWeight: 'bold', fontSize: '20px', zIndex: 2 }}>{dadosReais.digitalPercent}%</span>
                                    <span style={{ position: 'absolute', right: '15px', color: '#8ab493', fontWeight: 'bold', fontSize: '14px', zIndex: 1 }}>{dadosReais.digitalTotal.toLocaleString('pt-BR')} Digitais (NFC/App)</span>
                                </div>

                                <div style={{ position: 'relative', height: '46px', borderRadius: '25px', backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${dadosReais.fisicoPercent}%`, backgroundColor: '#ff6347', borderRadius: '25px' }} />
                                    <span style={{ position: 'absolute', left: '15px', color: 'white', fontWeight: 'bold', fontSize: '20px', zIndex: 2 }}>{dadosReais.fisicoPercent}%</span>
                                    <span style={{ position: 'absolute', right: '15px', color: '#ff6347', fontWeight: 'bold', fontSize: '14px', zIndex: 1 }}>{dadosReais.fisicoTotal.toLocaleString('pt-BR')} Físicas (Cartão)</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <label style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '14px' }}>Composição da Frota Física</label>
                                </div>
                                <div style={{ position: 'relative', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${dadosReais.recicladoPercent}%`, backgroundColor: '#72bca1', borderRadius: '8px', opacity: 0.8 }} />
                                    <span style={{ position: 'absolute', left: '15px', color: 'white', fontWeight: 'bold', fontSize: '16px', zIndex: 2 }}>PVC Reciclado ({dadosReais.recicladoPercent}%)</span>
                                    <span style={{ position: 'absolute', right: '15px', color: 'white', fontSize: '14px', zIndex: 2 }}>{dadosReais.recicladoTotal.toLocaleString('pt-BR')}</span>
                                </div>

                                <div style={{ position: 'relative', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${dadosReais.padraoPercent}%`, backgroundColor: '#ff6b6b', borderRadius: '8px', opacity: 0.8 }} />
                                    <span style={{ position: 'absolute', left: '15px', color: 'white', fontWeight: 'bold', fontSize: '16px', zIndex: 2 }}>PVC Padrão ({dadosReais.padraoPercent}%)</span>
                                    <span style={{ position: 'absolute', right: '15px', color: 'white', fontSize: '14px', zIndex: 2 }}>{dadosReais.padraoTotal.toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: '30px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: '#72bca1', marginTop: 0, marginBottom: '30px', fontSize: '24px' }}>Relatório Oficial Edenred</h3>
                        
                        <div style={{ color: 'white' }}>
                            <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0' }}>Emissão Real (Mês Atual)</p>
                                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>{dadosReais.emissoesCenarioAtual.toLocaleString('pt-BR')} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO₂e</span></p>
                            </div>
                            
                            <div style={{ marginBottom: '30px' }}>
                                <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0' }}>Emissão Base (Se 100% fosse Físico Padrão)</p>
                                <p style={{ fontSize: '22px', margin: 0, opacity: 0.9 }}>{dadosReais.emissoesCenario100Fisico.toLocaleString('pt-BR')} kg CO₂e</p>
                            </div>
                            
                            <div style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(114, 188, 161, 0.35) 0%, rgba(29, 92, 66, 0.35) 100%)', borderRadius: '20px', border: '1px solid #72bca1', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                <p style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '14px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Evitado Oficial</p>
                                <p style={{ fontSize: '56px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#72bca1', lineHeight: '1' }}>{dadosReais.carbonoEconomizado.toLocaleString('pt-BR')}</p>
                                <p style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '15px', margin: 0, color: '#ffffff' }}>
                                    <span style={{ fontSize: '32px' }}>🌳</span> Isso equivale a {dadosReais.arvoresSalvas.toLocaleString('pt-BR')} árvores!
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Floresta;