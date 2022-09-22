import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../../redux/userRedux';

const NavBar = () => {
  const user = useSelector(getUser);
  return (
    <Navbar
      bg="secondary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded"
    >
      <Container>
        <Navbar.Brand href="/">Ads Board</Navbar.Brand>
        <Nav className="me-right">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          {!user && (
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          )}

          {!user && (
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          )}

          {user && (
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
