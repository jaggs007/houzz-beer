import { useEffect, useState } from "react";
import { Container, FormControl, Nav, Row } from "react-bootstrap";
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
import { useDebounce } from "hooks/useDebounce";

const Beers = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedValue = useDebounce(searchTerm, 500);

  const dispatch = useDispatch();

  const beersFetched = useSelector((state: RootState) => state.beers.data);
  const loading = useSelector((state: RootState) => state.beers.loading);
  const error = useSelector((state: RootState) => state.beers.error);

  useEffect(() => {
    if (activePage) {
      const queryParams = {
        page: activePage,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
        ...(searchTerm && { searchTerm }),
      };
      dispatch(
        // @ts-ignore
        fetchBeers(queryParams),
      );
    }
  }, [dispatch, activePage, debouncedValue]);

  const onLoadMore = () => {
    const newActivePage = activePage + 1;
    setActivePage(newActivePage);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActivePage(1);
    setSearchTerm(event.target.value);
  };

  const hideLoadMore = beersFetched.length < activePage * DEFAULT_ITEMS_PER_PAGE;

  return (
    <Container className='mb-5'>
      <Row>
        {" "}
        <FormControl
          type='text'
          placeholder='Search by beer name'
          className='mr-2 my-5 py-3'
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Row>

      <RenderIfTrue condition={(!!error || beersFetched.length === 0) && !loading}>
        <EmptyContainer header='Oops!'>
          <RenderIfTrue condition={!!error}>
            <p>{error}</p>
          </RenderIfTrue>
          <RenderIfTrue condition={beersFetched.length === 0}>
            <p>Nothing to display yet.</p>
          </RenderIfTrue>
        </EmptyContainer>
      </RenderIfTrue>

      <RenderIfTrue condition={beersFetched?.length === 0 && loading}>
        <div className='d-flex align-items-center' style={{ flexDirection: "column" }}>
          <Spinner as='span' animation='border' role='status' aria-hidden='true' />
          <span className='ml-2'>Loading...</span>
        </div>
      </RenderIfTrue>

      <RenderIfTrue condition={beersFetched.length > 0}>
        <Row>
          {beersFetched?.map((beer: BeerResponseT) => {
            const { id } = beer;
            return <BeerItemCard beer={beer} key={id} />;
          })}
        </Row>
        <RenderIfTrue condition={loading}>
          <Spinner animation='border' role='status' as='span' aria-hidden='true'></Spinner>
        </RenderIfTrue>
        <RenderIfTrue condition={!loading && !hideLoadMore}>
          <Nav.Link onClick={onLoadMore} eventKey='load-more' className='link-primary fw-bold'>
            Load More <BsChevronDown size={20} color='blue' />
          </Nav.Link>
        </RenderIfTrue>
      </RenderIfTrue>
    </Container>
  );
};

export default Beers;
