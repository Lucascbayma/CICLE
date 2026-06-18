import React, { useState } from 'react';
import { Car, Zap, UtensilsCrossed, Plane, ShoppingBag, ChevronDown, ChevronUp, UserCircle } from 'lucide-react';
import SidebarMenu from './SidebarMenu';
import logoImg from './cicle.png';

// ── Toggle switch ──────────────────────────────────────────────
function Toggle({ checked, onChange }) {
    return (
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '46px', height: '26px',
                backgroundColor: checked ? '#4A90D9' : 'rgba(0,0,0,0.18)',
                borderRadius: '13px', cursor: 'pointer',
                position: 'relative', transition: 'background 0.2s', flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute', top: '3px',
                left: checked ? '23px' : '3px',
                width: '20px', height: '20px',
                backgroundColor: 'white', borderRadius: '50%',
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            }} />
        </div>
    );
}

// ── Button group selector ──────────────────────────────────────
function ButtonGroup({ options, selected, onChange, accentColor }) {
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {options.map(opt => (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    style={{
                        padding: '8px 18px', borderRadius: '20px',
                        border: `1.5px solid ${selected === opt ? (accentColor || '#1d5c42') : 'rgba(0,0,0,0.2)'}`,
                        backgroundColor: selected === opt ? (accentColor || '#1d5c42') : 'transparent',
                        color: selected === opt ? 'white' : '#444',
                        cursor: 'pointer', fontSize: '13px',
                        fontWeight: selected === opt ? '600' : '400',
                        transition: 'all 0.15s',
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

// ── Slider row ─────────────────────────────────────────────────
function SliderRow({ label, value, min, max, unit, onChange, accentColor }) {
    return (
        <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', fontSize: '14px', color: '#222' }}>{label}</span>
                <span style={{ fontWeight: '700', fontSize: '14px', color: accentColor || '#4A90D9' }}>
                    {value} {unit}
                </span>
            </div>
            <input
                type="range" min={min} max={max} value={value}
                onChange={e => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: accentColor || '#4A90D9', cursor: 'pointer', display: 'block' }}
            />
        </div>
    );
}

// ── Toggle row ─────────────────────────────────────────────────
function ToggleRow({ label, checked, onChange }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <span style={{ fontSize: '14px', color: '#333' }}>{label}</span>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

// ── Label row (above button group) ────────────────────────────
function LabelRow({ label }) {
    return (
        <span style={{ fontWeight: '600', fontSize: '14px', color: '#222', display: 'block', marginBottom: '10px' }}>
            {label}
        </span>
    );
}

// ── Accordion card ─────────────────────────────────────────────
function AccordionCard({ Icon, iconBg, label, open, onToggle, children }) {
    return (
        <div style={{
            backgroundColor: 'white', borderRadius: '14px',
            overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.14)',
            marginBottom: '12px',
        }}>
            <div
                onClick={onToggle}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', minHeight: '64px' }}
            >
                <div style={{
                    width: '64px', alignSelf: 'stretch',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: iconBg, flexShrink: 0,
                    borderRadius: open ? '14px 0 0 0' : '14px 0 0 14px',
                    transition: 'border-radius 0.2s',
                }}>
                    <Icon size={26} color="white" strokeWidth={1.8} />
                </div>
                <span style={{ flex: 1, fontWeight: '700', fontSize: '16px', color: '#1a1a1a', padding: '0 20px' }}>
                    {label}
                </span>
                <div style={{ paddingRight: '20px', color: '#999', display: 'flex' }}>
                    {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {open && (
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', padding: '22px 24px 6px 24px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────
function CalculadoraAmbiental() {
    const [openCards, setOpenCards] = useState({});
    const toggle = id => setOpenCards(prev => ({ ...prev, [id]: !prev[id] }));

    const [salvoStatus, setSalvoStatus] = useState('idle'); // idle | salvo | erro

    const [transporte, setTransporte] = useState({ km: 150, publicTransport: true,  vehicleType: 'Gasolina'      });
    const [energia,    setEnergia]    = useState({ kwh: 150, solar: false,           fonte: 'Rede elétrica'      });
    const [alimentacao,setAlimentacao]= useState({ diasCarne: 15, plantBased: false, dieta: 'Onívoro'           });
    const [viagens,    setViagens]    = useState({ voosAno: 2, longaDistancia: false, tipo: 'Nacional'           });
    const [consumo,    setConsumo]    = useState({ itens: 10, sustentavel: false,    perfil: 'Médio'             });

    // ── Cálculo de emissões (reativo ao estado) ────────────────
    const vFactor = { 'Gasolina': 0.21, 'Híbrido': 0.12, 'Elétrico': 0.05 };
    const fFactor = { 'Rede elétrica': 0.092, 'Misto': 0.050, 'Solar': 0.010 };
    const dFactor = { 'Onívoro': 3.3, 'Vegetariano': 1.7, 'Vegano': 1.0 };
    const tKm     = { 'Nacional': 800, 'Internacional': 5000, 'Intercontinental': 12000 };
    const pKg     = { 'Baixo': 0.8, 'Médio': 2.0, 'Alto': 5.0 };

    const emT = transporte.km * (vFactor[transporte.vehicleType] || 0.21) * (transporte.publicTransport ? 0.75 : 1);
    const emE = energia.kwh   * (fFactor[energia.fonte]          || 0.092) * (energia.solar             ? 0.50 : 1);
    const emA = alimentacao.diasCarne * (dFactor[alimentacao.dieta] || 3.3) * (alimentacao.plantBased   ? 0.50 : 1);
    const emV = (viagens.voosAno / 12) * (tKm[viagens.tipo] || 800) * 0.255 * (viagens.longaDistancia  ? 1.50 : 1);
    const emC = consumo.itens * (pKg[consumo.perfil] || 2.0) * (consumo.sustentavel                     ? 0.60 : 1);

    const emissaoTotal = Math.round((emT + emE + emA + emV + emC) * 10) / 10;
    const cashback     = Math.max(0, (400 - emissaoTotal) * 0.15).toFixed(2);

    const salvarCalculo = () => {
        try {
            const historico = JSON.parse(localStorage.getItem('cicle_calculos') || '[]');
            historico.unshift({
                data: new Date().toLocaleString('pt-BR'),
                emissaoTotal,
                cashback,
                transporte,
                energia,
                alimentacao,
                viagens,
                consumo,
            });
            localStorage.setItem('cicle_calculos', JSON.stringify(historico.slice(0, 20)));
            setSalvoStatus('salvo');
        } catch {
            setSalvoStatus('erro');
        } finally {
            setTimeout(() => setSalvoStatus('idle'), 3000);
        }
    };

    return (
        <div style={{
            backgroundColor: '#0e2318', minHeight: '100vh',
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

                <h1 style={{
                    color: 'white', fontSize: '20px', fontWeight: '700', margin: 0,
                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap',
                }}>
                    Calculadora Ambiental
                </h1>

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

            {/* Hero / banner */}
            <section style={{
                marginTop: '64px',
                background: 'linear-gradient(180deg, #1d5c42 0%, #0e2318 100%)',
                padding: '48px 10% 40px',
                textAlign: 'center',
            }}>
                <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: '0 0 10px 0' }}>
                    Calculadora Ambiental
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', margin: 0 }}>
                    Calcule seu impacto e descubra como reduzir emissões
                </p>
            </section>

            {/* Conteúdo: 2 colunas */}
            <div style={{
                display: 'flex', gap: '24px', alignItems: 'flex-start',
                maxWidth: '1200px', margin: '0 auto', padding: '24px 40px 80px',
            }}>

                {/* ── Coluna esquerda: acordeões ── */}
                <div style={{ flex: 1, minWidth: 0 }}>

                    <AccordionCard Icon={Car} iconBg="#6B7FD4" label="Transporte"
                        open={!!openCards.transporte} onToggle={() => toggle('transporte')}>
                        <SliderRow
                            label="Km rodados de carro" value={transporte.km}
                            min={0} max={2000} unit="km/mês" accentColor="#6B7FD4"
                            onChange={v => setTransporte(p => ({ ...p, km: v }))}
                        />
                        <ToggleRow
                            label="Uso de transporte público"
                            checked={transporte.publicTransport}
                            onChange={v => setTransporte(p => ({ ...p, publicTransport: v }))}
                        />
                        <div style={{ marginBottom: '20px' }}>
                            <LabelRow label="Tipo de veículo" />
                            <ButtonGroup
                                options={['Gasolina', 'Híbrido', 'Elétrico']}
                                selected={transporte.vehicleType} accentColor="#6B7FD4"
                                onChange={v => setTransporte(p => ({ ...p, vehicleType: v }))}
                            />
                        </div>
                    </AccordionCard>

                    <AccordionCard Icon={Zap} iconBg="#E85E3B" label="Energia"
                        open={!!openCards.energia} onToggle={() => toggle('energia')}>
                        <SliderRow
                            label="Consumo mensal de energia" value={energia.kwh}
                            min={0} max={1000} unit="kWh/mês" accentColor="#E85E3B"
                            onChange={v => setEnergia(p => ({ ...p, kwh: v }))}
                        />
                        <ToggleRow
                            label="Uso de energia solar"
                            checked={energia.solar}
                            onChange={v => setEnergia(p => ({ ...p, solar: v }))}
                        />
                        <div style={{ marginBottom: '20px' }}>
                            <LabelRow label="Fonte de energia" />
                            <ButtonGroup
                                options={['Rede elétrica', 'Misto', 'Solar']}
                                selected={energia.fonte} accentColor="#E85E3B"
                                onChange={v => setEnergia(p => ({ ...p, fonte: v }))}
                            />
                        </div>
                    </AccordionCard>

                    <AccordionCard Icon={UtensilsCrossed} iconBg="#D435B5" label="Alimentação"
                        open={!!openCards.alimentacao} onToggle={() => toggle('alimentacao')}>
                        <SliderRow
                            label="Dias com carne vermelha por mês" value={alimentacao.diasCarne}
                            min={0} max={30} unit="dias/mês" accentColor="#D435B5"
                            onChange={v => setAlimentacao(p => ({ ...p, diasCarne: v }))}
                        />
                        <ToggleRow
                            label="Dieta plant-based"
                            checked={alimentacao.plantBased}
                            onChange={v => setAlimentacao(p => ({ ...p, plantBased: v }))}
                        />
                        <div style={{ marginBottom: '20px' }}>
                            <LabelRow label="Tipo de dieta" />
                            <ButtonGroup
                                options={['Onívoro', 'Vegetariano', 'Vegano']}
                                selected={alimentacao.dieta} accentColor="#D435B5"
                                onChange={v => setAlimentacao(p => ({ ...p, dieta: v }))}
                            />
                        </div>
                    </AccordionCard>

                    <AccordionCard Icon={Plane} iconBg="#1d5c42" label="Viagens"
                        open={!!openCards.viagens} onToggle={() => toggle('viagens')}>
                        <SliderRow
                            label="Voos por ano" value={viagens.voosAno}
                            min={0} max={30} unit="voos/ano" accentColor="#1d5c42"
                            onChange={v => setViagens(p => ({ ...p, voosAno: v }))}
                        />
                        <ToggleRow
                            label="Viagens de longa distância"
                            checked={viagens.longaDistancia}
                            onChange={v => setViagens(p => ({ ...p, longaDistancia: v }))}
                        />
                        <div style={{ marginBottom: '20px' }}>
                            <LabelRow label="Destino médio" />
                            <ButtonGroup
                                options={['Nacional', 'Internacional', 'Intercontinental']}
                                selected={viagens.tipo} accentColor="#1d5c42"
                                onChange={v => setViagens(p => ({ ...p, tipo: v }))}
                            />
                        </div>
                    </AccordionCard>

                    <AccordionCard Icon={ShoppingBag} iconBg="#7EA488" label="Consumo"
                        open={!!openCards.consumo} onToggle={() => toggle('consumo')}>
                        <SliderRow
                            label="Compras por mês" value={consumo.itens}
                            min={0} max={100} unit="itens/mês" accentColor="#7EA488"
                            onChange={v => setConsumo(p => ({ ...p, itens: v }))}
                        />
                        <ToggleRow
                            label="Preferência por produtos sustentáveis"
                            checked={consumo.sustentavel}
                            onChange={v => setConsumo(p => ({ ...p, sustentavel: v }))}
                        />
                        <div style={{ marginBottom: '20px' }}>
                            <LabelRow label="Perfil de consumo" />
                            <ButtonGroup
                                options={['Baixo', 'Médio', 'Alto']}
                                selected={consumo.perfil} accentColor="#7EA488"
                                onChange={v => setConsumo(p => ({ ...p, perfil: v }))}
                            />
                        </div>
                    </AccordionCard>

                </div>

                {/* ── Coluna direita: Resumo sticky ── */}
                <div style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '88px' }}>
                    <div style={{
                        backgroundColor: '#f0f2ef', borderRadius: '16px',
                        padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                    }}>
                        <h3 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0' }}>
                            Resumo
                        </h3>

                        {/* Emissão total mensal */}
                        <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                            <p style={{ color: '#999', fontSize: '12px', margin: '0 0 6px 0' }}>Emissão total Mensal</p>
                            <p style={{ fontSize: '48px', fontWeight: '800', color: '#1a1a1a', margin: '0 0 2px 0', lineHeight: 1 }}>
                                {emissaoTotal}
                            </p>
                            <p style={{ color: '#999', fontSize: '12px', margin: 0 }}>kg CO₂</p>
                        </div>

                        {/* Cashback estimado */}
                        <div style={{
                            backgroundColor: 'rgba(114,188,161,0.15)',
                            border: '1px solid #72bca1',
                            borderRadius: '10px', padding: '13px 16px', marginBottom: '20px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <span style={{ color: '#1d5c42', fontWeight: '600', fontSize: '13px' }}>Cashback Estimado</span>
                            <span style={{ color: '#1d5c42', fontWeight: '700', fontSize: '15px' }}>R$ {cashback}</span>
                        </div>

                        {/* Meta Mensal / Mês Anterior */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#888', fontSize: '13px' }}>Meta Mensal</span>
                                <span style={{ color: '#e75740', fontWeight: '700', fontSize: '14px' }}>120 kg</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#888', fontSize: '13px' }}>Mês Anterior</span>
                                <span style={{ color: '#e75740', fontWeight: '700', fontSize: '14px' }}>168 kg</span>
                            </div>
                        </div>

                        {/* Botão Salvar Cálculo */}
                        <button
                            onClick={salvarCalculo}
                            disabled={salvoStatus !== 'idle'}
                            style={{
                                width: '100%',
                                padding: '13px',
                                borderRadius: '999px',
                                border: 'none',
                                backgroundColor: salvoStatus === 'salvo' ? '#1d5c42'
                                               : salvoStatus === 'erro'  ? '#e75740'
                                               : '#0d2218',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: salvoStatus !== 'idle' ? 'default' : 'pointer',
                                transition: 'background 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                            }}
                        >
                            {salvoStatus === 'salvo' ? '✓ Cálculo Salvo!'
                           : salvoStatus === 'erro'  ? '✕ Erro ao salvar'
                           : '⬆ Salvar Cálculo'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CalculadoraAmbiental;
