import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value.trim());
        setUsernameValid(true);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        setPasswordValid(true);
    };

    const validateForm = () => {

        if (username === '') {
            setUsernameValid(false);
        }
        else if (password === '') {
            setPasswordValid(false);
        }
        else {
            const utilizadorAluno = 'aluno';
            const passwordAluno = 'aluno';
            const utilizadorDocente = 'docente';
            const passwordDocente = 'docente';


            if (username === utilizadorAluno && password === passwordAluno) {
                // Se der match
                alert('Sucesso');
                navigate('/interface-aluno');
            }
            else if (username === utilizadorDocente && password === passwordDocente) {
                alert('Sucesso');
                navigate('/interface-docente');
            }
            else {
                setUsernameValid(false);
                setPasswordValid(false);
            }         
        }      
    };



    return (
        <div className="form-container">
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
        </div>
    );
};

export default Login;