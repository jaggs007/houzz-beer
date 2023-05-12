import { Button, Card, Col, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useModal } from "hooks";
import BeerDetailModal from "../BeerDetailModal";
import { BeerResponseT, BaseBeerT, RenderTooltipProps } from "types";
import DefaultImage from "static/houzz-beer.png";
import { getSubString } from "utils";
import DeleteModal from "common/DeleteModal";
import { RiDeleteBin6Line } from "react-icons/ri";

interface BeerItemCardI {
  beer: BeerResponseT | BaseBeerT;
  onDelete?: (beer: BaseBeerT) => void;
}
export const BeerItemCard: React.FC<BeerItemCardI> = ({ beer, onDelete }) => {
  // @ts-ignore
  const { image_url: imageUrl, description, name, tagline, genre } = beer;
  const { isOpen, onCloseModal, onOpenModal } = useModal();
  const { isOpen: showDelete, onOpenModal: onDeleteOpen, onCloseModal: onCloseDelete } = useModal();

  const renderTooltip = (props: RenderTooltipProps) => (
    <Tooltip id='button-tooltip' {...props}>
      {tagline || genre}
    </Tooltip>
  );

  const responsiveProps = {
    xs: 12,
    md: 12,
    sm: 12,
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onDeleteOpen();
  };

  return (
    <Col sm={12} md={12} xs={12} lg={6}>
      <BeerDetailModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        beer={beer}
        onClick={onOpenModal}
      />
      <DeleteModal
        isOpen={showDelete}
        onCloseModal={onCloseDelete}
        onDelete={() => onDelete && onDelete(beer)}
      />

      <Card body className='hb-BeerItemCard mb-3' role='button' onClick={onOpenModal}>
        <Row>
          <Col xs={12} md={2} sm={12} lg={4}>
            <OverlayTrigger placement='top' overlay={renderTooltip}>
              <Image
                className='hb-BeerItemCard-image border border-0'
                thumbnail
                src={imageUrl || DefaultImage}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={11} md={10} sm={10} lg={8}>
            <Row className='text-start'>
              <Col className='fs-3 fw-bold' {...responsiveProps}>
                {name}
              </Col>
              <Col className='hb-BeerItemCard-tagline fs-4 fw-bold mt-2' {...responsiveProps}>
                {tagline || genre}
              </Col>
              <Col className='mt-2 fs-6' {...responsiveProps}>
                {getSubString(description, 100)}
              </Col>
            </Row>
          </Col>
          {onDelete && (
            <Col>
              <Button variant='danger' onClick={handleDeleteClick}>
                Delete <RiDeleteBin6Line />
              </Button>
            </Col>
          )}
        </Row>
      </Card>
    </Col>
  );
};
