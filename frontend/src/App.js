import React from 'react';
import './App.css';
import Aurora from './Aurora';
import logoImg from './cicle.png';

function App() {
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
                            <p className="left-subtitle">acesse seus dados em tempo real</p>
                        </div>
                    </div>

                    <div className="login-right">
                        <h2 className="right-title">Registre seu cartão</h2>

                        <form className="login-form">
                            <div className="input-group">
                                <label>nome/email</label>
                                <input type="text" />
                            </div>
                            <div className="input-group">
                                <label>senha</label>
                                <input type="password" />
                            </div>
                            <div className="input-group">
                                <label>cpf</label>
                                <input type="text" placeholder="... ... ..." />
                            </div>
                            <div className="form-actions">
                                <label className="checkbox-container">
                                    <input type="checkbox" defaultChecked />
                                    <span className="checkmark"></span>
                                    lembrar
                                </label>
                                <a href="#esqueceu" className="forgot-password">esqueceu da senha?</a>
                            </div>
                            <button type="submit" className="login-button">Login</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;