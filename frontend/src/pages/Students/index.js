import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { Container, Content, Head, Table } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students');
      setStudents(data);
    }

    loadStudents();
  }, [students]);

  return (
    <Container>
      <Content>
        <Head>
          <h2>Gerenciando alunos</h2>
          <div>
            <button type="button">CADASTRAR</button>
            <input type="text" placeholder="Buscar aluno" />
          </div>
        </Head>
        <Table>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <button type="button">editar</button>
                    <button type="button">apagar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Content>
    </Container>
  );
}
