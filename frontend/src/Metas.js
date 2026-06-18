import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from './cicle.png';
import SidebarMenu from './SidebarMenu';

const API = 'http://localhost:8080';
const USER_ID = 1;

function Metas() {
    const navigate = useNavigate();
    const [progresso, setProgresso] = useState(null);
    const [metaAtual, setMetaAtual] = useState(null);
    const [novoLimite, setNovoLimite] = useState('');
    const [loading, setLoading] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const fetchDados = useCallback(async () => {
        setLoading(true);
        try {
            const [progressoRes, metasRes] = await Promise.all([
                fetch(`${API}/api/metas/usuario/${USER_ID}/progresso`),
                fetch(`${API}/api/metas/usuario/${USER_ID}`)
            ]);
            if (progressoRes.ok) setProgresso(await progressoRes.json());
            if (metasRes.ok) {
                const metas = await metasRes.json();
                const now = new Date();
                const mes = now.getMonth() + 1;
                const ano = now.getFullYear();
                setMetaAtual(metas.find(m => m.mes === mes && m.ano === ano) || null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchDados(); }, [fetchDados]);

    const salvarMeta = async () => {
        if (!novoLimite || parseFloat(novoLimite) <= 0) return;
        setSalvando(true);
        try {
            if (metaAtual) {
                await fetch(`${API}/api/metas/${metaAtual.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ limiteKgCO2Mensal: parseFloat(novoLimite) })
                });
            } else {
                await fetch(`${API}/api/metas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuarioId: USER_ID, limiteKgCO2Mensal: parseFloat(novoLimite) })
                });
            }
            setMensagem('Meta salva com sucesso!');
            setNovoLimite('');
            await fetchDados();
            setTimeout(() => setMensagem(''), 3000);
        } catch {
            setMensagem('Erro ao salvar meta.');
        } finally {
            setSalvando(false);
        }
    };

    const percentual = progresso?.percentual ?? 0;
    const emitido = progresso?.emitido ?? 0;
    const limite = progresso?.limite ?? 0;
    const alerta = progresso?.alerta ?? false;
    const score = Math.round(Math.max(0, 100 - percentual));
    const barColor = alerta ? '#e75740' : percentual >= 60 ? '#f0a500' : '#72bca1';

    return (
        <div style={{ backgroundColor: '#0a1912', minHeight: '100vh', fontFamily: 'sans-serif', paddingLeft: '60px', boxSizing: 'border-box' }}>
            <SidebarMenu />

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', left: '60px', right: 0, top: 0, zIndex: 100, boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
                <img src={logoImg} alt="Cicle Logo" style={{ height: '40px' }} />
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button onClick={() => navigate('/usuario')} style={{ background: 'transparent', border: '1px solid #72bca1', color: '#72bca1', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>← Voltar</button>
                </div>
            </header>

            <div style={{ padding: '100px 10% 60px', maxWidth: '1000px', margin: '0 auto' }}>

                {alerta && (
                    <div style={{ backgroundColor: 'rgba(231,87,64,0.12)', border: '1px solid #e75740', borderRadius: '14px', padding: '18px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ fontSize: '26px' }}>⚠️</span>
                        <div>
                            <p style={{ color: '#e75740', margin: 0, fontWeight: 'bold', fontSize: '15px' }}>Atenção! Você atingiu 80% da sua meta mensal.</p>
                            <p style={{ color: 'rgba(255,255,255,0.55)', margin: '4px 0 0 0', fontSize: '13px' }}>Suas emissões estão em {percentual.toFixed(1)}% do limite. Reduza seu impacto para manter a meta.</p>
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                    {/* Resumo de Impacto */}
                    <div style={{ backgroundColor: '#112a1f', borderRadius: '20px', padding: '28px', border: '1px solid #1d5c42' }}>
                        <h2 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600' }}>Resumo de Impacto</h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', margin: '0 0 22px 0', fontSize: '13px' }}>Acompanhe suas emissões em tempo real</p>

                        <div style={{ backgroundColor: '#0d1f16', borderRadius: '16px', padding: '22px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <span style={{ fontSize: '17px' }}>🍃</span>
                                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>Emissão Total</span>
                            </div>
                            <div style={{ color: 'white', fontSize: '54px', fontWeight: 'bold', lineHeight: 1 }}>
                                {loading ? '—' : emitido.toFixed(0)}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', marginTop: '6px' }}>kg CO₂/mês</div>
                        </div>

                        {progresso ? (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '17px' }}>◎</span>
                                        <span style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>Meta Mensal</span>
                                    </div>
                                    <span style={{ color: alerta ? '#e75740' : '#72bca1', fontWeight: 'bold', fontSize: '16px' }}>{percentual.toFixed(0)}%</span>
                                </div>
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', height: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                                    <div style={{ width: `${Math.min(100, percentual)}%`, height: '100%', backgroundColor: barColor, borderRadius: '99px', transition: 'width 0.7s ease' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>Atual: {emitido.toFixed(0)}kg</span>
                                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>Meta: {limite.toFixed(0)}kg</span>
                                </div>
                            </div>
                        ) : (
                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', textAlign: 'center', marginTop: '8px' }}>
                                Nenhuma meta definida para este mês.
                            </p>
                        )}
                    </div>

                    {/* Meta Sustentável */}
                    <div style={{ backgroundColor: '#f5f5f0', borderRadius: '20px', padding: '28px' }}>
                        <h2 style={{ color: '#1a1a1a', margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600' }}>Meta Sustentável</h2>
                        <p style={{ color: 'rgba(0,0,0,0.45)', margin: '0 0 22px 0', fontSize: '13px' }}>Progresso de nível</p>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '22px' }}>
                            <span style={{ fontSize: '38px', marginTop: '4px' }}>🍃</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '50px', fontWeight: 'bold', color: '#1a1a1a', lineHeight: 1 }}>{loading ? '—' : score}</span>
                                    <span style={{ fontSize: '18px', color: 'rgba(0,0,0,0.35)', fontWeight: '400' }}>/100</span>
                                </div>
                                <p style={{ color: 'rgba(0,0,0,0.45)', margin: '4px 0 12px 0', fontSize: '13px' }}>Score de Sustentabilidade</p>
                                <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '99px', height: '8px', overflow: 'hidden', marginBottom: '5px' }}>
                                    <div style={{ width: `${score}%`, height: '100%', backgroundColor: '#4a8c6e', borderRadius: '99px', transition: 'width 0.7s ease' }} />
                                </div>
                                <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px' }}>{score}%</span>
                            </div>
                        </div>

                        {progresso && (
                            <div style={{ backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: '14px', padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ color: '#1a1a1a', fontWeight: '500', fontSize: '14px' }}>
                                        {emitido.toFixed(0)} de {limite.toFixed(0)} kg CO₂
                                    </span>
                                    <span style={{
                                        backgroundColor: alerta ? '#e75740' : '#4a8c6e',
                                        color: 'white',
                                        padding: '3px 10px',
                                        borderRadius: '99px',
                                        fontSize: '11px',
                                        fontWeight: 'bold'
                                    }}>
                                        {alerta ? '⚠ ' : ''}{percentual.toFixed(0)}% concluído
                                    </span>
                                </div>
                                <div style={{ backgroundColor: 'rgba(0,0,0,0.12)', borderRadius: '99px', height: '10px', overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.min(100, percentual)}%`, height: '100%', backgroundColor: alerta ? '#e75740' : '#1d5c42', borderRadius: '99px', transition: 'width 0.7s ease' }} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Definir / Atualizar Meta */}
                <div style={{ backgroundColor: '#112a1f', borderRadius: '20px', padding: '28px', border: '1px solid #1d5c42', marginTop: '24px' }}>
                    <h2 style={{ color: 'white', margin: '0 0 6px 0', fontSize: '20px' }}>
                        {metaAtual ? '✏️ Atualizar Meta Mensal' : '🎯 Definir Meta Mensal'}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', margin: '0 0 22px 0', fontSize: '13px' }}>
                        {metaAtual
                            ? `Meta atual: ${metaAtual.limiteKgCO2Mensal} kg CO₂. Informe um novo valor para atualizar.`
                            : 'Defina um limite máximo de emissões de CO₂ para este mês.'}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>Limite em kg CO₂/mês</label>
                            <input
                                type="number"
                                value={novoLimite}
                                onChange={e => setNovoLimite(e.target.value)}
                                placeholder="Ex: 500"
                                min="1"
                                style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0d2924', border: '1px solid #1d5c42', borderRadius: '10px', color: 'white', fontSize: '16px', boxSizing: 'border-box', outline: 'none' }}
                            />
                        </div>
                        <button
                            onClick={salvarMeta}
                            disabled={salvando || !novoLimite}
                            style={{ padding: '12px 28px', backgroundColor: novoLimite ? '#1d5c42' : 'rgba(29,92,66,0.3)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '15px', fontWeight: 'bold', cursor: novoLimite ? 'pointer' : 'default', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                        >
                            {salvando ? 'Salvando...' : metaAtual ? 'Atualizar Meta' : 'Definir Meta'}
                        </button>
                    </div>
                    {mensagem && (
                        <p style={{ color: mensagem.includes('Erro') ? '#e75740' : '#72bca1', marginTop: '12px', fontSize: '14px', margin: '12px 0 0 0' }}>
                            {mensagem}
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Metas;
