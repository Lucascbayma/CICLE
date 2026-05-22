import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function Calculadora() {
    const navigate = useNavigate();
    const [volume, setVolume] = useState(500000);
    const [percentualDigital, setPercentualDigital] = useState(60);
    const [percentualReciclado, setPercentualReciclado] = useState(20);
    const [resultado, setResultado] = useState(null);

    const calcularImpacto = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/calculadora/simular', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    volumeTransacoes: volume,
                    percentualDigital: percentualDigital,
                    percentualReciclado: percentualReciclado
                })
            });
            const data = await response.json();
            setResultado(data);
        } catch (error) {
            console.error(error);
        }
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
                        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Painel ESG</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.4' }}>Simulação baseada em premissas técnicas Edenred</p>
                    </div>
                    <button onClick={() => navigate('/empresa')} className="login-button" style={{ backgroundColor: '#ff6b6b', width: '100%', border: 'none' }}>Voltar para a Empresa</button>
                </div>

                <div style={{ flex: 1, padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', gap: '40px', overflowY: 'auto' }}>
                    
                    <div style={{ flex: 1.2 }}>
                        <h2 style={{ color: 'white', marginBottom: '35px', fontSize: '32px' }}>Gestão de Carbono</h2>
                        <form className="login-form" onSubmit={calcularImpacto} style={{ width: '100%', margin: 0 }}>
                            <div className="input-group" style={{ marginBottom: '30px' }}>
                                <label style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '16px' }}>Volume Total de Transações (Anual)</label>
                                <input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} style={{ fontSize: '18px' }} required />
                            </div>

                            <div className="input-group" style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ color: '#72bca1', fontWeight: 'bold' }}>Mix Digital: {percentualDigital}%</label>
                                </div>
                                <input type="range" min="0" max="100" value={percentualDigital} onChange={(e) => setPercentualDigital(Number(e.target.value))} style={{ width: '100%', margin: '15px 0', padding: 0, accentColor: '#72bca1', display: 'block' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                    <span>Físico (Cartão)</span>
                                    <span>Digital (App/NFC)</span>
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: '30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ color: '#72bca1', fontWeight: 'bold' }}>Cartões Sustentáveis (Reciclado): {percentualReciclado}%</label>
                                </div>
                                <input type="range" min="0" max="100" value={percentualReciclado} onChange={(e) => setPercentualReciclado(Number(e.target.value))} style={{ width: '100%', margin: '15px 0', padding: 0, accentColor: '#72bca1', display: 'block' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                    <span>PVC Padrão</span>
                                    <span>PVC Reciclado</span>
                                </div>
                            </div>

                            <button type="submit" className="login-button" style={{ marginTop: '10px', height: '60px', fontSize: '18px' }}>Simular Resultados ESG</button>
                        </form>
                    </div>

                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: '20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: '#72bca1', marginTop: 0, marginBottom: '30px', fontSize: '24px' }}>Relatório Consolidado</h3>
                        {resultado ? (
                            <div style={{ color: 'white' }}>
                                <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0' }}>Pegada de Carbono Atual</p>
                                    <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>{resultado.emissoesCenarioAtual.toFixed(2)} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO2e</span></p>
                                </div>
                                <div style={{ marginBottom: '30px' }}>
                                    <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0' }}>Referência (100% Físico Padrão)</p>
                                    <p style={{ fontSize: '22px', margin: 0, opacity: 0.9 }}>{resultado.emissoesCenario100Fisico.toFixed(2)} kg CO2e</p>
                                </div>
                                <div style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(114, 188, 161, 0.35) 0%, rgba(29, 92, 66, 0.35) 100%)', borderRadius: '20px', border: '1px solid #72bca1', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                    <p style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '14px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Economizado</p>
                                    <p style={{ fontSize: '56px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#72bca1', lineHeight: '1' }}>{resultado.carbonoEconomizado.toFixed(1)}</p>
                                    <p style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '15px', margin: 0, color: '#ffffff' }}>
                                        <span style={{ fontSize: '32px' }}>🌳</span> Isso equivale a {resultado.arvoresSalvas} árvores!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.4, color: 'white', textAlign: 'center' }}>
                                <div style={{ fontSize: '60px', marginBottom: '20px' }}>📊</div>
                                <p style={{ fontSize: '18px' }}>Altere os parâmetros e clique em simular para ver o balanço ambiental.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Calculadora;