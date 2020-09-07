import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import ModalEditCountry from './ModalEditCountry';
import { Country } from '../types'

export default () => {
  const [listCountries, setCountries] = useState([]);
  const [modalCountry, setModalContry] = useState({} as Country);
  const [show, setShow] = useState(false);
  const handleShow = (country: Country) => {
    setModalContry(country);
    setShow(true);
  };
  
  const isAdm = sessionStorage.getItem('adm') === 'true';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/pais/listar?token=${sessionStorage.getItem("token")}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
          data.map((country: Country) => {
            if (!country.nome) country.nome = '-'
            else country.nome = decodeURIComponent(escape(country.nome))
            if (!country.sigla || country.sigla.length !== 2) country.sigla = '-'
            if (!country.gentilico) country.gentilico = '-'
            else country.gentilico = decodeURIComponent(escape(country.gentilico))
            return country;
          })
          setCountries(data);
        })
    }
    fetchData();
  }, []);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>
            Pais
            </th>
          <th>
            Sigla
            </th>
          <th>
            Gentílico
            </th>
            <th hidden={!isAdm}>
              Opções
            </th>
        </tr>
      </thead>
      <tbody>
        {
          listCountries.map((country: Country) => <tr key={country.id}>
            <td>{country.nome}</td>
            <td>{country.sigla}</td>
            <td>{country.gentilico}</td>
            <td hidden={!isAdm} data-rowid={country.id}>
              <Button variant="primary" onClick={() => handleShow(country)}>
                Editar
              </Button>
              <ModalEditCountry 
              show={show} 
              setShow={setShow} 
              countryState={modalCountry} 
              setCountryState={setCountries}
              countriesList={listCountries} />
          </td>
          </tr>)
        }
      </tbody>
    </Table>
  )
}