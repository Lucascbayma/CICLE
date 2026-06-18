import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logoImg from './cicle.png';

function Empresa() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showRanking, setShowRanking] = useState(false);

    const slides = [
        {
            id: 1,
            tag: "MEIOS DE PAGAMENTO",
            title: "O poder da sua Wallet",
            description: "Pagar com o celular (NFC) ou Pix emite até 85% menos CO2e do que o processo de fabricação, logística e uso de um cartão de plástico comum. Uma escolha simples com impacto gigante.",
            metric: "-85%",
            metricLabel: "Emissões de CO2e",
            bgGradient: "linear-gradient(135deg, rgba(29, 92, 66, 0.9) 0%, rgba(11, 46, 31, 0.9) 100%)",
            icon: "📱"
        },
        {
            id: 2,
            tag: "MOBILIDADE URBANA",
            title: "Menos trânsito, mais respiro",
            description: "Trocar o carro particular pelo transporte público ou bicicleta apenas duas vezes na semana pode economizar até 300 kg de carbono por ano. O planeta agradece.",
            metric: "300 kg",
            metricLabel: "Poupados por ano",
            bgGradient: "linear-gradient(135deg, rgba(114, 188, 161, 0.9) 0%, rgba(29, 92, 66, 0.9) 100%)",
            icon: "🚲"
        },
        {
            id: 3,
            tag: "CONSUMO CONSCIENTE",
            title: "Faturas e Recibos Digitais",
            description: "A cada 10 recibos de papel evitados, economizamos água, madeira e reduzimos emissões do transporte de correspondências. Ative suas notificações 100% digitais.",
            metric: "100%",
            metricLabel: "Sustentável",
            bgGradient: "linear-gradient(135deg, rgba(126, 164, 136, 0.9) 0%, rgba(45, 84, 57, 0.9) 100%)",
            icon: "🧾"
        },
        {
            id: 4,
            tag: "ALIMENTAÇÃO",
            title: "Valorize o comércio local",
            description: "Comprar alimentos produzidos perto de você reduz drasticamente as emissões causadas pelo transporte em caminhões e navios. Use seu benefício no bairro!",
            metric: "-40%",
            metricLabel: "Emissões logísticas",
            bgGradient: "linear-gradient(135deg, rgba(46, 125, 93, 0.9) 0%, rgba(15, 61, 43, 0.9) 100%)",
            icon: "🛒"
        }
    ];

    const rankingData = [
        { rank: 1, name: "Edenred", co2: 52400, isCurrent: true },
        { rank: 2, name: "Accenture", co2: 45200, isCurrent: false },
        { rank: 3, name: "IBM", co2: 42150, isCurrent: false },
        { rank: 4, name: "Magazine Luiza", co2: 38500, isCurrent: false },
        { rank: 5, name: "Grupo Mateus", co2: 31200, isCurrent: false }
    ];

    const maxCo2 = rankingData[0].co2;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 12000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div style={{ backgroundColor: '#0a1912', minHeight: '100vh', width: '100%', fontFamily: 'sans-serif' }}>
            
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', width: '100%', top: 0, zIndex: 100, boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
                <img src={logoImg} alt="Cicle Logo" style={{ height: '40px' }} />
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>Olá, Edenred</span>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid #72bca1', color: '#72bca1', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Sair</button>
                </div>
            </header>

            <section style={{ position: 'relative', height: '70vh', width: '100%', overflow: 'hidden', marginTop: '0' }}>
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: slide.bgGradient, opacity: index === currentSlide ? 1 : 0, transition: 'opacity 1s ease-in-out', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10%', boxSizing: 'border-box' }}
                    >
                        <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
                            <div style={{ maxWidth: '600px' }}>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px' }}>{slide.tag}</span>
                                <h1 style={{ color: 'white', fontSize: '48px', margin: '20px 0', lineHeight: '1.2' }}>{slide.title}</h1>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: '1.6', marginBottom: '30px' }}>{slide.description}</p>
                            </div>
                            
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '250px', backdropFilter: 'blur(10px)' }}>
                                <div style={{ fontSize: '60px', marginBottom: '10px' }}>{slide.icon}</div>
                                <h2 style={{ color: '#72bca1', fontSize: '42px', margin: '0' }}>{slide.metric}</h2>
                                <p style={{ color: 'white', margin: '10px 0 0 0', fontSize: '14px', textTransform: 'uppercase' }}>{slide.metricLabel}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{ position: 'absolute', bottom: '30px', width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            onClick={() => setCurrentSlide(index)}
                            style={{ width: index === currentSlide ? '30px' : '10px', height: '10px', backgroundColor: index === currentSlide ? '#72bca1' : 'rgba(255,255,255,0.4)', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                        />
                    ))}
                </div>
            </section>

            <section style={{ padding: '60px 10%', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '30px' }}>Painel de Impacto ESG</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                    
                    <div onClick={() => navigate('/calculadora')} style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #72bca1', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(114, 188, 161, 0.2)' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🧮</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Calculadora Ambiental</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Simule as emissões de GEE da sua frota de cartões e compare o impacto das transações físicas e digitais.</p>
                    </div>

                    <div onClick={() => setShowRanking(true)} style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #72bca1', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(114, 188, 161, 0.2)' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏅</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Ranking de Sustentabilidade</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Compare a performance ESG da sua empresa com outras do mesmo setor em nossa rede.</p>
                    </div>

                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', opacity: '0.8' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>📈</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Histórico e Evolução</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Analise os gráficos dos seus resultados passados e acompanhe a melhoria contínua da sua pegada de carbono.</p>
                    </div>

                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', opacity: '0.8' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🌳</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Floresta Corporativa</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Visualize o volume total de árvores preservadas em decorrência da sua economia de carbono.</p>
                    </div>

                </div>
            </section>

            {showRanking && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(8px)' }}>
                    <div style={{ backgroundColor: '#0a1912', width: '90%', maxWidth: '650px', borderRadius: '20px', border: '1px solid #72bca1', padding: '40px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
                        <button onClick={() => setShowRanking(false)} style={{ position: 'absolute', top: '20px', right: '25px', background: 'transparent', border: 'none', color: '#ff6b6b', fontSize: '28px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                        
                        <h2 style={{ color: 'white', marginTop: 0, marginBottom: '5px', fontSize: '32px', textAlign: 'center' }}>🏆 Ranking Mensal</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '35px', fontSize: '16px' }}>As empresas que mais pouparam carbono em nossa rede.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {rankingData.map((item) => (
                                <div key={item.rank} style={{ backgroundColor: item.isCurrent ? 'rgba(114, 188, 161, 0.15)' : 'rgba(255,255,255,0.03)', border: item.isCurrent ? '1px solid #72bca1' : '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '18px 25px', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${(item.co2 / maxCo2) * 100}%`, backgroundColor: item.isCurrent ? 'rgba(114, 188, 161, 0.2)' : 'rgba(255,255,255,0.04)', zIndex: 1 }} />
                                    
                                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <span style={{ color: item.rank === 1 ? '#f1c40f' : (item.rank === 2 ? '#bdc3c7' : (item.rank === 3 ? '#cd7f32' : '#72bca1')), fontSize: '24px', fontWeight: 'bold', width: '40px' }}>#{item.rank}</span>
                                            <span style={{ color: 'white', fontSize: '18px', fontWeight: item.isCurrent ? 'bold' : 'normal' }}>{item.name} {item.isCurrent && <span style={{ color: '#72bca1', fontSize: '14px', marginLeft: '5px' }}>(Você)</span>}</span>
                                        </div>
                                        <span style={{ color: '#72bca1', fontWeight: 'bold', fontSize: '18px' }}>{item.co2.toLocaleString('pt-BR')} <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>kg CO₂</span></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Empresa;