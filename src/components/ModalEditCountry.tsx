import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import { Country } from '../types'
import refreshAuth from '../helpers/refreshAuth';

type Data = {
  show: boolean,
  setShow: Function
  countryState: Country
  setCountryState: Function
  countriesList: Array<Country>
};
export default ({ show, setShow, countryState, setCountryState, countriesList }: Data) => {
  const [countryName, setCountryName] = useState('');
  const [initials, setInitials] = useState('');
  const [demonym, setDemonym] = useState('');
  const handleClose = () => setShow(false);
  const handleSave = () => {
    const newCountry = {
        id: countryState.id,
        nome: countryName || countryState.nome,
        sigla: initials || countryState.sigla,
        gentilico: demonym || countryState.gentilico,
      }
    const strBody = JSON.stringify(newCountry);

    console.log(newCountry);
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
        console.log(`data`, data);
        if (data.ok && data.status === 200) {
          alert('Salvo com sucesso')
          setCountryState(countriesList.map(country => country.id === newCountry.id ? newCountry : country));
        }
        else alert(`Falha ao salvar: ${data.status}`)
        
      });
    })();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar país</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>País</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Nome do país"
            defaultValue={countryState.nome}
            onChange={(e) => setCountryName(e.target.value)}
          />
          <br />
          <Form.Label>Sigla</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sigla"
            defaultValue={countryState.sigla}
            onChange={(e) => setInitials(e.target.value)}
          />
          <br />
          <Form.Label>Gentílico</Form.Label>
          <Form.Control
            type="text"
            placeholder="Aqueles que nasceram no país"
            defaultValue={countryState.gentilico}
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
        <Button variant="danger" onClick={handleClose}>
          Excluir
    </Button>
      </Modal.Footer>
    </Modal>
  )
}