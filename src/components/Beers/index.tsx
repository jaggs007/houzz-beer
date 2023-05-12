import { useEffect, useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import { BeerItemCard } from "components/BeerItemCard";
import Spinner from "react-bootstrap/Spinner";
import { fetchBeers } from "store/beersSlice";
import { useSelector, useDispatch } from "react-redux";
import { DEFAULT_ITEMS_PER_PAGE } from "constant";
import { BsChevronDown } from "react-icons/bs";
import { BeerResponseT } from "types";
import { RootState } from "store";
import EmptyContainer from "common/EmptyContainer";
import { RenderIfTrue } from "common/RenderIfTrue";

const Beers = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activePage)
      dispatch(
        // @ts-ignore
        fetchBeers({ page: activePage, itemsPerPage: DEFAULT_ITEMS_PER_PAGE }),
      );
  }, [dispatch, activePage]);

  const beersFetched = useSelector((state: RootState) => state.beers.data);
  const loading = useSelector((state: RootState) => state.beers.loading);
  const error = useSelector((state: RootState) => state.beers.error);

  const onLoadMore = () => {
    const newActivePage = activePage + 1;
    setActivePage(newActivePage);
  };

  if ((error || beersFetched.length === 0) && !loading)
    return (
      <EmptyContainer header='Oops!'>
        <RenderIfTrue condition={!!error}>
          <p>{error}</p>
        </RenderIfTrue>
        <RenderIfTrue condition={beersFetched.length === 0}>
          <p>Nothing to display yet.</p>
        </RenderIfTrue>
      </EmptyContainer>
    );

  if (beersFetched?.length === 0 && loading)
    return (
      <div className='d-flex align-items-center' style={{ flexDirection: "column" }}>
        <Spinner as='span' animation='border' role='status' aria-hidden='true' />
        <span className='ml-2'>Loading...</span>
      </div>
    );

  return (
    <Container className='mb-5'>
      <Row>
        {beersFetched?.map((beer: BeerResponseT) => {
          const { id } = beer;
          return <BeerItemCard beer={beer} key={id} />;
        })}
      </Row>
      <RenderIfTrue condition={beersFetched.length > 0 && loading}>
        <Spinner animation='border' role='status' as='span' aria-hidden='true'></Spinner>
      </RenderIfTrue>
      <RenderIfTrue condition={!loading}>
        <Nav.Link onClick={onLoadMore} eventKey='load-more' className='link-primary fw-bold'>
          Load More <BsChevronDown size={20} color='blue' />
        </Nav.Link>
      </RenderIfTrue>
    </Container>
  );
};

export default Beers;
