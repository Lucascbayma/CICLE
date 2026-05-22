import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Calculadora from './Calculadora';
import Usuario from './Usuario';
import Empresa from './Empresa';
import Gamificacao from './Gamificacao';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calculadora" element={<Calculadora />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/gamificacao" element={<Gamificacao />} />
            </Routes>
        </Router>
    );
}

export default App;