const express = require('express');
const { startLab, stopLab, getLabs } = require('./src/lab-manager');
const app = express();
app.use(express.json());

const PROJECT_ID = process.env.GCP_PROJECT_ID;  // Changed to match .env
const REGION = 'us-central1';
const REPO_NAME = 'cloud-sec-repo';  // Consistent with scripts

app.post('/api/start-lab', async (req, res) => {
  try {
    const { labType } = req.body;
    const attackImage = `us-central1-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/attack-box:latest`;  // Updated repo and tag
    const targetImage = `us-central1-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/lab-01-sqli:latest`;
    const result = await startLab(labType, attackImage, targetImage);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint for /api/labs
app.get('/api/labs', async (req, res) => {
  try {
    const labs = await getLabs();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Backend listening on port 3001'));