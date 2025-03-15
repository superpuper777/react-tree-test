import React, { useState, useEffect } from 'react';
// import { initializeApi } from 'fx-react';
import { v4 as uuidv4 } from 'uuid';
// import api from './api';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState(null);
  const [treeName, setTreeName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const response = await fetch(
        `https://test.vmarmysh.com/api.user.tree.get?treeName=${savedTreeName}`
      );
      // const response = await api.user.tree.get('treeAl');
      const data = await response.json();
      console.log('tree:', data);

      setTreeData(data);
    } catch (error) {
      console.error('Error loading tree:', error);
      setError('Error loading data');
    } finally {
      setLoading(false);
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

  return (
    <div className="app">
      <p>Tree: {treeName}</p>
      <p>{JSON.stringify(treeData, null, 2)}</p>
    </div>
  );
}

export default App;
