const k8sClient = require('./k8s-client');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

async function startLab(labType, attackImage, targetImage) {
  const namespace = `lab-${labType}-${Date.now()}`;

  try {
    // Create namespace
    await k8sClient.createNamespace(namespace);

    // Load and parse YAML templates
    const attackPodYaml = fs.readFileSync(path.join(__dirname, '../templates/attack-pod.yaml'), 'utf8');
    const attackPodSpec = yaml.load(attackPodYaml);
    attackPodSpec.spec.containers[0].image = attackImage;

    const targetPodYaml = fs.readFileSync(path.join(__dirname, '../templates/target-pod.yaml'), 'utf8');
    const targetPodSpec = yaml.load(targetPodYaml);
    targetPodSpec.spec.containers[0].image = targetImage;

    const networkPolicyYaml = fs.readFileSync(path.join(__dirname, '../templates/network-policy.yaml'), 'utf8');
    const networkPolicySpec = yaml.load(networkPolicyYaml);

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

async function getLabs() {
  // Placeholder: return a list of available labs
  return [
    { id: 'lab-01-sqli', name: 'SQL Injection Lab', description: 'Learn about SQL injection vulnerabilities' }
  ];
}

module.exports = {
  startLab,
  stopLab,
  getLabs
};