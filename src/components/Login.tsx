import React, { useState, SyntheticEvent } from 'react';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = (): Boolean => !!(user && password);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'text/plain; charset=utf-8');
    const login = await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/usuario/autenticar?login=${user}&senha=${password}`
     ,{ method: 'POST', headers })
      .then(res => res.json())
      .then(data => data);

    if (!login.autenticado) {
      alert('Falha ao autenticar!')
      return;
    }
    
    sessionStorage.setItem('token', login.token);
    sessionStorage.setItem('createdAt', new Date().toISOString());
    sessionStorage.setItem('name', login.nome);
    sessionStorage.setItem('adm', String(login.administrador))
    window.location.replace(`${window.location.href}menu`)
  }
  return (
    <Card >
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group controlId="user">
              <Form.Label>User</Form.Label>
              <Col>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Informe o usuário"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Col>
                <Form.Control
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Informe a senha"
                />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Button block disabled={!validateForm()} type="submit" variant="primary">
              Login
        </Button>
          </Row>
        </Form>
      </Container>
    </Card>
  )
}