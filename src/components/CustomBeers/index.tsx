import { Container, Row } from "react-bootstrap";
import CustomBeerModal from "components/AddBeerModal";
import { useModal } from "hooks";
import { useSelector } from "react-redux";
import { BaseBeerT } from "types";
import { BeerItemCard } from "components/BeerItemCard";
import { RootState } from "store";
import EmptyContainer from "common/EmptyContainer";

const CustomBeers = () => {
  const { isOpen, onOpenModal, onCloseModal } = useModal();

  const customBeers = useSelector((state: RootState) => {
    return state.customBeers.customBeers;
  });

  return (
    <Container className='d-flex flex-column'>
      <CustomBeerModal isOpen={isOpen} onCloseModal={onCloseModal} />
      {customBeers?.length === 0 ? (
        <EmptyContainer header='Nothing to see yet.'>
          <p className='text-center'>
            <span className='link-primary pe-2' onClick={onOpenModal} role='button'>
              Click here
            </span>
            to add your first beer
          </p>
        </EmptyContainer>
      ) : (
        <Container>
          <Row>
            {customBeers?.map((beer: BaseBeerT) => (
              <BeerItemCard beer={beer} key={beer.name} />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CustomBeers;
