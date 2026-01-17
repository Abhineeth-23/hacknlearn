const k8sClient = require('./k8s-client');
const fs = require('fs');
const path = require('path');

async function startLab(labId) {
  const namespace = `lab-${labId}-${Date.now()}`;

  try {
    // Create namespace
    await k8sClient.createNamespace(namespace);

    // Load pod templates
    const attackPodSpec = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates/attack-pod.yaml'), 'utf8'));
    const targetPodSpec = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates/target-pod.yaml'), 'utf8'));
    const networkPolicySpec = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates/network-policy.yaml'), 'utf8'));

    // Update namespace in specs
    attackPodSpec.metadata.namespace = namespace;
    targetPodSpec.metadata.namespace = namespace;
    networkPolicySpec.metadata.namespace = namespace;

    // Create pods
    const attackPod = await k8sClient.createPod(namespace, attackPodSpec);
    const targetPod = await k8sClient.createPod(namespace, targetPodSpec);

    // Create network policy
    await k8sClient.createNetworkPolicy(namespace, networkPolicySpec);

    // Wait for pods to be ready and get IPs
    // In a real implementation, you'd poll for status
    const attackIP = await k8sClient.getPodIP(namespace, attackPod.metadata.name);
    const targetIP = await k8sClient.getPodIP(namespace, targetPod.metadata.name);

    return {
      namespace,
      attackPod: {
        name: attackPod.metadata.name,
        ip: attackIP
      },
      targetPod: {
        name: targetPod.metadata.name,
        ip: targetIP
      }
    };
  } catch (error) {
    // Cleanup on error
    try {
      await k8sClient.deleteNamespace(namespace);
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError);
    }
    throw error;
  }
}

async function stopLab(namespace) {
  try {
    await k8sClient.deleteNamespace(namespace);
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to stop lab: ${error.message}`);
  }
}

module.exports = {
  startLab,
  stopLab
};