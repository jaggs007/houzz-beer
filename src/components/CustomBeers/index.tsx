import { Col, Container, Row } from "react-bootstrap";
import CustomBeerModal from "../AddBeerModal";
import { useModal } from "../../hooks";
// import { CustomBeerItemCard } from "./CustomBeerItem";
import { useSelector } from "react-redux";
import { CustomBeerT } from "../../types";
import { BeerItemCard } from "../BeerItemCard";

const CustomBeers = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const customBeers = useSelector((state: any) => {
    return state.customBeers.customBeers;
  });

  return (
    <Container className="d-flex flex-column">
      <CustomBeerModal isOpen={isOpen} onCloseModal={onCloseModal} />
      {!customBeers || customBeers.length === 0 ? (
        <EmptyContainer onOpenModal={onOpenModal} />
      ) : (
        <Container>
          <Row>
            {customBeers.map((beer: CustomBeerT) => (
              // <CustomBeerItemCard beer={beer} key={beer.name} />
              <BeerItemCard beer={beer} key={beer.name} />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CustomBeers;

const EmptyContainer = ({ onOpenModal }: any) => {
  return (
    <Container>
      <Row>
        <Col xs={12}>Nothing to see yet</Col>
        <Col xs={12}>
          <Row className="justify-content-center">
            <Col>
              <p className="text-center">
                <a
                  className="link-primary"
                  onClick={onOpenModal}
                  href="#"
                  role="button"
                >
                  Click here
                </a>{" "}
                to add your first beer
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
