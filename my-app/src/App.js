// App.js
import React from 'react';
import Login from './Login'; // Importe o componente de login que voc� criou

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Remova o conte�do anterior e renderize o componente de login */}
                <Login />
            </header>
        </div>
    );
}

export default App;
