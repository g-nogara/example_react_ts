import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import refreshAuth from '../helpers/refreshAuth'

export default () => {
  const userName = sessionStorage.getItem('name') || '-';

  if (!sessionStorage.getItem('createdAt')) {
    return <Redirect to="/" />
  }
  setInterval(() => refreshAuth(), 60 * 1000 * 5)

  
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand >{decodeURIComponent(escape(userName))}</Navbar.Brand>
      <Nav.Link href="/paises/lista">Paises</Nav.Link>
    </Navbar>
  );
}