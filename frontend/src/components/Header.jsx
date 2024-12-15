import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">         <button className={`btn btn-primary me-2`}>Home</button>        </Navbar.Brand>
        
      </Container>
    </Navbar>
  );
}

export default Header;