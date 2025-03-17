import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import api from './api';
import { api } from './api';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState(null);
  const [treeName, setTreeName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: '', nodeId: null });
  const [nodeName, setNodeName] = useState('');

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

  const generateTreeName = () => {
    const newTreeName = uuidv4();
    localStorage.setItem('treeName', newTreeName);
    return newTreeName;
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

  const findNodeById = (nodes, id) => {
    for (let node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children && node.children.length > 0) {
        const foundNode = findNodeById(node.children, id);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
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

  useEffect(() => {
    loadTree();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const renderTree = (node) => (
    <div key={node.id} className="tree-node">
      <span>{node.name}</span>
      <button onClick={() => openModal('create', node.id)}>➕</button>
      <button onClick={() => openModal('edit', node.id)}>✏️</button>
      <button onClick={() => openModal('delete', node.id)}>🗑️</button>
      {node.children?.length > 0 && (
        <div className="children">{node.children.map(renderTree)}</div>
      )}
    </div>
  );

  return (
    <div className="app">
      <h1>Tree: {treeName}</h1>
      {treeData ? renderTree(treeData) : <p>Tree is empty</p>}

      {modal.isOpen && (
        <div className="darkBG">
          <div className="centered">
            <div className="modal">
              <div className="modal__content">
                <h2>
                  {modal.type === 'create'
                    ? 'Add Node'
                    : modal.type === 'edit'
                    ? 'Edit Node'
                    : 'Delete Node'}
                </h2>
                {modal.type !== 'delete' && (
                  <input
                    type="text"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    placeholder="Node Name"
                  />
                )}
                <div className="modal__actions">
                  <button onClick={closeModal}>Cancel</button>
                  {modal.type === 'create' && (
                    <button onClick={() => handleCreateNode(modal.nodeId)}>
                      Save
                    </button>
                  )}
                  {modal.type === 'edit' && (
                    <button onClick={() => handleEditNode(modal.nodeId)}>
                      Save
                    </button>
                  )}
                  {modal.type === 'delete' && (
                    <button onClick={() => handleDeleteNode(modal.nodeId)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
