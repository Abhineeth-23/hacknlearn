import React, { useState } from 'react';
import LabTerminal from './components/LabTerminal';
import './styles/App.css';

function App() {
  const [session, setSession] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛡️ Cloud Native Cyber Range</h1>
      </header>
      <main>
        {!session ? (
          <div className="dashboard">
            <div className="lab-card">
              <h2>Lab 01: SQL Injection</h2>
              <p>Practice basic SQLi against a vulnerable Python app.</p>
              <button onClick={() => setSession(true)}>Start Lab</button>
            </div>
          </div>
        ) : (
          <LabTerminal />
        )}
      </main>
    </div>
  );
}

export default App;