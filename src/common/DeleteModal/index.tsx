import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteModalI {
  isOpen: boolean;
  onCloseModal: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalI> = ({ isOpen, onCloseModal, onDelete }) => {
  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant='danger' onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
