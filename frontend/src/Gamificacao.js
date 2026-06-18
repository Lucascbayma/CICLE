import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import './App.css';
import logoImg from './cicle.png';
import SidebarMenu from './SidebarMenu';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

function Gamificacao() {
    const navigate = useNavigate();
    const [status, setStatus] = useState({ carbonoAcumulado: 0, paisesDisponiveis: 0, carbonoProximoPais: 250, paisesSalvos: [] });
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1.15 });
    const [paisSelecionado, setPaisSelecionado] = useState(null);
    const [continenteAtivo, setContinenteAtivo] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/gamificacao/status');
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            console.error(error);
        }
    };

    const adicionarCarbono = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/gamificacao/adicionar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            console.error(error);
        }
    };

    const resetarTudo = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/gamificacao/resetar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setStatus(data);
            resetMap();
        } catch (error) {
            console.error(error);
        }
    };

    const handleFocus = (coordinates, zoom) => {
        setPosition({ coordinates, zoom });
        setContinenteAtivo(true);
    };

    const resetMap = () => {
        setPosition({ coordinates: [0, 0], zoom: 1.15 });
        setContinenteAtivo(false);
        setPaisSelecionado(null);
    };

    const handleCountryClick = (geo) => {
        if (!continenteAtivo) return;
        if (status.paisesSalvos.includes(geo.properties.name)) return;
        setPaisSelecionado(geo);
    };

    const confirmarSalvamento = async () => {
        if (!paisSelecionado) return;
        try {
            const response = await fetch('http://localhost:8080/api/gamificacao/salvar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paisSelecionado.properties.name)
            });
            const data = await response.json();
            setStatus(data);
            resetMap();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ backgroundColor: '#0a1912', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', paddingLeft: '60px', boxSizing: 'border-box' }}>
            <SidebarMenu />

            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <img src={logoImg} alt="Cicle" style={{ height: '40px' }} />
            </header>

            <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ color: 'white', margin: '0 0 10px 0' }}>Mapa de Impacto Global</h1>
                    <p style={{ color: '#72bca1', margin: 0, fontSize: '18px' }}>Países Salvos: {status.paisesSalvos.length}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button onClick={adicionarCarbono} style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>+ 100kg CO2</button>
                        <button onClick={resetarTudo} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Resetar Mapa</button>
                    </div>

                    {status.paisesDisponiveis > 0 ? (
                        <div style={{ backgroundColor: '#72bca1', padding: '15px 30px', borderRadius: '10px', display: 'inline-block', textAlign: 'right' }}>
                            <h3 style={{ margin: 0, color: 'white' }}>Você pode salvar {status.paisesDisponiveis} país(es)!</h3>
                            <p style={{ margin: '5px 0 0 0', color: '#0a1912', fontSize: '14px', fontWeight: 'bold' }}>Selecione um continente abaixo para escolher.</p>
                        </div>
                    ) : (
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', display: 'inline-block', textAlign: 'right' }}>
                            <p style={{ margin: 0, color: 'white' }}>Faltam <strong>{status.carbonoProximoPais.toFixed(1)} kg</strong> de CO2</p>
                            <p style={{ margin: '5px 0 0 0', color: '#7ea488', fontSize: '14px' }}>para salvar o próximo país.</p>
                        </div>
                    )}
                </div>
            </div>

            {status.paisesDisponiveis > 0 && !continenteAtivo && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', padding: '20px', zIndex: 10 }}>
                    <button onClick={() => handleFocus([-60, -15], 2.5)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>América do Sul</button>
                    <button onClick={() => handleFocus([-100, 40], 2.5)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>América do Norte</button>
                    <button onClick={() => handleFocus([15, 50], 4)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>Europa</button>
                    <button onClick={() => handleFocus([20, 0], 2.5)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>África</button>
                    <button onClick={() => handleFocus([90, 30], 2)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>Ásia</button>
                    <button onClick={() => handleFocus([140, -25], 3.5)} className="login-button" style={{ width: 'auto', padding: '10px 20px', margin: 0 }}>Oceania</button>
                </div>
            )}

            {continenteAtivo && !paisSelecionado && (
                <div style={{ textAlign: 'center', padding: '10px', zIndex: 10 }}>
                    <p style={{ color: 'white', fontSize: '18px' }}>Clique em um país cinza para salvá-lo.</p>
                    <button onClick={resetMap} style={{ background: 'transparent', color: '#ff6b6b', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Cancelar foco</button>
                </div>
            )}

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#006994' }}>
                <ComposableMap projectionConfig={{ scale: 200 }} style={{ width: "100%", height: "100%" }}>
                    <ZoomableGroup zoom={position.zoom} center={position.coordinates} maxZoom={10} filterZoomEvent={(evt) => !paisSelecionado}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const countryName = geo.properties.name || "Desconhecido";
                                    const isSaved = status.paisesSalvos.includes(countryName);
                                    
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onClick={() => handleCountryClick(geo)}
                                            style={{
                                                default: { fill: isSaved ? "#72bca1" : "#2a3b32", outline: "none", stroke: "#006994", strokeWidth: 0.5 },
                                                hover: { fill: isSaved ? "#72bca1" : (continenteAtivo ? "#4a6b58" : "#2a3b32"), outline: "none", cursor: continenteAtivo && !isSaved ? "pointer" : "default" },
                                                pressed: { fill: "#1d5c42", outline: "none" }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>

                {paisSelecionado && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                        <div style={{ backgroundColor: '#112a1f', padding: '40px', borderRadius: '20px', textAlign: 'center', border: '1px solid #72bca1', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                            <h2 style={{ color: 'white', margin: '0 0 20px 0' }}>Deseja salvar: {paisSelecionado.properties.name}?</h2>
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <button onClick={confirmarSalvamento} className="login-button" style={{ margin: 0, width: '150px' }}>Confirmar</button>
                                <button onClick={() => setPaisSelecionado(null)} style={{ padding: '12px 30px', borderRadius: '8px', border: '1px solid #ff6b6b', backgroundColor: 'transparent', color: '#ff6b6b', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gamificacao;