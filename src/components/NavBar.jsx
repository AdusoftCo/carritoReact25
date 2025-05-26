import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carritoIcon from '../assets/icons8-carrito-de-compras-48.png';
import newIcon from '../assets/favicon-32x32.png';

const Navegacion = () => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={newIcon} 
            alt="Icono del Comercio" 
            style={{ width: '48px', height: '48px', marginLeft: '8px' }} 
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" />
        
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
          <Nav.Link as={Link} to="/seguroksi">InFaltables</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          <Nav.Link as={Link} to="/admin">Admin</Nav.Link>

          <Nav.Link as={Link} to="/carrito" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={carritoIcon} alt="Carrito" style={{ width: '32px', height: '32px', marginRight: '8px' }} />
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default Navegacion;