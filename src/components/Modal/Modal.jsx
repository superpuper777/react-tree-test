import React from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  type,
  nodeName,
  onClose,
  onChange,
  onSave,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="darkBG" onClick={onClose}>
      <div className="centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal">
          <div className="modal__content">
            <h2>
              {type === 'create'
                ? 'Add Node'
                : type === 'edit'
                ? 'Edit Node'
                : 'Delete Node'}
            </h2>
            {type !== 'delete' && (
              <input
                type="text"
                value={nodeName}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Node Name"
              />
            )}
            {type === 'delete' && (
              <p>Are you sure you want to delete this node?</p>
            )}
            <div className="modal__actions">
              <button onClick={onClose}>Cancel</button>
              {type === 'create' && <button onClick={onSave}>Save</button>}
              {type === 'edit' && <button onClick={onSave}>Save</button>}
              {type === 'delete' && <button onClick={onDelete}>Delete</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
