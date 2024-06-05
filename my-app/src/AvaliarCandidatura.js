import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AvaliarCandidatura.css';

const AvaliarCandidatura = ({ applicationKey }) => {
    const [notaAcademica, setNotaAcademica] = useState('');
    const [notaProfissional, setNotaProfissional] = useState('');
    const [comentario, setComentario] = useState('');
    const navigate = useNavigate();
    const [showFailedPopup, setShowFailedPopup] = useState(false);
    
    const handleClosePopup = () => {
        setShowFailedPopup(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Verifica se todos os campos estão preenchidos
        if (
            notaAcademica !== '' &&
            notaProfissional !== '' &&
            comentario !== ''
        ) {
            // Gera uma chave única para a avaliação
            const newKey = `avaliacao_${Date.now()}`;
            const id = applicationKey;
            // Salva os dados da avaliação no localStorage
            const formData = {
                id,
                notaAcademica,
                notaProfissional,
                comentario
            };
            localStorage.setItem(newKey, JSON.stringify(formData));
            // para alterar o estado para avaliado depois de clicar no butao
            const application = JSON.parse(localStorage.getItem(applicationKey)); 
            if (application) {
                application.estado = "Avaliado";
                //Para calcular a nota final
                const parametros = JSON.parse(localStorage.getItem("parametros"));

                let nota = (notaAcademica * (parametros.pesoAcademico / 100)) + (notaProfissional * (parametros.pesoProfissional / 100));
                   
                application.notafinal = nota;
                localStorage.setItem(applicationKey, JSON.stringify(application));
            }
            
            navigate('/interface-docente');
        } else {
            setShowFailedPopup(true);
        }
    };

    return (
        <div className="avaliar-candidatura-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nota Academica:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={notaAcademica}
                        onChange={(e) => setNotaAcademica(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nota Profissional:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={notaProfissional}
                        onChange={(e) => setNotaProfissional(e.target.value)}
                    />
                </div>             
                <div>
                    <label>Comentario:</label>
                    <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Enviar Avaliacao</button>

            </form>
            {showFailedPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-button-popup" onClick={handleClosePopup}>x</button>
                        <p>Campos por preencher!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvaliarCandidatura;