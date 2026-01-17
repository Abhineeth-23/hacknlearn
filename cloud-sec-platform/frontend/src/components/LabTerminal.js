import React, { useState } from 'react';

const LabTerminal = () => {
  const [status, setStatus] = useState('idle');
  const [labIp, setLabIp] = useState('');

  const provisionLab = async () => {
    setStatus('provisioning');
    try {
      const res = await fetch('http://localhost:3001/api/start-lab', { method: 'POST' });
      const data = await res.json();
      setStatus('ready');
      alert(`Lab ${data.sessionId} created! Go to GKE Console, get the External IP for 'lab-service' in namespace '${data.sessionId}', and paste it below.`);
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="terminal-container">
      {status === 'idle' && (
        <button className="launch-btn" onClick={provisionLab}>
          🚀 Initialize Environment
        </button>
      )}

      {status === 'provisioning' && <p>SPINNING UP CONTAINERS...</p>}

      {status === 'ready' && !labIp && (
        <div className="ip-input">
          <p>Lab Ready. Enter LoadBalancer IP:</p>
          <input 
            placeholder="34.x.x.x" 
            onChange={(e) => setLabIp(e.target.value)} 
          />
        </div>
      )}

      {labIp && (
        <div className="iframe-wrapper">
          <iframe 
            src={`http://${labIp}`} 
            title="Terminal" 
            width="100%" 
            height="600px" 
          />
        </div>
      )}
    </div>
  );
};

export default LabTerminal;
