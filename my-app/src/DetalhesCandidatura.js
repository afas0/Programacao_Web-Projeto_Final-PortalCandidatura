import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import './DetalhesCandidatura.css';
import AvaliarCandidatura from './AvaliarCandidatura';

const DetalhesCandidatura = () => {
    const [showAvaliarForm, setShowAvaliarForm] = useState(false);
    const { index } = useParams();
    const applicationKey = localStorage.key(index);
    const application = JSON.parse(localStorage.getItem(applicationKey));


    if (!application) {
        return <div>Aplica��o n�o encontrada.</div>;
    }
    const handleAvaliarClick = () => {
        if (application.estado === "Nao avaliado") {
            setShowAvaliarForm(true);
        }      
    };

    return (
        <div>
            <div className="detalhes-candidatura-container">
                <h2>Detalhes da Candidatura</h2>
                <p><strong>Nome:</strong> {application.nomeCompleto}</p>
                <p><strong>Data de Nascimento:</strong> {application.dataNascimento}</p>
                <p><strong>Nacionalidade:</strong> {application.nacionalidade}</p>
                <p><strong>Endereco:</strong> {application.endereco}</p>
                <p><strong>Telefone:</strong> {application.telefone}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>Titulo de Graduacao:</strong> {application.tituloGraduacao}</p>
                <p><strong>Instituicao:</strong> {application.instituicao}</p>
                <p><strong>Area de Estudo:</strong> {application.areaEstudo}</p>
                <p><strong>Media do Curso:</strong> {application.mediaCurso}</p>
                <p><strong>Outros Cursos:</strong> {application.outrosCursos}</p>
                <p><strong>Experiencia:</strong> {application.experiencia}</p>
                <p><strong>Estagios:</strong> {application.estagios}</p>
                <p><strong>Qualificacoes:</strong> {application.qualificacoes}</p>
                <p><strong>Carta de Motivacao:</strong> {application.cartaMotivacao}</p>
                <p><strong>Objetivos de Carreira:</strong> {application.objetivosCarreira}</p>
                <p><strong>Interesses de Pesquisa:</strong> {application.interessesPesquisa}</p>
                <p><strong>Cartas de Recomendacao:</strong> {application.cartasRecomendacao}</p>
                <p><strong>Contacto de Referencias:</strong> {application.contatoReferencias}</p>
            </div>
            <div className="container">
                <button className={application.estado === "Avaliado" ? "button disabled" : "button"} onClick={handleAvaliarClick} disabled={application.estado === "Avaliado"}>Avaliar</button>
            </div>
            {showAvaliarForm && (
                <div className="avaliar-candidatura-container">
                    <AvaliarCandidatura applicationKey={applicationKey} />
                </div>
            )}
        </div>
    );
};

export default DetalhesCandidatura;