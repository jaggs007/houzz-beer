import React from "react";
import {
  Modal,
  Button,
  Image,
  Row,
  OverlayTrigger,
  Col,
  Tooltip,
} from "react-bootstrap";
import { BeerResponseT, CustomBeerT } from "../../types";

interface BeerDetailModalI {
  beer: BeerResponseT | CustomBeerT;
  isOpen: boolean;
  onCloseModal: () => void;
  onClick: () => void;
}
const BeerDetailModal: React.FC<BeerDetailModalI> = ({
  beer,
  isOpen,
  onCloseModal,
}) => {
  //@ts-ignore
  const { name, description, image_url, tagline, genre } = beer;

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {tagline}
    </Tooltip>
  );

  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Beer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5">
        <Row>
          <Col xs={12} className="text-center">
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <Image
                className="hb-BeerItemCard-image border border-0"
                thumbnail
                src={image_url}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={12}>
            <Row className="text-start">
              <Col className="fs-3 fw-bold" xs={12}>
                {name}
              </Col>
              <Col
                className="hb-BeerItemCard-tagline fs-5 fw-bold mt-2"
                xs={12}
              >
                {tagline}
              </Col>
              <Col className="mt-2 fs-6" xs={12}>
                {description}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BeerDetailModal;