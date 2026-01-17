const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
const k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1Api);

async function createNamespace(name) {
  const namespace = {
    metadata: {
      name: name
    }
  };
  try {
    const response = await k8sApi.createNamespace(namespace);
    return response.body;
  } catch (error) {
    throw new Error(`Failed to create namespace: ${error.message}`);
  }
}

async function deleteNamespace(name) {
  try {
    await k8sApi.deleteNamespace(name);
  } catch (error) {
    throw new Error(`Failed to delete namespace: ${error.message}`);
  }
}

async function createPod(namespace, podSpec) {
  try {
    const response = await k8sApi.createNamespacedPod(namespace, podSpec);
    return response.body;
  } catch (error) {
    throw new Error(`Failed to create pod: ${error.message}`);
  }
}

async function deletePod(namespace, podName) {
  try {
    await k8sApi.deleteNamespacedPod(podName, namespace);
  } catch (error) {
    throw new Error(`Failed to delete pod: ${error.message}`);
  }
}

async function getPodIP(namespace, podName) {
  try {
    const response = await k8sApi.readNamespacedPod(podName, namespace);
    return response.body.status.podIP;
  } catch (error) {
    throw new Error(`Failed to get pod IP: ${error.message}`);
  }
}

async function createNetworkPolicy(namespace, policySpec) {
  try {
    const response = await k8sNetworkingApi.createNamespacedNetworkPolicy(namespace, policySpec);
    return response.body;
  } catch (error) {
    throw new Error(`Failed to create network policy: ${error.message}`);
  }
}

module.exports = {
  createNamespace,
  deleteNamespace,
  createPod,
  deletePod,
  getPodIP,
  createNetworkPolicy
};