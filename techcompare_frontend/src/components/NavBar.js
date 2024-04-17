import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Tech Compare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/compare">Compare</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
                <Nav.Link href="/wishlist">Wish List</Nav.Link>
                <Nav.Link href="/signin">Sign in/Sign up</Nav.Link>
            </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;