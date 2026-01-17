const API_BASE_URL = 'http://localhost:3001/api';

export const getLabs = async () => {
  const response = await fetch(`${API_BASE_URL}/labs`);
  if (!response.ok) {
    throw new Error('Failed to fetch labs');
  }
  return response.json();
};

export const startLab = async (labId) => {
  const response = await fetch(`${API_BASE_URL}/labs/${labId}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to start lab');
  }
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