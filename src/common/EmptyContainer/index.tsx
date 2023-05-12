import { Col, Container, Row } from "react-bootstrap";

interface EmptyContainerI {
  header: string;
  children: React.ReactNode;
}
const EmptyContainer: React.FC<EmptyContainerI> = ({ header, children }) => {
  return (
    <Container className='pt-5 fw-light fs-2'>
      <Row>
        <Col xs={12}>{header}</Col>
        <Col xs={12}>
          <Row className='justify-content-center'>{children}</Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EmptyContainer;
