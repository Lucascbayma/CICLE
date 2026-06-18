import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

// LOGIN E SENHA ACEITAVEIS
const CREDENCIAIS = {
    usuario: { login: '123.456.789-01', senha: 'senha123' },
    empresa: { login: 'EDENRED-1234', senha: 'empresa123' },
};

function Login() {
    const navigate = useNavigate();
    const [tipoLogin, setTipoLogin] = useState('usuario');
    const [loginInput, setLoginInput] = useState('');
    const [senhaInput, setSenhaInput] = useState('');
    const [erro, setErro] = useState('');

    const trocarTipo = (tipo) => {
        setTipoLogin(tipo);
        setLoginInput('');
        setSenhaInput('');
        setErro('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const credenciais = CREDENCIAIS[tipoLogin];
        if (loginInput === credenciais.login && senhaInput === credenciais.senha) {
            setErro('');
            if (tipoLogin === 'empresa') {
                navigate('/empresa');
            } else {
                navigate('/usuario');
            }
        } else {
            setErro(
                tipoLogin === 'empresa'
                    ? 'Código da empresa ou senha inválidos.'
                    : 'CPF ou senha inválidos.'
            );
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
                                onClick={() => trocarTipo('usuario')}
                                style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '6px', backgroundColor: tipoLogin === 'usuario' ? '#72bca1' : 'transparent', color: tipoLogin === 'usuario' ? 'white' : '#a0a0a0', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                            >
                                Para Você
                            </button>
                            <button 
                                type="button"
                                onClick={() => trocarTipo('empresa')}
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
                                        <input
                                            type="text"
                                            placeholder="123.456.789-01"
                                            value={loginInput}
                                            onChange={(e) => setLoginInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Senha</label>
                                        <input
                                            type="password"
                                            value={senhaInput}
                                            onChange={(e) => setSenhaInput(e.target.value)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="input-group">
                                        <label>Código da Empresa</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: EDENRED-1234"
                                            value={loginInput}
                                            onChange={(e) => setLoginInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Senha</label>
                                        <input
                                            type="password"
                                            value={senhaInput}
                                            onChange={(e) => setSenhaInput(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-actions">
                                <a href="#esqueceu" className="forgot-password">Esqueceu sua senha?</a>
                            </div>
                            <button type="submit" className="login-button">Entrar</button>
                            {erro && (
                                <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
                                    {erro}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;