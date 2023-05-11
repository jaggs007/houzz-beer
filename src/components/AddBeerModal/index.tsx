import React, { useState } from 'react';
import { Modal, Button, Form, Image } from 'react-bootstrap';
import DefaultImage from 'static/houzz-beer.png';
import { BeerErrorT, CustomBeerT } from 'types';
import { useDispatch } from 'react-redux';
import { addCustomBeer } from 'store/customBeersSlice';

interface AddBeerModalI {
  isOpen: boolean;
  onCloseModal: () => void;
}
const AddBeerModal: React.FC<AddBeerModalI> = ({ isOpen, onCloseModal }) => {
  const [beer, setBeer] = useState<CustomBeerT>({
    name: '',
    genre: '',
    description: '',
  });

  const [errors, setErrors] = useState<BeerErrorT>({
    name: '',
    genre: '',
    description: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newErrors = { ...errors };
    let formIsValid = true;
    const { name, genre, description } = beer;

    if (!name) {
      newErrors.name = 'Beer name is required';
      formIsValid = false;
    }

    if (!genre) {
      newErrors.genre = 'Genre is required';
      formIsValid = false;
    }

    if (!description) {
      newErrors.description = 'Description is required';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(
        addCustomBeer({
          name,
          genre,
          description,
        })
      );
      setBeer({
        name: '',
        genre: '',
        description: '',
      });
      onCloseModal();
    }
  };

  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Beer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Image
            className="border border-1 mb-3 p-1"
            style={{
              width: '90px',
              height: '120px',
            }}
            src={DefaultImage}
          />

          <BeerFormItem
            label="Name"
            value={beer.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: CustomBeerT) => {
                return {
                  ...prevValue,
                  name: e.target.value,
                };
              });
            }}
            fieldErrors={errors.name}
            placeholder="Name"
          />

          <BeerFormItem
            label="Genre"
            value={beer.genre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: CustomBeerT) => {
                return {
                  ...prevValue,
                  genre: e.target.value,
                };
              });
            }}
            fieldErrors={errors.name}
            placeholder="Genre"
          />

          <BeerFormItem
            label="Description"
            value={beer.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: CustomBeerT) => {
                return {
                  ...prevValue,
                  description: e.target.value,
                };
              });
            }}
            fieldErrors={errors.name}
            placeholder="Description"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Beer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBeerModal;

interface BeerFormItemI {
  label: string;
  placeholder: string;
  value: string;
  fieldErrors: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const BeerFormItem: React.FC<BeerFormItemI> = ({
  label,
  placeholder,
  onChange,
  value,
  fieldErrors,
}) => {
  return (
    <Form.Group className="mb-3" controlId="genre">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {fieldErrors && (
        <Form.Text className="text-danger">{fieldErrors}</Form.Text>
      )}
    </Form.Group>
  );
};
