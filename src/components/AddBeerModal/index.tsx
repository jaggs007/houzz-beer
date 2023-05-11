import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import DefaultImage from "../../static/houzz-beer.png";
import { BeerErrorT } from "../../types";
import { useDispatch } from "react-redux";
import { addCustomBeer } from "../../store/customBeersSlice";

interface AddBeerModalI {
  isOpen: boolean;
  onCloseModal: () => void;
}
const AddBeerModal: React.FC<AddBeerModalI> = ({ isOpen, onCloseModal }) => {
  const [beerName, setBeerName] = useState<string>("");
  const [beerGenre, setBeerGenre] = useState<string>("");
  const [beerDescription, setBeerDescription] = useState<string>("");
  const [errors, setErrors] = useState<BeerErrorT>({
    beerName: "",
    beerGenre: "",
    beerDescription: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newErrors = { ...errors };
    let formIsValid = true;

    if (!beerName) {
      newErrors.beerName = "Beer name is required";
      formIsValid = false;
    }

    if (!beerGenre) {
      newErrors.beerGenre = "Genre is required";
      formIsValid = false;
    }

    if (!beerDescription) {
      newErrors.beerDescription = "Description is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      dispatch(
        addCustomBeer({
          name: beerName,
          genre: beerGenre,
          description: beerDescription,
        })
      );

      setBeerGenre("");
      setBeerDescription("");
      setBeerName("");
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
              width: "90px",
              height: "120px",
            }}
            src={DefaultImage}
          ></Image>
          <Form.Group className="mb-3" controlId="beerName">
            <Form.Label>Beer Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter beer name"
              value={beerName}
              onChange={(e) => setBeerName(e.target.value)}
              required
            />{" "}
            {errors.beerName && (
              <Form.Text className="text-danger">{errors.beerName}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="beerGenre">
            <Form.Label>Beer Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter beer genre"
              value={beerGenre}
              onChange={(e) => setBeerGenre(e.target.value)}
              required
            />
            {errors.beerGenre && (
              <Form.Text className="text-danger">{errors.beerGenre}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="beerDescription">
            <Form.Label>Beer Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter beer description"
              value={beerDescription}
              onChange={(e) => setBeerDescription(e.target.value)}
              required
            />{" "}
            {errors.beerDescription && (
              <Form.Text className="text-danger">
                {errors.beerDescription}
              </Form.Text>
            )}
          </Form.Group>
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
