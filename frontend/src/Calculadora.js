import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';
import SidebarMenu from './SidebarMenu';

function Calculadora() {
    const navigate = useNavigate();
    const [volume, setVolume] = useState(500000);
    const [percentualDigital, setPercentualDigital] = useState(87);
    const [percentualReciclado, setPercentualReciclado] = useState(20);
    const [resultado, setResultado] = useState(null);

    const percentualFisico = 100 - percentualDigital;

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
        <div className="login-background" style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '60px', paddingTop: '64px', boxSizing: 'border-box' }}>
            <SidebarMenu />

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '64px', backgroundColor: 'rgba(0,0,0,0.6)', position: 'fixed', left: '60px', right: 0, top: 0, zIndex: 100, boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
                <img src={logoImg} alt="Cicle Logo" style={{ height: '36px' }} />

                <h1 style={{ color: 'white', fontSize: '20px', fontWeight: '700', margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
                    Calculadora Ambiental
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '999px', padding: '7px 14px 7px 12px' }}>
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Olá, Empresa!</span>
                    <UserCircle size={22} color="rgba(255,255,255,0.75)" strokeWidth={1.6} />
                </div>
            </header>

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
                            <div className="input-group" style={{ marginBottom: '35px' }}>
                                <label style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '16px' }}>Volume Total de Transações (Anual)</label>
                                <input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} style={{ fontSize: '18px' }} required />
                            </div>

                            <div style={{ marginBottom: '35px' }}>
                                <div style={{ position: 'relative', height: '46px', borderRadius: '25px', backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${percentualDigital}%`, backgroundColor: '#8ab493', borderRadius: '25px', transition: 'width 0.15s ease' }} />
                                    <span style={{ position: 'absolute', left: '15px', color: percentualDigital > 15 ? 'white' : '#8ab493', fontWeight: 'bold', fontSize: '20px', zIndex: 2, transition: 'color 0.15s ease' }}>{percentualDigital}%</span>
                                    <div style={{ position: 'absolute', left: `clamp(4px, calc(${percentualDigital}% - 18px), calc(100% - 40px))`, width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '50%', border: '2px solid #8ab493', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, transition: 'left 0.15s ease' }}>
                                        <span style={{ color: '#8ab493', fontSize: '18px' }}>📱</span>
                                    </div>
                                    <span style={{ position: 'absolute', right: '15px', color: '#8ab493', fontWeight: 'bold', fontSize: '14px', zIndex: 1 }}>Uso Digital</span>
                                    <input type="range" min="0" max="100" value={percentualDigital} onChange={(e) => setPercentualDigital(Number(e.target.value))} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 4 }} />
                                </div>

                                <div style={{ position: 'relative', height: '46px', borderRadius: '25px', backgroundColor: '#fdfdfd', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${percentualFisico}%`, backgroundColor: '#ff6347', borderRadius: '25px', transition: 'width 0.15s ease' }} />
                                    <span style={{ position: 'absolute', left: '15px', color: percentualFisico > 15 ? 'white' : '#ff6347', fontWeight: 'bold', fontSize: '20px', zIndex: 2, transition: 'color 0.15s ease' }}>{percentualFisico}%</span>
                                    <div style={{ position: 'absolute', left: `clamp(4px, calc(${percentualFisico}% - 18px), calc(100% - 40px))`, width: '36px', height: '36px', backgroundColor: 'white', borderRadius: '50%', border: '2px solid #ff6347', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, transition: 'left 0.15s ease' }}>
                                        <span style={{ color: '#ff6347', fontSize: '18px' }}>💳</span>
                                    </div>
                                    <span style={{ position: 'absolute', right: '15px', color: '#ff6347', fontWeight: 'bold', fontSize: '14px', zIndex: 1 }}>Uso Físico</span>
                                    <input type="range" min="0" max="100" value={percentualFisico} onChange={(e) => setPercentualDigital(100 - Number(e.target.value))} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 4 }} />
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: '30px', opacity: percentualDigital === 100 ? 0.3 : 1, pointerEvents: percentualDigital === 100 ? 'none' : 'auto', transition: 'opacity 0.3s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label style={{ color: '#72bca1', fontWeight: 'bold' }}>Cartões Sustentáveis (Reciclado): {percentualReciclado}%</label>
                                </div>
                                <input type="range" min="0" max="100" value={percentualReciclado} onChange={(e) => setPercentualReciclado(Number(e.target.value))} style={{ width: '100%', margin: '15px 0', padding: 0, accentColor: '#72bca1', display: 'block' }} disabled={percentualDigital === 100} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                    <span>PVC Padrão</span>
                                    <span>PVC Reciclado</span>
                                </div>
                                {percentualDigital === 100 && (
                                    <span style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '10px', display: 'block', fontWeight: 'bold' }}>Bloqueado: Uso Digital está em 100%</span>
                                )}
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