import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [storedUsername, setNewUsername] = useState('');
    const [storedPassword, setNewPassword] = useState('');
    const [newUsernameValid, setNewUsernameValid] = useState(true);
    const [newPasswordValid, setNewPasswordValid] = useState(true);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value.trim());
        setUsernameValid(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        setPasswordValid(true);
    };

    const handleNewUsernameChange = (e) => {
        setNewUsername(e.target.value.trim());
        setNewUsernameValid(true);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value.trim());
        setNewPasswordValid(true);
    };
    const handleClosePopup = () => {
        setShowSuccessPopup(false);
    };

    const validateForm = () => {
        if (username === '') {
            setUsernameValid(false);
        } else if (password === '') {
            setPasswordValid(false);
        } else {

            const utilizadorDocente = 'docente';
            const passwordDocente = 'docente';
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("utilizador_")) {
                    //porque no local Storage tem candidatura_ e avaliacao_ e utilizador_
                    const userData = JSON.parse(localStorage.getItem(key));
                    if (userData.storedUsername === username || userData.storedPassword === password) {
                        navigate('/interface-aluno', { state: { userId: key } });
                    }
                }
            }

            if (username === utilizadorDocente && password === passwordDocente) {
                navigate('/interface-docente');
            } else {
                setUsernameValid(false);
                setPasswordValid(false);
            }
        }
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
    };

    const handleCloseModal = () => {
        setShowRegisterModal(false);
    };

    const handleRegisterSubmit = () => {
        const estadoConcursoJSON = localStorage.getItem('estadoConcurso');

        if (estadoConcursoJSON) {

            const estadoConcurso = JSON.parse(estadoConcursoJSON);
            if (estadoConcurso.estado === 'Fechado') {

                alert("Concurso encerrado, sem sucesso")
            }
        }
        else {

            if (storedUsername === '') {
                setNewUsernameValid(false);
            }
            if (storedPassword === '') {
                setNewPasswordValid(false);
            }
            if (storedUsername !== '' && storedPassword !== '') {
                const newKey = `utilizador_${Date.now()}`;
                //const id = applicationKey;
                // Salva os dados da avaliação no localStorage
                const formData = {
                    //id,
                    storedUsername,
                    storedPassword
                };
                localStorage.setItem(newKey, JSON.stringify(formData));
                setShowSuccessPopup(true);
                setShowRegisterModal(false);
            }
        }
        
    };

    return (
        <div className="login-container">
            <div className={`login-form-container ${showRegisterModal ? 'blur' : ''}`}>
                <div className="login-form-group">
                    <label htmlFor="username">Utilizador:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className={usernameValid ? '' : 'invalid'}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={passwordValid ? '' : 'invalid'}
                    />
                </div>
                <button type="button" onClick={validateForm}>Login</button>
                <button type="button" onClick={handleRegisterClick}>Criar Conta</button>
            </div>

            {showRegisterModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <h2>Criar Conta</h2>
                        <div className="form-group">
                            <label htmlFor="newUsername">Utilizador:</label>
                            <input
                                type="text"
                                id="newUsername"
                                value={storedUsername}
                                onChange={handleNewUsernameChange}
                                className={newUsernameValid ? '' : 'invalid'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={storedPassword}
                                onChange={handleNewPasswordChange}
                                className={newPasswordValid ? '' : 'invalid'}
                            />
                        </div>
                        <button type="button" onClick={handleRegisterSubmit}>Registar</button>
                    </div>
                </div>

            )}
            {showSuccessPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-button-popup" onClick={handleClosePopup}>x</button>
                        <p>Utilizador registado com sucesso!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;