import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import InterfaceAluno from './InterfaceAluno';
import InterfaceDocente from './InterfaceDocente';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/interface-aluno" element={<InterfaceAluno />} />
                <Route path="/interface-docente" element={<InterfaceDocente />} />
            </Routes>
        </Router>
    );
};

export default App;