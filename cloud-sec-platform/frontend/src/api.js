const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

export const getLabs = async () => {
  const response = await fetch(`${API_BASE}/api/labs`);
  return response.json();
};

export const startLab = async (labType) => {
  const response = await fetch(`${API_BASE}/api/start-lab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ labType }),
  });
  return response.json();
};

export const stopLab = async (labId) => {
  const response = await fetch(`${API_BASE_URL}/labs/${labId}/stop`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to stop lab');
  }
  return response.json();
};