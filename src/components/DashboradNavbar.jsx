import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import newIcon from '../assets/favicon-32x32.png';

const DashboardNavbar = ({ userName, onLogout }) => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={newIcon} 
                        alt="Icono del Comercio" 
                        style={{ width: '48px', height: '48px', marginLeft: '8px' }} 
                    />
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <span className="text-white me-3">{userName}</span>
                    <Button variant="outline-light" onClick={onLogout}>
                        Logout
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;
