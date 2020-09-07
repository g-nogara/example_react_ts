import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default () => {
  const TTLAuth = 5 * 60 * 1000; // 5 Minutes in milliseconds
  if (!sessionStorage.getItem('createdAt')) {
    return <Redirect to="/" />
  }
  const authAge = sessionStorage.getItem('createdAt');
  if (typeof authAge !== 'string') {
    sessionStorage.clear();
    return <Redirect to="/" />
  }
  const dateAuth = new Date(authAge);
  const timeSinceAuth = Math.abs(dateAuth.getTime() - Date.now());
  if (timeSinceAuth > TTLAuth) {
    fetch(`http://localhost:8090/usuario/renovar-ticket?token=${sessionStorage.getItem('token')}`)
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand >{sessionStorage.getItem('name')}</Navbar.Brand>
      <Nav.Link href="/paises/lista">Paises</Nav.Link>
    </Navbar>
  );
}