import React from 'react';
import './TreeView.css';

const TreeNode = ({
  node,
  expandedNodes,
  toggleNode,
  openModal,
  deleteNode,
}) => {
  return (
    <div key={node.id} className="tree-node">
      <div className="node-header">
        <div className="node-info">
          <span className="node-name" onClick={() => toggleNode(node.id)}>
            {node.name}
          </span>
          {node.children?.length > 0 && (
            <button onClick={() => toggleNode(node.id)} className="toggle-btn">
              {expandedNodes[node.id] ? '▼' : '▶'}
            </button>
          )}
        </div>

        <div className="node-actions">
          <button onClick={() => openModal('create', node.id)}>➕</button>
          <button onClick={() => openModal('edit', node.id)}>✏️</button>
          <button onClick={() => deleteNode(node.id)}>🗑️</button>
        </div>
      </div>

      {expandedNodes[node.id] && node.children?.length > 0 && (
        <div className="tree-children">
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
              openModal={openModal}
              deleteNode={deleteNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({
  treeData,
  expandedNodes,
  toggleNode,
  openModal,
  deleteNode,
}) => {
  return (
    <div className="tree-container">
      {treeData ? (
        <TreeNode
          node={treeData}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
          openModal={openModal}
          deleteNode={deleteNode}
        />
      ) : (
        <p>Tree is empty</p>
      )}
    </div>
  );
};

export default TreeView;
