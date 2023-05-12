import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import DefaultImage from "static/houzz-beer.png";
import { BaseBeerT } from "types";
import { useDispatch } from "react-redux";
import { addCustomBeer } from "store/customBeersSlice";
import BeerFormItem from "components/AddBeerModal/BeerFormItem";

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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newErrors = { ...errors };
    let formIsValid = true;
    const { name, genre, description } = beer;

    if (!name) {
      newErrors.name = "Beer name is required";
      formIsValid = false;
    }

    if (!genre) {
      newErrors.genre = "Genre is required";
      formIsValid = false;
    }

    if (!description) {
      newErrors.description = "Description is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(
        addCustomBeer({
          name,
          genre,
          description,
        }),
      );
      setBeer({
        name: "",
        genre: "",
        description: "",
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
            className='border border-1 mb-3 p-1'
            style={{
              width: "90px",
              height: "120px",
            }}
            src={DefaultImage}
          />

          <BeerFormItem
            label='Name'
            value={beer.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: BaseBeerT) => {
                return {
                  ...prevValue,
                  name: e.target.value,
                };
              });
            }}
            fieldErrors={errors.name}
            placeholder='Name'
          />

          <BeerFormItem
            label='Genre'
            value={beer?.genre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: BaseBeerT) => {
                return {
                  ...prevValue,
                  genre: e.target.value,
                };
              });
            }}
            fieldErrors={errors.name}
            placeholder='Genre'
          />

          <BeerFormItem
            label='Description'
            value={beer.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBeer((prevValue: BaseBeerT) => {
                return {
                  ...prevValue,
                  description: e.target.value,
                };
              });
            }}
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
