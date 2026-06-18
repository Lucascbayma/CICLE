import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Calculator, LayoutGrid, Settings, LogOut, Menu } from 'lucide-react';
import logoImg from './cicle.png';

const SIDEBAR_BG = '#0d2218';
const SIDEBAR_HOVER = '#1a3d2b';

function SidebarMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const navItems = [
        { Icon: LineChart,   label: 'Análise',     path: '/usuario' },
        { Icon: Calculator,  label: 'Calculadora', path: '/calculadora' },
        { Icon: LayoutGrid,  label: 'Gamificação', path: '/gamificacao' },
    ];

    const btnBase = {
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '11px 12px',
        background: 'none', border: 'none',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        width: '100%', textAlign: 'left',
        fontSize: '14px', fontWeight: '500',
        cursor: 'pointer',
        transition: 'background 0.15s',
        color: 'rgba(255,255,255,0.85)',
    };

    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 199 }}
                />
            )}

            <aside style={{
                position: 'fixed', left: 0, top: 0, bottom: 0,
                width: open ? '200px' : '60px',
                backgroundColor: SIDEBAR_BG,
                zIndex: 200,
                transition: 'width 0.25s ease',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                borderRight: '1px solid rgba(255,255,255,0.07)',
            }}>

                {/* Logo + hamburguer */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    padding: '0 12px', height: '64px',
                    gap: '10px',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    flexShrink: 0,
                }}>
                    {open && (
                        <img src={logoImg} alt="Cicle" style={{ height: '26px', flexShrink: 0 }} />
                    )}
                    <button
                        onClick={() => setOpen(o => !o)}
                        style={{
                            background: 'none', border: 'none',
                            color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
                            padding: '6px', borderRadius: '6px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginLeft: open ? 'auto' : '0',
                            flexShrink: 0,
                        }}
                    >
                        <Menu size={22} />
                    </button>
                </div>

                {/* Itens de navegação */}
                <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {navItems.map(({ Icon, label, path }) => (
                        <button
                            key={path}
                            onClick={() => { navigate(path); setOpen(false); }}
                            style={btnBase}
                            onMouseEnter={e => e.currentTarget.style.background = SIDEBAR_HOVER}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                            <Icon size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                            {open && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Ferramentas (inativo) + Sair */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    padding: '12px 8px',
                    display: 'flex', flexDirection: 'column', gap: '2px',
                    flexShrink: 0,
                }}>
                    <button
                        disabled
                        style={{ ...btnBase, color: 'rgba(255,255,255,0.22)', cursor: 'not-allowed' }}
                    >
                        <Settings size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                        {open && <span>Ferramentas</span>}
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        style={btnBase}
                        onMouseEnter={e => e.currentTarget.style.background = SIDEBAR_HOVER}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                        <LogOut size={20} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                        {open && <span>Sair</span>}
                    </button>
                </div>
            </aside>
        </>
    );
}

export default SidebarMenu;
