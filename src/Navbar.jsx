
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() { 
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.clear() 
    // window.location.reload()
    navigate('/login')
  };
  return (
    <Navbar bg="light">
      <Container fluid>
        <Row>
        </Row>
        <Navbar.Brand style={{cursor:"pointer",color:"red"}} onClick={handleLogout}>Logout </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent; 