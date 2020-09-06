import React, { useState, SyntheticEvent } from 'react';
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = (): Boolean => !!(user && password);
  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const login = await fetch(`http://localhost:8090/usuario/autenticar?login=${user}&senha=${password}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => data);
    console.log(login)
    if (!login.autenticado) alert('Não autenticado!')
    sessionStorage.setItem('auth', login.token);
    sessionStorage.setItem('TTL', new Date().toISOString());
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
                  type="user"
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