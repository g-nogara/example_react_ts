import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import refreshAuth from '../helpers/refreshAuth'

import { Country } from '../types'
type Data = {
  show: boolean,
  setShow: Function
  countriesList: Array<Country>
  setCountries: Function
}
export default ({ show, setShow, countriesList, setCountries }: Data) => {
  const [countryName, setCountryName] = useState('');
  const [initials, setInitials] = useState('');
  const [demonym, setDemonym] = useState('');
  const handleClose = () => setShow(false);
  const handleSave = () => {
    const newCountry = {
      id: countriesList.length + 1,
      nome: countryName,
      sigla: initials,
      gentilico: demonym,
    }
    const strBody = JSON.stringify(newCountry);

    const header = new Headers();
    header.append('Content-Type', 'application/json; charset=utf-8');
    (async () => {
      await refreshAuth();
      await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pais/salvar?token=${sessionStorage.getItem('token')}`, {
        method: 'POST',
        body: strBody,
        headers: header,
      })
        .then(data => {
          if (data.ok && data.status === 200) {
            if (newCountry.nome === countryName) {
              countriesList.push(newCountry)
              setCountries(countriesList);
            }
            alert('Salvo com sucesso')
          }
          else alert(`Falha ao salvar: ${data.status}`)

        });
    })();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar País</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>País</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Nome do país"
            onChange={(e) => setCountryName(e.target.value)}
          />
          <br />
          <Form.Label>Sigla</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sigla"
            onChange={(e) => setInitials(e.target.value)}
          />
          <br />
          <Form.Label>Gentílico</Form.Label>
          <Form.Control
            type="text"
            placeholder="Aqueles que nasceram no país"
            onChange={(e) => setDemonym(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Saltar alterações
    </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
    </Button>
      </Modal.Footer>
    </Modal>
  )
}