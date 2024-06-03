import React, { useState, useEffect } from 'react';
import './InterfaceDocente.css';
//import DetalhesCandidatura from './DetalhesCandidatura'; // Importe o novo componente
import { useNavigate } from 'react-router-dom';

const InterfaceDocente = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [itemSelected, setItemSelected] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();
    //const [showDetalhesCandidatura, setShowDetalhesCandidatura] = useState(false);

    useEffect(() => {
        const storedApplications = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("candidatura_")) {
                //porque no local Storage tem candidatura_ e avaliacao_
                const applicationData = JSON.parse(localStorage.getItem(key));
                storedApplications.push(applicationData);
            }
        }
        setApplications(storedApplications);
    }, []);

    const handleApplicationSelect = (application, index) => {
        setSelectedApplication(application);
        setSelectedIndex(index);
        setItemSelected(true); // Marca um item como selecionado ao clicar nele
    };

    const sortApplications = (order) => {
        const sortedApplications = [...applications].sort((a, b) => {
            const notaA = parseFloat(a.mediaCurso);
            const notaB = parseFloat(b.mediaCurso);
            if (order === 'asc') {
                return notaA - notaB;
            } else {
                return notaB - notaA;
            }
        });
        setApplications(sortedApplications);
        setSortOrder(order);
    };

    const handleNewComponent = () => {
        if (itemSelected) {
            // Renderiza o novo componente e passa o índice selecionado como prop
            //setShowDetalhesCandidatura(true);
            navigate(`/detalhes-candidatura/${selectedIndex}`);
            console.log("Abrir nova componente!");
        } else {
            console.log("Nenhum item selecionado.");
        }
    };

    const handleDoubleClick = () => {
        // Função para lidar com o duplo clique
        if (itemSelected) {
            // Renderiza o novo componente e passa o índice selecionado como prop
            //setShowDetalhesCandidatura(true);
            navigate(`/detalhes-candidatura/${selectedIndex}`);
            console.log("Abrir nova componente no duplo clique!");
        }
    };

    return (
        <div className="interface-docente-container">
            <h2>Lista de Candidaturas</h2>
            <button onClick={() => sortApplications(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Ordenar por Nota ({sortOrder === 'asc' ? 'Ascendente' : 'Descendente'})
            </button>
            <button onClick={handleNewComponent} disabled={!itemSelected}>
                Abrir Detalhes 
            </button>
            <ul>
                {applications.map((application, index) => (
                    <li
                        key={index}
                        className={`application-item ${selectedApplication === application ? 'selected' : ''}`}
                        onClick={() => handleApplicationSelect(application, index)}
                        onDoubleClick={handleDoubleClick}
                    >
                        <p><strong>Nome:</strong> {application.nomeCompleto}</p>
                        <p><strong>Nota:</strong> {application.mediaCurso}</p>
                        <p><strong>Email:</strong> {application.email}</p>
                        <p><strong>Titulo de Graduacao:</strong> {application.tituloGraduacao}</p>
                        <p><strong>Estado:</strong> {application.estado}</p>
                        {/* Add other fields as needed */}
                    </li>
                ))}
            </ul>
            {/*{showDetalhesCandidatura && <DetalhesCandidatura selectedIndex={selectedIndex} applications={applications} />}*/}
        </div>
    );
};

export default InterfaceDocente;

