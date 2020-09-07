import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default () => {
  const [listCountries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://localhost:8090/pais/listar?token=${sessionStorage.getItem("token")}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
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
        </tr>
      </thead>
      <tbody>
        {listCountries.map((country: { nome: string, sigla: string, gentilico: string }) => <tr>
          <td>{country.nome}</td>
          <td>{country.sigla.length === 2 ? country.sigla : '-'}</td>
          <td>{country.gentilico}</td>
        </tr>)}
      </tbody>
    </Table>
  )
}