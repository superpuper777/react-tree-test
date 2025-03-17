import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  getTree: (treeName) =>
    axios.get(`${API_URL}/api.user.tree.get`, { params: { treeName } }),
  createNode: (treeName, parentNodeId, nodeName) =>
    axios.post(`${API_URL}/api.user.tree.node.create`, null, {
      params: { treeName, parentNodeId, nodeName },
    }),
  renameNode: (treeName, nodeId, newNodeName) =>
    axios.post(`${API_URL}/api.user.tree.node.rename`, null, {
      params: { treeName, nodeId, newNodeName },
    }),
  deleteNode: (treeName, nodeId) =>
    axios.post(`${API_URL}/api.user.tree.node.delete`, null, {
      params: { treeName, nodeId },
    }),
};
