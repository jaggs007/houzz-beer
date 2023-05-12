import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import DefaultImage from "static/houzz-beer.png";
import { BaseBeerT } from "types";
import { useDispatch } from "react-redux";
import { addCustomBeer } from "store/customBeersSlice";
import FormItem from "common/FormItem";

interface AddBeerModalI {
  isOpen: boolean;
  onCloseModal: () => void;
}

const AddBeerModal: React.FC<AddBeerModalI> = ({ isOpen, onCloseModal }) => {
  const [beer, setBeer] = useState<BaseBeerT>({
    name: "",
    genre: "",
    description: "",
  });

  const [errors, setErrors] = useState<BaseBeerT>({
    name: "",
    genre: "",
    description: "",
  });

  const dispatch = useDispatch();

  const validateErrors = () => {
    const { name, genre, description } = beer;

    const newErrors = {
      name: name ? "" : "Beer name is required",
      genre: genre ? "" : "Genre is required",
      description: description ? "" : "Description is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formIsValid = validateErrors();

    if (formIsValid) {
      addCustomBeerToStore();
      resetForm();
      onCloseModal();
    }
  };

  const addCustomBeerToStore = () => {
    dispatch(addCustomBeer(beer));
  };

  const resetForm = () => {
    setBeer({
      name: "",
      genre: "",
      description: "",
    });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    setBeer((prevBeer) => ({
      ...prevBeer,
      [field]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New Beer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Image
            className='border border-1 mb-3 p-1'
            style={{
              width: "90px",
              height: "120px",
            }}
            src={DefaultImage}
          />

          <FormItem
            label='Name'
            value={beer.name}
            onChange={(e) => handleFieldChange(e, "name")}
            fieldErrors={errors.name}
            placeholder='Name'
          />

          <FormItem
            label='Genre'
            value={beer?.genre}
            onChange={(e) => handleFieldChange(e, "genre")}
            fieldErrors={errors.name}
            placeholder='Genre'
          />

          <FormItem
            label='Description'
            value={beer.description}
            onChange={(e) => handleFieldChange(e, "description")}
            fieldErrors={errors.name}
            placeholder='Description'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Add Beer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBeerModal;
