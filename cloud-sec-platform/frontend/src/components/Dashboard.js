import React, { useState, useEffect } from 'react';
import LabCard from './LabCard';
import { getLabs } from '../api';

function Dashboard() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const labsData = await getLabs();
        setLabs(labsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  if (loading) return <div>Loading labs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h2>Available Labs</h2>
      <div className="lab-grid">
        {labs.map(lab => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;