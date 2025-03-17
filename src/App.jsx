import React, { useState, useEffect } from 'react';
// import api from './api';
import { api } from './api';
import TreeView from './components/TreeView';
import Modal from './components/Modal/Modal';
import './App.css';
import { generateTreeName, findNodeById } from './helpers';

function App() {
  const [treeData, setTreeData] = useState(null);
  const [treeName, setTreeName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: '', nodeId: null });
  const [nodeName, setNodeName] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({});

  const openModal = (type, nodeId = null) => {
    if (type === 'edit' && nodeId) {
      const node = findNodeById([treeData], nodeId);
      setNodeName(node?.name || '');
    } else {
      setNodeName('');
    }
    setModal({ isOpen: true, type, nodeId });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', nodeId: null });
    setNodeName('');
  };

  const loadTree = async () => {
    try {
      const savedTreeName =
        localStorage.getItem('treeName') || generateTreeName();
      console.log('Tree Name:', savedTreeName);

      setTreeName(savedTreeName);

      const { data } = await api.getTree(savedTreeName);
      console.log('tree:', data);

      setTreeData(data);
    } catch (error) {
      console.error('Error loading tree:', error);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNode = async (nodeId) => {
    try {
      await api.createNode(treeName, nodeId, nodeName);
      loadTree();
      closeModal();
    } catch (error) {
      console.error('Error creating node:', error);
    }
  };

  const handleEditNode = async (nodeId) => {
    try {
      await api.renameNode(treeName, nodeId, nodeName);
      loadTree();
      closeModal();
    } catch (error) {
      console.error('Error updating node:', error);
    }
  };

  const deleteNodeRecursively = async (node) => {
    try {
      if (node.children && node.children.length > 0) {
        for (const childNode of node.children) {
          await deleteNodeRecursively(childNode);
        }
      }
      await api.deleteNode(treeName, node.id);
      console.log(`Node with ID ${node.id} deleted`);
    } catch (error) {
      console.error('Error deleting node or its child elements:', error);
      throw error;
    }
  };

  const handleDeleteNode = async (nodeId) => {
    const nodeToDelete = findNodeById([treeData], nodeId);

    if (nodeToDelete) {
      try {
        await deleteNodeRecursively(nodeToDelete);
        loadTree();
        closeModal();
      } catch (error) {
        console.error('Error deleting node', error);
      }
    } else {
      console.error('Node with this ID not found');
    }
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  useEffect(() => {
    loadTree();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <h2>Tree View</h2>
      <TreeView
        treeData={treeData}
        expandedNodes={expandedNodes}
        toggleNode={toggleNode}
        openModal={openModal}
        deleteNode={(nodeId) => openModal('delete', nodeId)}
      />
      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        nodeName={nodeName}
        onClose={closeModal}
        onChange={setNodeName}
        onSave={() =>
          modal.type === 'create'
            ? handleCreateNode(modal.nodeId)
            : handleEditNode(modal.nodeId)
        }
        onDelete={() => handleDeleteNode(modal.nodeId)}
      />
    </div>
  );
}

export default App;
