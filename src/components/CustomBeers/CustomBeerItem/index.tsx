import { Card, Col, Image, Row } from "react-bootstrap";
import HouzBeer from "../../../static/houzz-beer.png";
import "./index.css";

export const CustomBeerItemCard = ({ beer }: any) => {
  const { description, name, genre } = beer;
  const responsiveProps = {
    xs: 12,
    md: 12,
    sm: 12,
  };

  return (
    <>
      <Card body>
        <Row>
          <Col xs={12} md={2} sm={2}>
            <Image className="border border-0" thumbnail src={HouzBeer} />
          </Col>
          <Col xs={11} md={10} sm={10} className="align-items-center d-flex">
            <Row className="text-start">
              <Col className="fs-3 fw-bold" {...responsiveProps}>
                {name}
              </Col>
              <Col
                className="hb-CustomBeerItem-genre fs-5 fw-bold mt-2"
                {...responsiveProps}
              >
                {genre}
              </Col>
              <Col className="mt-2 fs-6" {...responsiveProps}>
                {description}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};
