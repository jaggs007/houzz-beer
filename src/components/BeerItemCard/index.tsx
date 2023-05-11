import {
  Card,
  Col,
  Image,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import "./index.css";
import { useModal } from "../../hooks";
import BeerDetailModal from "../BeerDetailModal";
import { BeerResponseT, CustomBeerT } from "../../types";
import DefaultImage from "../../static/houzz-beer.png";

interface BeerItemCardI {
  beer: BeerResponseT | CustomBeerT;
}
export const BeerItemCard: React.FC<BeerItemCardI> = ({ beer }) => {
  //@ts-ignore
  const { image_url, description, name, tagline, genre } = beer;
  const { isOpen, onCloseModal, onOpenModal } = useModal();

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {tagline || genre}
    </Tooltip>
  );

  function getSubString(text: string, count: number) {
    return text.slice(0, count) + (text.length > count ? "..." : "");
  }

  const responsiveProps = {
    xs: 12,
    md: 12,
    sm: 12,
  };

  return (
    <Col sm={12} md={12} xs={12} lg={6}>
      <BeerDetailModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        beer={beer}
        onClick={onOpenModal}
      />

      <Card
        body
        className="hb-BeerItemCard mb-3"
        role="button"
        onClick={onOpenModal}
      >
        <Row>
          <Col xs={12} md={2} sm={12} lg={4}>
            <OverlayTrigger placement="top" overlay={renderTooltip}>
              <Image
                className="hb-BeerItemCard-image border border-0"
                thumbnail
                src={image_url || DefaultImage}
              />
            </OverlayTrigger>
          </Col>
          <Col xs={11} md={10} sm={10} lg={8}>
            <Row className="text-start">
              <Col className="fs-3 fw-bold" {...responsiveProps}>
                {name}
              </Col>
              <Col
                className="hb-BeerItemCard-tagline fs-5 fw-bold mt-2"
                {...responsiveProps}
              >
                {tagline || genre}
              </Col>
              <Col className="mt-2 fs-6" {...responsiveProps}>
                {getSubString(description, 100)}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
