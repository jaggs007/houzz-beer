import { useEffect, useState } from "react";
import { fetchBeers } from "../../apis";
import { Container, Nav, Row } from "react-bootstrap";
import { BeerItemCard } from "../BeerItemCard";
import Spinner from "react-bootstrap/Spinner";

const itemsPerPage = 10;

const Beers = () => {
  const [beers, setBeers] = useState<any>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getBeers = async () => {
    setLoading(true);
    const allBeers = await fetchBeers(activePage, itemsPerPage);
    setTimeout(() => {
      setLoading(false);
      setBeers([...beers, ...allBeers]);
    }, 1000); // to mimic the delay for loader display
  };

  useEffect(() => {
    getBeers();
  }, [activePage]);

  const onLoadMore = () => {
    const newActivePage = activePage + 1;
    setActivePage(newActivePage);
  };

  if ((!beers || beers.length === 0) && loading)
    return (
      <div
        className="d-flex align-items-center"
        style={{ flexDirection: "column" }}
      >
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
        />
        <span className="ml-2">Loading...</span>
      </div>
    );

  return (
    <Container className="mb-5">
      <Row>
        {(beers || []).map((beer: any) => {
          const { id } = beer;
          return <BeerItemCard beer={beer} key={id} />;
        })}
      </Row>

      {beers.length > 0 && loading ? (
        <Spinner
          animation="border"
          role="status"
          as="span"
          aria-hidden="true"
        ></Spinner>
      ) : (
        <Nav.Link
          onClick={onLoadMore}
          eventKey="load-more"
          className="link-primary"
        >
          Load More
        </Nav.Link>
      )}
    </Container>
  );
};

export default Beers;
