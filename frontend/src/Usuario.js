import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import './App.css';
import logoImg from './cicle.png';
import edenredImg from './assets/edenred.png';
import SidebarMenu from './SidebarMenu';
import carbonoImg from './assets/ligas/carbono.png';
import bronzeImg from './assets/ligas/bronze.png';
import ferroImg from './assets/ligas/ferro.png';
import ouroImg from './assets/ligas/ouro.png';

const API     = '';
const USER_ID = 1;

function Usuario() {
    const [progresso, setProgresso] = useState(null);
    const [loading,   setLoading]   = useState(true);
    const [resumo, setResumo] = useState(null);
    const [calculos, setCalculos] = useState([]);
    const [gamificacao, setGamificacao] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setLoading(true);

                const [respostaMeta, respostaResumo, respostaCalculos, respostaGamificacao] = await Promise.all([
                    fetch(`${API}/api/metas/usuario/${USER_ID}/progresso`),
                    fetch(`${API}/api/calculos/usuario/${USER_ID}/resumo`),
                    fetch(`${API}/api/calculos/usuario/${USER_ID}`),
                    fetch(`${API}/api/gamificacao/usuario/${USER_ID}/progresso`)
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

                if (respostaGamificacao.ok) {
                    const dadosGamificacao = await respostaGamificacao.json();
                    setGamificacao(dadosGamificacao);
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

    const xpAtual = gamificacao?.pontos ?? 0;

    const ligas = [
        {
            nome: 'Carbono',
            xpMinimo: 0,
            xpProximo: 500,
            imagem: carbonoImg,
            descricao: 'Início da jornada sustentável',
            missoes: [
                'Realize seu primeiro cálculo ambiental',
                'Defina uma meta mensal de CO₂',
                'Salve um cálculo no histórico'
            ]
        },
        {
            nome: 'Bronze',
            xpMinimo: 500,
            xpProximo: 1700,
            imagem: bronzeImg,
            descricao: 'Consistência nas ações ambientais',
            missoes: [
                'Faça 3 cálculos ambientais',
                'Mantenha emissões abaixo da meta',
                'Acumule cashback verde'
            ]
        },
        {
            nome: 'Ferro',
            xpMinimo: 1700,
            xpProximo: 2400,
            imagem: ferroImg,
            descricao: 'Usuário com impacto ambiental relevante',
            missoes: [
                'Faça 5 cálculos ambientais',
                'Reduza emissões em relação ao ciclo anterior',
                'Acompanhe seu histórico de evolução'
            ]
        },
        {
            nome: 'Ouro',
            xpMinimo: 2400,
            xpProximo: null,
            imagem: ouroImg,
            descricao: 'Referência em sustentabilidade',
            missoes: [
                'Mantenha alta frequência de uso',
                'Bata a meta mensal',
                'Alcance alto volume de CO₂ evitado'
            ]
        }
    ];

    const ligaAtual = [...ligas].reverse().find(liga => xpAtual >= liga.xpMinimo) || ligas[0];

    const proximaLiga = ligas.find(liga => liga.xpMinimo > xpAtual);

    const xpBase = ligaAtual.xpMinimo;
    const xpDestino = proximaLiga ? proximaLiga.xpMinimo : ligaAtual.xpMinimo;
    const xpParaProximaLiga = proximaLiga ? proximaLiga.xpMinimo - xpAtual : 0;

    const progressoLiga = proximaLiga ? Math.min(100, ((xpAtual - xpBase) / (xpDestino - xpBase)) * 100) : 100;

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
            backgroundColor: '#0a1912',
            minHeight: '100vh',
            fontFamily: 'sans-serif',
            paddingLeft: '60px',
            boxSizing: 'border-box',
        }}>
            <SidebarMenu />
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 40px',
                height: '64px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'fixed',
                left: '60px',
                right: 0,
                top: 0,
                zIndex: 100,
                boxSizing: 'border-box',
                backdropFilter: 'blur(10px)',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                    }}>
                    <img
                        src={logoImg}
                        alt="Cicle Logo"
                        style={{ height: '36px', objectFit: 'contain' }}
                    />

                    <span style={{
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '20px',
                        fontWeight: '300',
                        lineHeight: 1
                    }}>
                        |
                    </span>

                    <img
                        src={edenredImg}
                        alt="Edenred Logo"
                        style={{
                            height: '24px',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '999px',
                    padding: '7px 14px 7px 12px',
                }}>
                <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                }}>
                    Olá, Usuário!
                </span>

                    <UserCircle
                        size={22}
                        color="rgba(255,255,255,0.75)"
                        strokeWidth={1.6}
                    />
                </div>
            </header>

            <div style={{
                paddingTop: '64px',
                padding: '80px 40px 60px',
                maxWidth: '1500px'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '38px',
                    fontWeight: '800',
                    margin: '0 0 28px 0'
                }}>
                    Análises
                </h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    alignItems: 'start'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        <div style={cardBase}>
                            <div style={{
                                paddingBottom: '16px',
                                marginBottom: '16px',
                                borderBottom: '1px solid rgba(255,255,255,0.07)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end'
                                }}>
                                    <div>
                                        <p style={{
                                            color: '#72bca1',
                                            fontSize: '30px',
                                            fontWeight: '800',
                                            margin: 0,
                                            lineHeight: 1
                                        }}>
                                            {loading ? '—' : `${co2Evitado.toFixed(1)} kg`}
                                        </p>

                                        <p style={{
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: '13px',
                                            margin: '4px 0 0'
                                        }}>
                                            CO₂ evitado no período
                                        </p>
                                    </div>

                                    <span style={{
                                        color: '#72bca1',
                                        fontSize: '13px',
                                        fontWeight: '700'
                                    }}>
                                    ↑12.5%
                                </span>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                <div>
                                    <p style={{
                                        color: 'white',
                                        fontSize: '30px',
                                        fontWeight: '800',
                                        margin: 0,
                                        lineHeight: 1
                                    }}>
                                        {loading ? '—' : `${emitido.toFixed(1)} kg`}
                                    </p>

                                    <p style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '13px',
                                        margin: '4px 0 0'
                                    }}>
                                        Emissão total de CO₂
                                    </p>
                                </div>

                                <span style={{
                                    color: '#e75740',
                                    fontSize: '13px',
                                    fontWeight: '700'
                                }}>
                                ↑8.3%
                            </span>
                            </div>

                            {!progresso && !loading && (
                                <p style={{
                                    color: 'rgba(255,255,255,0.22)',
                                    fontSize: '11px',
                                    marginTop: '14px',
                                    marginBottom: 0,
                                    textAlign: 'center'
                                }}>
                                    Defina uma meta em Metas de Emissão para ver seus dados.
                                </p>
                            )}
                        </div>

                        <div style={cardBase}>
                            <div style={{ marginBottom: '16px' }}>
                                <h3 style={{
                                    color: '#72bca1',
                                    margin: '0 0 2px',
                                    fontSize: '17px',
                                    fontWeight: '700'
                                }}>
                                    Benchmark
                                </h3>

                                <p style={{
                                    color: 'rgba(255,255,255,0.3)',
                                    fontSize: '12px',
                                    margin: 0
                                }}>
                                    Sua posição no mercado
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '18px'
                            }}>
                                <svg
                                    width="86"
                                    height="86"
                                    viewBox="0 0 86 86"
                                    style={{ flexShrink: 0 }}
                                >
                                    <circle
                                        cx="43"
                                        cy="43"
                                        r={R}
                                        fill="none"
                                        stroke="rgba(255,255,255,0.07)"
                                        strokeWidth="9"
                                    />

                                    <circle
                                        cx="43"
                                        cy="43"
                                        r={R}
                                        fill="none"
                                        stroke="#72bca1"
                                        strokeWidth="9"
                                        strokeDasharray={`${dash} ${circ}`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 43 43)"
                                    />

                                    <text
                                        x="43"
                                        y="39"
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="8"
                                        fontWeight="500"
                                        opacity="0.7"
                                    >
                                        Top
                                    </text>

                                    <text
                                        x="43"
                                        y="52"
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="13"
                                        fontWeight="800"
                                    >
                                        15%
                                    </text>
                                </svg>

                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '7px'
                                }}>
                                    {[
                                        {
                                            label: 'Referência mensal',
                                            value: `${limite || 120} kg CO₂`,
                                            bg: 'rgba(255,255,255,0.06)'
                                        },
                                        {
                                            label: 'Sua emissão',
                                            value: `${emitido.toFixed(1)} kg CO₂`,
                                            bg: 'rgba(114,188,161,0.12)'
                                        },
                                        {
                                            label: 'Uso da meta',
                                            value: `${percentualMeta.toFixed(0)}%`,
                                            bg: 'rgba(255,255,255,0.04)'
                                        },
                                    ].map(row => (
                                        <div
                                            key={row.label}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                backgroundColor: row.bg,
                                                borderRadius: '6px',
                                                padding: '5px 9px'
                                            }}
                                        >
                                        <span style={{
                                            color: 'rgba(255,255,255,0.55)',
                                            fontSize: '11px'
                                        }}>
                                            {row.label}
                                        </span>

                                            <span style={{
                                                color: 'rgba(255,255,255,0.8)',
                                                fontSize: '11px',
                                                fontWeight: '600'
                                            }}>
                                            {row.value}
                                        </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p style={{
                                color: 'rgba(255,255,255,0.18)',
                                fontSize: '10px',
                                marginTop: '12px',
                                marginBottom: 0,
                                textAlign: 'center'
                            }}>
                                * Dados calculados com base na meta mensal e nos cálculos salvos.
                            </p>
                        </div>

                        <div style={cardBase}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '4px'
                            }}>
                                <h3 style={{
                                    color: '#72bca1',
                                    margin: 0,
                                    fontSize: '15px',
                                    fontWeight: '700'
                                }}>
                                    Perfil dos Cálculos
                                </h3>

                                <span style={{
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: '12px'
                                }}>
                                Este mês ↓
                            </span>
                            </div>

                            <p style={{
                                color: 'rgba(255,255,255,0.28)',
                                fontSize: '12px',
                                margin: '0 0 16px'
                            }}>
                                {totalCalculos} cálculo(s) ambiental(is) registrados
                            </p>

                            <div style={{ marginBottom: '12px' }}>
                                <p style={{
                                    color: 'rgba(255,255,255,0.45)',
                                    fontSize: '11px',
                                    margin: '0 0 5px'
                                }}>
                                    {calculosSustentaveis} cálculo(s) abaixo de 200 kg CO₂
                                </p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(255,255,255,0.07)',
                                        borderRadius: '4px',
                                        height: '26px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${percentualSustentavel}%`,
                                            minWidth: percentualSustentavel > 0 ? '34px' : '0px',
                                            height: '100%',
                                            backgroundColor: '#8ab493',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: percentualSustentavel > 0 ? '10px' : '0px'
                                        }}>
                                            {percentualSustentavel > 0 && (
                                                <span style={{
                                                    color: 'white',
                                                    fontWeight: '700',
                                                    fontSize: '13px'
                                                }}>
                                                {percentualSustentavel}%
                                            </span>
                                            )}
                                        </div>
                                    </div>

                                    <span style={{
                                        color: 'rgba(255,255,255,0.55)',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                    Perfil Sustentável
                                </span>
                                </div>
                            </div>

                            <div>
                                <p style={{
                                    color: 'rgba(255,255,255,0.45)',
                                    fontSize: '11px',
                                    margin: '0 0 5px'
                                }}>
                                    {calculosAltaEmissao} cálculo(s) acima de 200 kg CO₂
                                </p>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(255,255,255,0.07)',
                                        borderRadius: '4px',
                                        height: '26px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${100 - percentualSustentavel}%`,
                                            minWidth: (100 - percentualSustentavel) > 0 ? '34px' : '0px',
                                            height: '100%',
                                            backgroundColor: '#e75740',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            paddingLeft: (100 - percentualSustentavel) > 0 ? '6px' : '0px'
                                        }}>
                                            {(100 - percentualSustentavel) > 0 && (
                                                <span style={{
                                                    color: 'white',
                                                    fontWeight: '700',
                                                    fontSize: '13px'
                                                }}>
                                                {100 - percentualSustentavel}%
                                            </span>
                                            )}
                                        </div>
                                    </div>

                                    <span style={{
                                        color: 'rgba(255,255,255,0.55)',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                    Alta Emissão
                                </span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            ...cardBase,
                            backgroundColor: '#0d2218'
                        }}>
                            <h3 style={{
                                color: '#72bca1',
                                margin: '0 0 14px',
                                fontSize: '17px',
                                fontWeight: '700'
                            }}>
                                Cashback Verde
                            </h3>

                            <div style={{
                                backgroundColor: 'rgba(114,188,161,0.08)',
                                border: '1px solid rgba(114,188,161,0.2)',
                                borderRadius: '10px',
                                padding: '14px 16px',
                                marginBottom: '12px'
                            }}>
                                <p style={{
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: '11px',
                                    margin: '0 0 4px'
                                }}>
                                    Saldo Disponível
                                </p>

                                <p style={{
                                    color: 'white',
                                    fontSize: '22px',
                                    fontWeight: '800',
                                    margin: 0
                                }}>
                                    R$ {cashbackTotal.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                                </p>
                            </div>

                            <p style={{
                                color: 'rgba(255,255,255,0.2)',
                                fontSize: '11px',
                                margin: 0
                            }}>
                                Valor acumulado a partir dos cálculos ambientais salvos.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        {[
                            `Cálculos registrados: ${totalCalculos}`,
                            `Progresso da meta: ${percentualMeta.toFixed(0)}%`,
                            `Cashback acumulado: R$ ${cashbackTotal.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}`
                        ].map(label => (
                            <div
                                key={label}
                                style={{
                                    ...cardBase,
                                    minHeight: '72px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                }}
                            >
                            <span style={{
                                color: 'rgba(255,255,255,0.28)',
                                fontSize: '13px'
                            }}>
                                {label}
                            </span>
                            </div>
                        ))}

                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(114,188,161,0.18)',
                            borderRadius: '18px',
                            padding: '22px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '18px'
                            }}>
                                <div>
                                    <h3 style={{
                                        color: '#72bca1',
                                        margin: 0,
                                        fontSize: '18px',
                                        fontWeight: '800'
                                    }}>
                                        Liga Sustentável
                                    </h3>

                                    <p style={{
                                        color: 'rgba(255,255,255,0.45)',
                                        margin: '4px 0 0',
                                        fontSize: '12px'
                                    }}>
                                        Evolua conforme reduz sua pegada ambiental.
                                    </p>
                                </div>

                                <div style={{
                                    backgroundColor: 'rgba(114,188,161,0.12)',
                                    border: '1px solid rgba(114,188,161,0.25)',
                                    borderRadius: '999px',
                                    padding: '8px 14px',
                                    color: '#72bca1',
                                    fontWeight: '800',
                                    fontSize: '13px'
                                }}>
                                    {xpAtual} XP
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '18px',
                                marginBottom: '18px'
                            }}>
                                <div style={{
                                    width: '86px',
                                    height: '86px',
                                    borderRadius: '18px',
                                    backgroundColor: 'rgba(0,0,0,0.28)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    flexShrink: 0
                                }}>
                                    <img
                                        src={ligaAtual.imagem}
                                        alt={ligaAtual.nome}
                                        style={{
                                            width: '76px',
                                            height: '76px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        color: 'rgba(255,255,255,0.45)',
                                        margin: '0 0 4px',
                                        fontSize: '12px'
                                    }}>
                                        Sua liga atual
                                    </p>

                                    <h2 style={{
                                        color: 'white',
                                        margin: '0 0 6px',
                                        fontSize: '28px',
                                        fontWeight: '900'
                                    }}>
                                        {ligaAtual.nome}
                                    </h2>

                                    <p style={{
                                        color: 'rgba(255,255,255,0.55)',
                                        margin: 0,
                                        fontSize: '13px'
                                    }}>
                                        {ligaAtual.descricao}
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '18px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '8px'
                                }}>
                                <span style={{
                                    color: 'rgba(255,255,255,0.55)',
                                    fontSize: '12px'
                                }}>
                                    Progresso da liga
                                </span>

                                    <span style={{
                                        color: '#72bca1',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                    {progressoLiga.toFixed(0)}%
                                </span>
                                </div>

                                <div style={{
                                    height: '10px',
                                    borderRadius: '999px',
                                    backgroundColor: 'rgba(255,255,255,0.08)',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${progressoLiga}%`,
                                        height: '100%',
                                        borderRadius: '999px',
                                        backgroundColor: '#72bca1'
                                    }} />
                                </div>

                                <p style={{
                                    color: 'rgba(255,255,255,0.42)',
                                    margin: '8px 0 0',
                                    fontSize: '12px'
                                }}>
                                    {proximaLiga
                                        ? `Faltam ${xpParaProximaLiga} XP para chegar à liga ${proximaLiga.nome}.`
                                        : 'Você alcançou a maior liga disponível.'}
                                </p>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '10px',
                                marginBottom: '18px'
                            }}>
                                {ligas.map((liga) => {
                                    const desbloqueada = xpAtual >= liga.xpMinimo;
                                    const atual = liga.nome === ligaAtual.nome;

                                    return (
                                        <div
                                            key={liga.nome}
                                            style={{
                                                backgroundColor: atual
                                                    ? 'rgba(114,188,161,0.15)'
                                                    : 'rgba(255,255,255,0.035)',
                                                border: atual
                                                    ? '1px solid rgba(114,188,161,0.45)'
                                                    : '1px solid rgba(255,255,255,0.06)',
                                                borderRadius: '14px',
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                opacity: desbloqueada ? 1 : 0.42
                                            }}
                                        >
                                            <img
                                                src={liga.imagem}
                                                alt={liga.nome}
                                                style={{
                                                    width: '34px',
                                                    height: '34px',
                                                    objectFit: 'contain',
                                                    filter: desbloqueada ? 'none' : 'grayscale(1)'
                                                }}
                                            />

                                            <div>
                                                <p style={{
                                                    color: desbloqueada
                                                        ? 'white'
                                                        : 'rgba(255,255,255,0.55)',
                                                    margin: 0,
                                                    fontSize: '13px',
                                                    fontWeight: '800'
                                                }}>
                                                    {liga.nome}
                                                </p>

                                                <p style={{
                                                    color: 'rgba(255,255,255,0.38)',
                                                    margin: '2px 0 0',
                                                    fontSize: '11px'
                                                }}>
                                                    {liga.xpMinimo} XP
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{
                                backgroundColor: 'rgba(0,0,0,0.22)',
                                borderRadius: '14px',
                                padding: '14px',
                                border: '1px solid rgba(255,255,255,0.06)'
                            }}>
                                <p style={{
                                    color: '#72bca1',
                                    margin: '0 0 10px',
                                    fontSize: '13px',
                                    fontWeight: '800'
                                }}>
                                    Missões da liga {ligaAtual.nome}
                                </p>

                                {ligaAtual.missoes.map((missao, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: index === ligaAtual.missoes.length - 1 ? 0 : '8px'
                                        }}
                                    >
                                    <span style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(114,188,161,0.15)',
                                        border: '1px solid rgba(114,188,161,0.35)',
                                        color: '#72bca1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: '900',
                                        flexShrink: 0
                                    }}>
                                        {index + 1}
                                    </span>

                                        <span style={{
                                            color: 'rgba(255,255,255,0.68)',
                                            fontSize: '12px'
                                        }}>
                                        {missao}
                                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Usuario;
