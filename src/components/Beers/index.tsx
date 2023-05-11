import { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { BeerItemCard } from "components/BeerItemCard";
import Spinner from "react-bootstrap/Spinner";
import { fetchBeers } from "store/beersSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DEFAULT_ITEMS_PER_PAGE } from "constant";
import { BsChevronDown } from "react-icons/bs";

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

  const beersFetched = useSelector((state: any) => state.beers.data);
  const loading = useSelector((state: any) => state.beers.loading);
  const error = useSelector((state: any) => state.beers.error);

  const onLoadMore = () => {
    const newActivePage = activePage + 1;
    setActivePage(newActivePage);
  };

  if (error)
    return (
      <Container>
        <Row>
          <Col xs={12}>Nothing to see yet</Col>
          <Col xs={12}>
            <Row className='justify-content-center'>
              <Col>No data to dislay</Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
        {beersFetched?.map((beer: any) => {
          const { id } = beer;
          return <BeerItemCard beer={beer} key={id} />;
        })}
      </Row>

      {beersFetched.length > 0 && loading ? (
        <Spinner animation='border' role='status' as='span' aria-hidden='true'></Spinner>
      ) : (
        <Nav.Link onClick={onLoadMore} eventKey='load-more' className='link-primary fw-bold'>
          Load More <BsChevronDown size={20} color='blue' />
        </Nav.Link>
      )}
    </Container>
  );
};

export default Beers;
