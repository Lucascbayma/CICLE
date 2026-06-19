import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import './App.css';
import logoImg from './cicle.png';
import SidebarMenu from './SidebarMenu';

const API     = 'http://localhost:8080';
const USER_ID = 1;

function Usuario() {
    const [progresso, setProgresso] = useState(null);
    const [loading,   setLoading]   = useState(true);
    const [resumo, setResumo] = useState(null);
    const [calculos, setCalculos] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setLoading(true);

                const [respostaMeta, respostaResumo, respostaCalculos] = await Promise.all([
                    fetch(`${API}/api/metas/usuario/${USER_ID}/progresso`),
                    fetch(`${API}/api/calculos/usuario/${USER_ID}/resumo`),
                    fetch(`${API}/api/calculos/usuario/${USER_ID}`)
                ]);

                if (respostaMeta.ok) {
                    const dadosMeta = await respostaMeta.json();
                    setProgresso(dadosMeta);
                }

                if (respostaResumo.ok) {
                    const dadosResumo = await respostaResumo.json();
                    setResumo(dadosResumo);
                }

                if (respostaCalculos.ok) {
                    const dadosCalculos = await respostaCalculos.json();
                    setCalculos(dadosCalculos);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    const emitido = progresso?.emitido ?? resumo?.emissaoTotal ?? 0;
    const limite = progresso?.limite ?? 0;

    const totalCalculos = resumo?.totalCalculos ?? calculos.length ?? 0;
    const cashbackTotal = resumo?.cashbackTotal ?? 0;

    const co2Evitado = Math.max(0, (totalCalculos * 400) - emitido);

    const percentualMeta = limite > 0 ? Math.min(100, (emitido / limite) * 100) : 0;

    const calculosSustentaveis = calculos.filter(c => (c.emissaoTotal || 0) < 200).length;
    const percentualSustentavel = totalCalculos > 0
        ? Math.round((calculosSustentaveis / totalCalculos) * 100)
        : 0;

    const calculosAltaEmissao = Math.max(0, totalCalculos - calculosSustentaveis);

    // SVG donut (benchmark estático)
    const R    = 32;
    const circ = 2 * Math.PI * R;
    const dash = circ * 0.82;

    const cardBase = {
        backgroundColor: '#112a1f',
        border: '1px solid #1a3828',
        borderRadius: '14px',
        padding: '22px',
    };

    return (
        <div style={{
            backgroundColor: '#0a1912', minHeight: '100vh',
            fontFamily: 'sans-serif', paddingLeft: '60px', boxSizing: 'border-box',
        }}>
            <SidebarMenu />

            {/* Header fixo */}
            <header style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0 40px', height: '64px',
                backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed',
                left: '60px', right: 0, top: 0, zIndex: 100,
                boxSizing: 'border-box', backdropFilter: 'blur(10px)',
            }}>
                <img src={logoImg} alt="Cicle Logo" style={{ height: '36px' }} />
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px', padding: '7px 14px 7px 12px',
                }}>
                    <span style={{ color: 'white', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>
                        Olá, Usuário!
                    </span>
                    <UserCircle size={22} color="rgba(255,255,255,0.75)" strokeWidth={1.6} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <div style={{ paddingTop: '64px', padding: '80px 40px 60px', maxWidth: '1100px' }}>

                <h1 style={{ color: 'white', fontSize: '38px', fontWeight: '800', margin: '0 0 28px 0' }}>
                    Análises
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>

                    {/* ── Coluna esquerda ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* CO2 */}
                        <div style={cardBase}>
                            <div style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ color: '#72bca1', fontSize: '30px', fontWeight: '800', margin: 0, lineHeight: 1 }}>
                                            {loading ? '—' : `${co2Evitado.toFixed(1)} kg`}
                                        </p>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '4px 0 0' }}>
                                            CO2 evitado no período
                                        </p>
                                    </div>
                                    <span style={{ color: '#72bca1', fontSize: '13px', fontWeight: '700' }}>↑12.5%</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <p style={{ color: 'white', fontSize: '30px', fontWeight: '800', margin: 0, lineHeight: 1 }}>
                                        {loading ? '—' : `${emitido.toFixed(1)} kg`}
                                    </p>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '4px 0 0' }}>
                                        Emissão Total de CO2
                                    </p>
                                </div>
                                <span style={{ color: '#e75740', fontSize: '13px', fontWeight: '700' }}>↑8.3%</span>
                            </div>
                            {!progresso && !loading && (
                                <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '11px', marginTop: '14px', marginBottom: 0, textAlign: 'center' }}>
                                    Defina uma meta em Metas de Emissão para ver seus dados.
                                </p>
                            )}
                        </div>

                        {/* Digital vs Físico */}
                        <div style={cardBase}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <h3 style={{ color: '#72bca1', margin: 0, fontSize: '15px', fontWeight: '700' }}>Perfil dos Cálculos</h3>
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Este mês ↓</span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', margin: '0 0 16px' }}>
                                {totalCalculos} cálculo(s) ambiental(is) registrados
                            </p>

                            {/* Barra digital */}
                            <div style={{ marginBottom: '12px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '0 0 5px' }}>{calculosSustentaveis} cálculo(s) abaixo de 200 kg CO₂</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '4px', height: '26px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percentualSustentavel}%`, height: '100%', backgroundColor: '#8ab493', borderRadius: '4px', display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                                            <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>87%</span>
                                        </div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', whiteSpace: 'nowrap' }}>Perfil Sustentável</span>
                                </div>
                            </div>

                            {/* Barra físico */}
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '0 0 5px' }}>{calculosAltaEmissao} cálculo(s) acima de 200 kg CO₂</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '4px', height: '26px', overflow: 'hidden' }}>
                                        <div style={{ width: `${100 - percentualSustentavel}%`, height: '100%', backgroundColor: '#e75740', borderRadius: '4px', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
                                            <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>13%</span>
                                        </div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', whiteSpace: 'nowrap' }}>Alta Emissão</span>
                                </div>
                            </div>
                        </div>

                        {/* Cashback Verde — placeholder */}
                        <div style={{ ...cardBase, backgroundColor: '#0d2218' }}>
                            <h3 style={{ color: '#72bca1', margin: '0 0 14px', fontSize: '17px', fontWeight: '700' }}>
                                Cashback Verde
                            </h3>
                            <div style={{ backgroundColor: 'rgba(114,188,161,0.08)', border: '1px solid rgba(114,188,161,0.2)', borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', margin: '0 0 4px' }}>Saldo Disponível</p>
                                <p style={{ color: 'white', fontSize: '22px', fontWeight: '800', margin: 0 }}>
                                    R$ {cashbackTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', margin: 0 }}>
                                Valor acumulado a partir dos cálculos ambientais salvos.
                            </p>
                        </div>

                    </div>

                    {/* ── Coluna direita ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Benchmark — estático */}
                        <div style={cardBase}>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ color: '#72bca1', margin: '0 0 2px', fontSize: '17px', fontWeight: '700' }}>Benchmark</h3>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>Sua posição no mercado</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                {/* Donut SVG */}
                                <svg width="86" height="86" viewBox="0 0 86 86" style={{ flexShrink: 0 }}>
                                    <circle cx="43" cy="43" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
                                    <circle cx="43" cy="43" r={R} fill="none" stroke="#72bca1" strokeWidth="9"
                                        strokeDasharray={`${dash} ${circ}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 43 43)" />
                                    <text x="43" y="39" textAnchor="middle" fill="white" fontSize="8" fontWeight="500" opacity="0.7">Top</text>
                                    <text x="43" y="52" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">15%</text>
                                </svg>

                                {/* Legenda */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                    {[
                                        { label: 'Referência mensal', value: `${limite || 120} kg CO₂`, bg: 'rgba(255,255,255,0.06)' },
                                        { label: 'Sua emissão', value: `${emitido.toFixed(1)} kg CO₂`, bg: 'rgba(114,188,161,0.12)' },
                                        { label: 'Uso da meta', value: `${percentualMeta.toFixed(0)}%`, bg: 'rgba(255,255,255,0.04)' },
                                    ].map(row => (
                                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: row.bg, borderRadius: '6px', padding: '5px 9px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px' }}>{row.label}</span>
                                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: '600' }}>{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px', marginTop: '12px', marginBottom: 0, textAlign: 'center' }}>
                                * Dados calculados com base na meta mensal e nos cálculos salvos.
                            </p>
                        </div>

                        {[
                            `Cálculos registrados: ${totalCalculos}`,
                            `Progresso da meta: ${percentualMeta.toFixed(0)}%`,
                            `Cashback acumulado: R$ ${cashbackTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        ].map(label => (
                            <div key={label} style={{ ...cardBase, minHeight: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '13px' }}>{label}</span>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Usuario;
