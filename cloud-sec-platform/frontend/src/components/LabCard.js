import React, { useState } from 'react';
import { startLab, stopLab } from '../api';
import Terminal from './Terminal';

function LabCard({ lab }) {
  const [isRunning, setIsRunning] = useState(false);
  const [labInstance, setLabInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartLab = async () => {
    setLoading(true);
    try {
      const result = await startLab(lab.id);
      setLabInstance(result);
      setIsRunning(true);
    } catch (error) {
      alert(`Failed to start lab: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStopLab = async () => {
    if (!labInstance) return;
    setLoading(true);
    try {
      await stopLab(labInstance.namespace);
      setIsRunning(false);
      setLabInstance(null);
    } catch (error) {
      alert(`Failed to stop lab: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lab-card">
      <h3>{lab.name}</h3>
      <p>{lab.description}</p>
      {!isRunning ? (
        <button onClick={handleStartLab} disabled={loading}>
          {loading ? 'Starting...' : 'Start Lab'}
        </button>
      ) : (
        <div>
          <p>Lab is running!</p>
          <p>Attack Box IP: {labInstance?.attackPod?.ip}</p>
          <p>Target IP: {labInstance?.targetPod?.ip}</p>
          <Terminal attackIP={labInstance?.attackPod?.ip} />
          <button onClick={handleStopLab} disabled={loading}>
            {loading ? 'Stopping...' : 'Stop Lab'}
          </button>
        </div>
      )}
    </div>
  );
}

export default LabCard;