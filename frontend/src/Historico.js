import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function Historico() {
    const navigate = useNavigate();
    const [dataAtual, setDataAtual] = useState('');
    const [calculos, setCalculos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const buscarHistorico = async () => {
        try {
            setCarregando(true);

            const response = await fetch('http://localhost:8080/api/calculos/usuario/1');

            if (!response.ok) {
                throw new Error('Erro ao buscar histórico');
            }

            const data = await response.json();
            setCalculos(data);
            setErro('');
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
            setErro('Não foi possível carregar o histórico.');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mesAtual = hoje.toLocaleString('pt-BR', { month: 'long' });
        const ultimoDia = new Date(ano, hoje.getMonth() + 1, 0).getDate();

        setDataAtual(`01 de ${mesAtual} a ${ultimoDia} de ${mesAtual} de ${ano}`);
        buscarHistorico();
    }, []);

    const emissaoMes = calculos.reduce((total, item) => {
        return total + (item.emissaoTotal || 0);
    }, 0);

    const cashbackTotal = calculos.reduce((total, item) => {
        return total + (item.cashback || 0);
    }, 0);

    const carbonoEvitado = Math.max(0, (calculos.length * 400) - emissaoMes);

    const dadosHistorico = calculos.slice(0, 4).reverse().map((item, index) => ({
        mes: `Cálculo ${index + 1}`,
        emitido: item.emissaoTotal || 0,
        evitado: Math.max(0, 400 - (item.emissaoTotal || 0)),
        meta: 120
    }));

    const maxEvitado = Math.max(
        1,
        ...dadosHistorico.map(d => Math.max(d.evitado, d.emitido))
    );

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

                    {carregando && (
                        <p style={{ color: '#72bca1', marginBottom: '20px' }}>
                            Carregando histórico...
                        </p>
                    )}

                    {erro && (
                        <p style={{ color: '#ff6b6b', marginBottom: '20px' }}>
                            {erro}
                        </p>
                    )}

                    {!carregando && calculos.length === 0 && (
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
                            Nenhum cálculo salvo ainda. Faça um cálculo ambiental e clique em salvar.
                        </p>
                    )}
                    
                    <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
                        <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ opacity: 0.7, fontSize: '14px', margin: '0 0 8px 0', color: 'white' }}>Emissão Acumulada no Mês</p>
                            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#ff6b6b' }}>{emissaoMes.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO₂e</span></p>
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'rgba(114, 188, 161, 0.15)', padding: '25px', borderRadius: '15px', border: '1px solid #72bca1' }}>
                            <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#72bca1', fontWeight: 'bold' }}>Carbono Evitado Oficial</p>
                            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, color: '#72bca1' }}>{carbonoEvitado.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} <span style={{fontSize: '18px', fontWeight: 'normal'}}>kg CO₂e</span></p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: 'white', margin: '0 0 30px 0', fontSize: '20px' }}>Evolução da Pegada de Carbono (Últimos Meses)</h3>
                        
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flex: 1, paddingTop: '20px' }}>
                            {dadosHistorico.length > 0 ? dadosHistorico.map((item, index) => {
                                const heightEvitado = (item.evitado / maxEvitado) * 100;
                                const heightEmitido = (item.emitido / maxEvitado) * 100;

                                return (
                                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', height: '200px', marginBottom: '15px' }}>

                                            <div style={{ width: '40px', height: `${heightEmitido}%`, backgroundColor: '#ff6b6b', borderRadius: '6px 6px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                                <span style={{ position: 'absolute', top: '-25px', color: '#ff6b6b', fontSize: '12px', fontWeight: 'bold' }}>
                                                    {item.emitido.toFixed(1)}
                                                </span>
                                                                        </div>

                                                                        <div style={{ width: '40px', height: `${heightEvitado}%`, backgroundColor: '#72bca1', borderRadius: '6px 6px 0 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                                <span style={{ position: 'absolute', top: '-25px', color: '#72bca1', fontSize: '12px', fontWeight: 'bold' }}>
                                                    {item.evitado.toFixed(1)}
                                                </span>
                                                                        </div>

                                                                    </div>
                                                                    <span style={{ color: 'white', fontWeight: 'normal', fontSize: '14px' }}>
                                            {item.mes}
                                        </span>
                                    </div>
                                );
                            }) : (
                                <div style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', width: '100%', alignSelf: 'center' }}>
                                    Nenhum dado disponível para montar o gráfico.
                                </div>
                            )}
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