import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function Login() {
    const navigate = useNavigate();
    const [tipoLogin, setTipoLogin] = useState('usuario');

    const handleLogin = (e) => {
        e.preventDefault();
        if (tipoLogin === 'empresa') {
            navigate('/calculadora');
        } else {
            navigate('/usuario');
        }
    };

    return (
        <div className="login-background">
            <div className="aurora-wrapper">
                <Aurora
                    colorStops={["#72bca1","#1d5c42","#7ea488"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={1}
                />
            </div>

            <div className="glass-container">
                <div className="login-card">
                    <div className="login-left">
                        <img src={logoImg} alt="Logo Cicle" className="logo"/>
                        <div className="left-content">
                            <h2 className="left-title">Acompanhe sua jornada<br />de Co2 conosco!</h2>
                            <p className="left-subtitle">Acesse seus dados em tempo real</p>
                        </div>
                    </div>

                    <div className="login-right">
                        <div style={{ display: 'flex', width: '100%', marginBottom: '30px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '5px' }}>
                            <button 
                                type="button"
                                onClick={() => setTipoLogin('usuario')}
                                style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '6px', backgroundColor: tipoLogin === 'usuario' ? '#72bca1' : 'transparent', color: tipoLogin === 'usuario' ? 'white' : '#a0a0a0', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Para Você
                            </button>
                            <button 
                                type="button"
                                onClick={() => setTipoLogin('empresa')}
                                style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '6px', backgroundColor: tipoLogin === 'empresa' ? '#72bca1' : 'transparent', color: tipoLogin === 'empresa' ? 'white' : '#a0a0a0', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Para Empresas
                            </button>
                        </div>

                        <form className="login-form" onSubmit={handleLogin}>
                            {tipoLogin === 'usuario' ? (
                                <>
                                    <div className="input-group">
                                        <label>CPF</label>
                                        <input type="text" placeholder="123.456.789-01" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Senha</label>
                                        <input type="password" required />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="input-group">
                                        <label>Código da Empresa</label>
                                        <input type="text" placeholder="Ex: EDENRED-1234" required />
                                    </div>
                                    <div className="input-group">
                                        <label>Senha</label>
                                        <input type="password" required />
                                    </div>
                                </>
                            )}
                            
                            <div className="form-actions">
                                <a href="#esqueceu" className="forgot-password">Esqueceu sua senha?</a>
                            </div>
                            <button type="submit" className="login-button">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;