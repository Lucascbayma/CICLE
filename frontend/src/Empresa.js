import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import './App.css';
import logoImg from './cicle.png';
import SidebarMenu from './SidebarMenu';

function Empresa() {
    const navigate = useNavigate();

    const R    = 32;
    const circ = 2 * Math.PI * R;
    const dash = circ * 0.78;

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
                        Olá, Empresa!
                    </span>
                    <UserCircle size={22} color="rgba(255,255,255,0.75)" strokeWidth={1.6} />
                </div>
            </header>

            {/* Conteúdo principal */}
            <div style={{ padding: '80px 40px 60px', maxWidth: '1100px' }}>

                <h1 style={{ color: 'white', fontSize: '38px', fontWeight: '800', margin: '0 0 28px 0' }}>
                    Análises
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }}>

                    {/* ── Coluna esquerda ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* CO2 corporativo */}
                        <div style={cardBase}>
                            <div style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <p style={{ color: '#72bca1', fontSize: '30px', fontWeight: '800', margin: 0, lineHeight: 1 }}>
                                            —
                                        </p>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '4px 0 0' }}>
                                            CO2 evitado no período
                                        </p>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', fontWeight: '700' }}>—%</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <p style={{ color: 'white', fontSize: '30px', fontWeight: '800', margin: 0, lineHeight: 1 }}>
                                        —
                                    </p>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '4px 0 0' }}>
                                        Emissão Total de CO2
                                    </p>
                                </div>
                                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', fontWeight: '700' }}>—%</span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '11px', marginTop: '14px', marginBottom: 0, textAlign: 'center' }}>
                                Simule na Calculadora Ambiental para ver os dados de emissão.
                            </p>
                        </div>

                        {/* Digital vs Físico */}
                        <div style={cardBase}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <h3 style={{ color: '#72bca1', margin: 0, fontSize: '15px', fontWeight: '700' }}>Digital vs Físico</h3>
                                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Este mês ↓</span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '12px', margin: '0 0 16px' }}>
                                Das 6780 transações feitas
                            </p>

                            <div style={{ marginBottom: '12px' }}>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '0 0 5px' }}>5763 foram digitais</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '4px', height: '26px', overflow: 'hidden' }}>
                                        <div style={{ width: '87%', height: '100%', backgroundColor: '#8ab493', borderRadius: '4px', display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                                            <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>87%</span>
                                        </div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', whiteSpace: 'nowrap' }}>Uso Digital</span>
                                </div>
                            </div>

                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '0 0 5px' }}>1017 foram físicas</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '4px', height: '26px', overflow: 'hidden' }}>
                                        <div style={{ width: '13%', height: '100%', backgroundColor: '#e75740', borderRadius: '4px', display: 'flex', alignItems: 'center', paddingLeft: '6px' }}>
                                            <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>13%</span>
                                        </div>
                                    </div>
                                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', whiteSpace: 'nowrap' }}>Uso Físico</span>
                                </div>
                            </div>
                        </div>

                        {/* Painel ESG — CTA para calculadora */}
                        <div style={{ ...cardBase, backgroundColor: '#0d2218' }}>
                            <h3 style={{ color: '#72bca1', margin: '0 0 10px', fontSize: '17px', fontWeight: '700' }}>
                                Painel ESG
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 18px', lineHeight: '1.5' }}>
                                Simule as emissões de GEE da sua frota de cartões e compare o impacto das transações físicas e digitais.
                            </p>
                            <button
                                onClick={() => navigate('/calculadora')}
                                style={{
                                    width: '100%', padding: '11px', borderRadius: '8px',
                                    backgroundColor: '#1d5c42', border: '1px solid #2a7a57',
                                    color: 'white', fontSize: '14px', fontWeight: '600',
                                    cursor: 'pointer', transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#256b4e'}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1d5c42'}
                            >
                                Acessar Calculadora Ambiental
                            </button>
                        </div>

                    </div>

                    {/* ── Coluna direita ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Benchmark empresarial */}
                        <div style={cardBase}>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{ color: '#72bca1', margin: '0 0 2px', fontSize: '17px', fontWeight: '700' }}>Benchmark</h3>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>Posição da empresa no setor</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                <svg width="86" height="86" viewBox="0 0 86 86" style={{ flexShrink: 0 }}>
                                    <circle cx="43" cy="43" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
                                    <circle cx="43" cy="43" r={R} fill="none" stroke="#72bca1" strokeWidth="9"
                                        strokeDasharray={`${dash} ${circ}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 43 43)" />
                                    <text x="43" y="39" textAnchor="middle" fill="white" fontSize="8" fontWeight="500" opacity="0.7">Top</text>
                                    <text x="43" y="52" textAnchor="middle" fill="white" fontSize="13" fontWeight="800">22%</text>
                                </svg>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                    {[
                                        { label: 'Média do setor',  value: '820 t CO₂', bg: 'rgba(255,255,255,0.06)' },
                                        { label: 'Sua emissão',     value: '540 t CO₂', bg: 'rgba(114,188,161,0.12)' },
                                        { label: 'Melhor prática',  value: '310 t CO₂', bg: 'rgba(255,255,255,0.04)' },
                                    ].map(row => (
                                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: row.bg, borderRadius: '6px', padding: '5px 9px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px' }}>{row.label}</span>
                                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: '600' }}>{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px', marginTop: '12px', marginBottom: 0, textAlign: 'center' }}>
                                * Referência estática — benchmark em desenvolvimento
                            </p>
                        </div>

                        {/* Placeholders */}
                        {['Ranking de Sustentabilidade', 'Histórico de Emissões', 'Floresta Corporativa'].map(label => (
                            <div key={label} style={{ ...cardBase, minHeight: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '13px' }}>{label} — Em breve</span>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Empresa;
