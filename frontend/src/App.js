import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Calculadora from './Calculadora';
import Usuario from './Usuario';
import Empresa from './Empresa';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/calculadora" element={<Calculadora />} />
                <Route path="/usuario" element={<Usuario />} />
                <Route path="/empresa" element={<Empresa />} />
            </Routes>
        </Router>
    );
}

export default App;