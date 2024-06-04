import React, { useState, useEffect } from 'react';
import './InterfaceAluno.css';
import { useLocation } from 'react-router-dom';

const InterfaceAluno = () => {

    const location = useLocation();
    // para receber o id do utilizador
    const { userId } = location.state || { userId: 'Unknown' };

    //alert(userId);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        dataNascimento: '',
        nacionalidade: '',
        endereco: '',
        telefone: '',
        email: '',
        tituloGraduacao: '',
        instituicao: '',
        areaEstudo: '',
        mediaCurso: '',
        outrosCursos: '',
        experiencia: '',
        estagios: '',
        qualificacoes: '',
        cartaMotivacao: '',
        objetivosCarreira: '',
        interessesPesquisa: '',
        cartasRecomendacao: '',
        contatoReferencias: ''
    });
    const [invalidFields, setInvalidFields] = useState({});
    const [submitted, setSubmitted] = useState(false);
    //utilizador_1717457282591

    useEffect(() => {
        // Verifique se há uma candidatura associada ao usuário com a chave fornecida
        const checkCandidatura = () => {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("candidatura_")) {
                    const candidaturaData = JSON.parse(localStorage.getItem(key));
                    if (candidaturaData.utilizador_id === userId) {
                        // Se houver uma candidatura associada, defina o botão como desabilitado
                        setSubmitted(true);
                        return; // Saia do loop assim que encontrar uma candidatura
                    }
                }
            }
        };
        checkCandidatura();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newInvalidFields = {};
        Object.keys(formData).forEach((key) => {
            if (formData[key] === '') {
                newInvalidFields[key] = true;
            }
        });

        setInvalidFields(newInvalidFields);

        if (Object.keys(newInvalidFields).length === 0) {          

            //valor unico
            const newKey = `candidatura_${Date.now()}`;
            // Adicionando o novo campo ao formulário antes de enviar
            const formDataWithStatus = { ...formData, utilizador_id: userId,  estado: "Nao avaliado" };
            // Guarda os dados atualizados no localStorage
            localStorage.setItem(newKey, JSON.stringify(formDataWithStatus));
            //limpar os campos
            alert('Sucesso');
            setSubmitted(true);
            setShowForm(false);
        }
    };

    const toggleForm = () => {
        if (!submitted) {
            setShowForm(prevShowForm => !prevShowForm);
        }
    };

    const getInputClass = (name) => invalidFields[name] ? 'invalid' : '';

    return (
        <div className="interface-aluno-container">
            <button onClick={toggleForm} className={submitted ? 'disabled' : ''}>
                {submitted ? 'Candidatura Submetida' : (showForm ? 'Esconder' : 'Criar Candidatura')}
            </button>
            {showForm && (
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>Informa&ccedil;&otilde;es Pessoais</h2>
                    <div className="form-group">
                        <label htmlFor="nomeCompleto">Nome completo:</label>
                        <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            onChange={handleChange}
                            className={getInputClass('nomeCompleto')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de nascimento:</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            className={getInputClass('dataNascimento')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nacionalidade">Nacionalidade:</label>
                        <input
                            type="text"
                            id="nacionalidade"
                            name="nacionalidade"
                            value={formData.nacionalidade}
                            onChange={handleChange}
                            className={getInputClass('nacionalidade')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endereco">Endere&ccedil;o residencial:</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            className={getInputClass('endereco')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefone">N&uacute;mero de telefone:</label>
                        <input
                            type="number"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className={getInputClass('telefone')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={getInputClass('email')}
                        />
                    </div>

                    <h2>Forma&ccedil;&atilde;o Acad&eacute;mica</h2>
                    <div className="form-group">
                        <label htmlFor="tituloGraduacao">T&iacute;tulo de gradua&ccedil;&atilde;o:</label>
                        <input
                            type="text"
                            id="tituloGraduacao"
                            name="tituloGraduacao"
                            value={formData.tituloGraduacao}
                            onChange={handleChange}
                            className={getInputClass('tituloGraduacao')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instituicao">Institui&ccedil;&atilde;o de ensino:</label>
                        <input
                            type="text"
                            id="instituicao"
                            name="instituicao"
                            value={formData.instituicao}
                            onChange={handleChange}
                            className={getInputClass('instituicao')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="areaEstudo">&Aacute;rea de estudo:</label>
                        <input
                            type="text"
                            id="areaEstudo"
                            name="areaEstudo"
                            value={formData.areaEstudo}
                            onChange={handleChange}
                            className={getInputClass('areaEstudo')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mediaCurso">M&eacute;dia do curso de gradua&ccedil;&atilde;o:</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="20"
                            id="mediaCurso"
                            name="mediaCurso"
                            value={formData.mediaCurso}
                            onChange={handleChange}
                            className={getInputClass('mediaCurso')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="outrosCursos">Outros cursos relevantes:</label>
                        <input
                            type="text"
                            id="outrosCursos"
                            name="outrosCursos"
                            value={formData.outrosCursos}
                            onChange={handleChange}
                            className={getInputClass('outrosCursos')}
                        />
                    </div>

                    <h2>Experi&ecirc;ncia Profissional</h2>
                    <div className="form-group">
                        <label htmlFor="experiencia">Experi&ecirc;ncia de trabalho relevante:</label>
                        <input
                            type="text"
                            id="experiencia"
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}
                            className={getInputClass('experiencia')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="estagios">Est&aacute;gios ou projetos relevantes:</label>
                        <input
                            type="text"
                            id="estagios"
                            name="estagios"
                            value={formData.estagios}
                            onChange={handleChange}
                            className={getInputClass('estagios')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="qualificacoes">Qualifica&ccedil;&otilde;es profissionais adicionais:</label>
                        <input
                            type="text"
                            id="qualificacoes"
                            name="qualificacoes"
                            value={formData.qualificacoes}
                            onChange={handleChange}
                            className={getInputClass('qualificacoes')}
                        />
                    </div>

                    <h2>Carta de Motiva&ccedil;&atilde;o</h2>
                    <div className="form-group">
                        <label htmlFor="cartaMotivacao">Carta de motiva&ccedil;&atilde;o:</label>
                        <textarea
                            id="cartaMotivacao"
                            name="cartaMotivacao"
                            value={formData.cartaMotivacao}
                            onChange={handleChange}
                            className={getInputClass('cartaMotivacao')}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="objetivosCarreira">Objetivos de carreira:</label>
                        <textarea
                            id="objetivosCarreira"
                            name="objetivosCarreira"
                            value={formData.objetivosCarreira}
                            onChange={handleChange}
                            className={getInputClass('objetivosCarreira')}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="interessesPesquisa">Interesses de pesquisa:</label>
                        <textarea
                            id="interessesPesquisa"
                            name="interessesPesquisa"
                            value={formData.interessesPesquisa}
                            onChange={handleChange}
                            className={getInputClass('interessesPesquisa')}
                        ></textarea>
                    </div>

                    <h2>Recomenda&ccedil;&otilde;es</h2>
                    <div className="form-group">
                        <label htmlFor="cartasRecomendacao">Cartas de recomenda&ccedil;&otilde;es:</label>
                        <textarea
                            id="cartasRecomendacao"
                            name="cartasRecomendacao"
                            value={formData.cartasRecomendacao}
                            onChange={handleChange}
                            className={getInputClass('cartasRecomendacao')}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contatoReferencias">Contacto de refer&ecirc;ncias:</label>
                        <input
                            type="text"
                            id="contatoReferencias"
                            name="contatoReferencias"
                            value={formData.contatoReferencias}
                            onChange={handleChange}
                            className={getInputClass('contatoReferencias')}
                        />
                    </div>

                    <button type="submit">Enviar</button>
                </form>
            )}
        </div>
    );
};

export default InterfaceAluno;





