import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useModal } from "hooks";
import AddBeerModal from "components/AddBeerModal";

const Header = (): JSX.Element => {
  const location = useLocation();
  const { isOpen, onCloseModal, onOpenModal } = useModal();

  const isCustomPage = location.pathname.includes("custom-beers");
  return (
    <>
      <Navbar variant='light' className='hb-Navbar my-3' expand='lg'>
        <Container>
          <AddBeerModal isOpen={isOpen} onCloseModal={onCloseModal} />
          <Navbar.Brand as='div' className='fw-bold text-info'>
            Houzz Beers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto mb-2 mb-lg-0'>
              <NavLink to='/all-beers' className='nav-link'>
                All Beers
              </NavLink>
              <NavLink to='/custom-beers' className='nav-link'>
                My Beers
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
        {isCustomPage && (
          <Button
            onClick={onOpenModal}
            className='justify-content-center mx-auto'
            style={{ minWidth: "150px" }}
          >
            Add a new beer
          </Button>
        )}
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
