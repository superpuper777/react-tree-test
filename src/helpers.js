import { v4 as uuidv4 } from 'uuid';

export const generateTreeName = () => {
  const newTreeName = uuidv4();
  localStorage.setItem('treeName', newTreeName);
  return newTreeName;
};

export const findNodeById = (nodes, id) => {
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
