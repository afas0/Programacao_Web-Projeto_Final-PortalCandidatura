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
                        alert('Sucesso');
                        navigate('/interface-aluno', { state: { userId: key } });
                    }
                }
            }

            if (username === utilizadorDocente && password === passwordDocente) {
                alert('Sucesso');
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
            alert('Usuário registado com sucesso!');
            setShowRegisterModal(false);
        }
    };

    return (
        <div className="login-container">
            <div className={`form-container ${showRegisterModal ? 'blur' : ''}`}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
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
                <button type="button" onClick={validateForm}>Submeter</button>
                <button type="button" onClick={handleRegisterClick}>Registrar</button>
            </div>

            {showRegisterModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <h2>Registrar</h2>
                        <div className="form-group">
                            <label htmlFor="newUsername">Novo Username:</label>
                            <input
                                type="text"
                                id="newUsername"
                                value={storedUsername}
                                onChange={handleNewUsernameChange}
                                className={newUsernameValid ? '' : 'invalid'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nova Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={storedPassword}
                                onChange={handleNewPasswordChange}
                                className={newPasswordValid ? '' : 'invalid'}
                            />
                        </div>
                        <button type="button" onClick={handleRegisterSubmit}>Registrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;