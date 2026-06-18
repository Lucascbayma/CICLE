import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Calculadora from './Calculadora';
import CalculadoraAmbiental from './CalculadoraAmbiental';
import Usuario from './Usuario';
import Empresa from './Empresa';
import Gamificacao from './Gamificacao';
import Metas from './Metas';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calculadora" element={<Calculadora />} />
                <Route path="/calculadora-ambiental" element={<CalculadoraAmbiental />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/gamificacao" element={<Gamificacao />} />
                <Route path="/metas" element={<Metas />} />
            </Routes>
        </Router>
    );
}

export default App;