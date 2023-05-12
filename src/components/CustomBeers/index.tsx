import { Col, Container, Row } from "react-bootstrap";
import CustomBeerModal from "components/AddBeerModal";
import { useModal } from "hooks";
import { useSelector } from "react-redux";
import { BaseBeerT } from "types";
import { BeerItemCard } from "components/BeerItemCard";
import { RootState } from "store";

const CustomBeers = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const customBeers = useSelector((state: RootState) => {
    return state.customBeers.customBeers;
  });

  return (
    <Container className='d-flex flex-column'>
      <CustomBeerModal isOpen={isOpen} onCloseModal={onCloseModal} />
      {!customBeers || customBeers.length === 0 ? (
        <EmptyContainer onOpenModal={onOpenModal} />
      ) : (
        <Container>
          <Row>
            {customBeers.map((beer: BaseBeerT) => (
              <BeerItemCard beer={beer} key={beer.name} />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CustomBeers;

interface EmptyContainerI {
  onOpenModal: () => void;
}
const EmptyContainer: React.FC<EmptyContainerI> = ({ onOpenModal }) => {
  return (
    <Container className='pt-5'>
      <Row>
        <Col xs={12}>Nothing to see yet</Col>
        <Col xs={12}>
          <Row className='justify-content-center'>
            <Col>
              <p className='text-center'>
                <span className='link-primary pe-2 fw-bold' onClick={onOpenModal} role='button'>
                  Click here
                </span>
                to add your first beer
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
