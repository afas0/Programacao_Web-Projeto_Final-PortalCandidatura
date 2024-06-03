import React, { useState, useEffect } from 'react';
import './InterfaceDocente.css';
import { useNavigate } from 'react-router-dom';

const InterfaceDocente = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [itemSelected, setItemSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedApplications = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("candidatura_")) {
                const applicationData = JSON.parse(localStorage.getItem(key));
                storedApplications.push(applicationData);
            }
        }
        setApplications(storedApplications);
        setFilteredApplications(storedApplications);
    }, []);

    const handleApplicationSelect = (application, index) => {
        setSelectedApplication(application);
        setSelectedIndex(index);
        setItemSelected(true);
    };

    const sortApplications = (order) => {
        const sortedApplications = [...filteredApplications].sort((a, b) => {
            const notaA = parseFloat(a.mediaCurso);
            const notaB = parseFloat(b.mediaCurso);
            return order === 'asc' ? notaA - notaB : notaB - notaA;
        });
        setFilteredApplications(sortedApplications);
        setSortOrder(order);
    };

    const handleNewComponent = () => {
        if (itemSelected) {
            navigate(`/detalhes-candidatura/${selectedIndex}`);
        }
    };

    const handleDoubleClick = () => {
        if (itemSelected) {
            navigate(`/detalhes-candidatura/${selectedIndex}`);
        }
    };

    const filterApplications = (filter) => {
        let filtered = applications;
        if (filter === 'approved') {
            filtered = applications.filter(app => app.estado.toLowerCase() === 'avaliado');
        } else if (filter === 'pending') {
            filtered = applications.filter(app => app.estado.toLowerCase() === 'nao avaliado');
        } else {
            filtered = applications;
        }
        setFilteredApplications(filtered);
    };

    return (
        <div className="interface-docente-container">
            <div className="header">
                <h2>Lista de Candidaturas</h2>
            </div>
            <div className="buttons-container">
                <button onClick={() => sortApplications(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    Ordenar por Nota ({sortOrder === 'asc' ? 'Ascendente' : 'Descendente'})
                </button>
                <button onClick={handleNewComponent} disabled={!itemSelected}>
                    Abrir Detalhes 
                </button>
                <button onClick={() => filterApplications('all')}>
                    Todas Candidaturas
                </button>
                <button onClick={() => filterApplications('pending')}>
                    Candidaturas por Aprovar
                </button>
                <button onClick={() => filterApplications('approved')}>
                    Candidaturas Aprovadas
                </button>
            </div>
            <ul>
                {filteredApplications.map((application, index) => (
                    <li
                        key={index}
                        className={`application-item ${selectedApplication === application ? 'selected' : ''}`}
                        onClick={() => handleApplicationSelect(application, index)}
                        onDoubleClick={handleDoubleClick}
                    >
                        <p><strong>Nome:</strong> {application.nomeCompleto}</p>
                        <p><strong>Nota:</strong> {application.mediaCurso}</p>
                        <p><strong>Email:</strong> {application.email}</p>
                        <p><strong>Título de Graduação:</strong> {application.tituloGraduacao}</p>
                        <p><strong>Estado:</strong> {application.estado}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterfaceDocente;