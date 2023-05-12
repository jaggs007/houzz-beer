import React from "react";
import { Modal, Button, Image, Row, OverlayTrigger, Col, Tooltip } from "react-bootstrap";
import { BeerResponseT, BaseBeerT, RenderTooltipProps } from "types";
import DefaultImage from "static/houzz-beer.png";

interface BeerDetailModalI {
  beer: BeerResponseT | BaseBeerT;
  isOpen: boolean;
  onCloseModal: () => void;
  onClick: () => void;
}

const BeerDetailModal: React.FC<BeerDetailModalI> = ({ beer, isOpen, onCloseModal }) => {
  // @ts-ignore
  const { name, description, image_url: imageUrl, tagline, genre } = beer;

  const renderTooltip = (props: RenderTooltipProps) => (
    <Tooltip id='button-tooltip' {...props}>
      {tagline || genre}
    </Tooltip>
  );

  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Beer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-5'>
        <Row>
          <Col xs={12} className='text-center'>
            <OverlayTrigger placement='top' overlay={renderTooltip}>
              <Image
                className='hb-BeerItemCard-image border border-0'
                thumbnail
                src={imageUrl || DefaultImage}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={12}>
            <Row className='text-start'>
              <Col className='fs-3 fw-bold' xs={12}>
                {name}
              </Col>
              <Col className='hb-BeerItemCard-tagline fs-5 fw-bold mt-2' xs={12}>
                {tagline}
              </Col>
              <Col className='mt-2 fs-6' xs={12}>
                {description}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BeerDetailModal;
