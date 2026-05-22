import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logoImg from './cicle.png';

function Usuario() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

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
                    <span style={{ color: 'white', fontWeight: 'bold' }}>Olá, Usuário</span>
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
                <h2 style={{ color: 'white', fontSize: '28px', marginBottom: '30px' }}>Minha Jornada CICLE</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                    
                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Metas de Emissão</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Defina seu limite mensal de carbono e acompanhe seu progresso em tempo real.</p>
                    </div>

                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏆</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Gamificação</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Desbloqueie conquistas e figuras ambientais ao realizar escolhas ecológicas.</p>
                    </div>

                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>💰</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Cashback Sustentável</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Converta a economia de CO2 das suas transações em saldo real na sua carteira.</p>
                    </div>

                    <div style={{ backgroundColor: '#112a1f', padding: '30px', borderRadius: '15px', border: '1px solid #1d5c42', cursor: 'pointer', transition: 'transform 0.2s' }}>
                        <div style={{ fontSize: '40px', marginBottom: '15px' }}>🌳</div>
                        <h3 style={{ color: '#72bca1', margin: '0 0 10px 0' }}>Árvores Salvas</h3>
                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Veja o impacto individual das suas ações convertido em árvores preservadas.</p>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default Usuario;