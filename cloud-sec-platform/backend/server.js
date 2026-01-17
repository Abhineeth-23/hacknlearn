const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/labs', (req, res) => {
  // Return list of available labs
  res.json([
    { id: 'lab-01-sqli', name: 'SQL Injection Lab', description: 'Practice SQL injection attacks' }
  ]);
});

app.post('/api/labs/:labId/start', async (req, res) => {
  const { labId } = req.params;
  try {
    // Logic to start lab using Kubernetes
    const labManager = require('./src/lab-manager');
    const result = await labManager.startLab(labId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/labs/:labId/stop', async (req, res) => {
  const { labId } = req.params;
  try {
    const labManager = require('./src/lab-manager');
    const result = await labManager.stopLab(labId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});