import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { Container, Content, Head, Table, Button } from '~/styles/global';
import history from '~/services/history';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students');
      setStudents(data);
    }

    loadStudents();
  }, [students]);

  function handleRegister() {
    history.push('/students/register');
  }

  async function handleDeleteStudent(id) {
    await api.delete(`students/${id}`);
  }

  async function handleModifyStudent(id) {
    history.push(`students/${id}`);
  }

  return (
    <Container>
      <Content>
        <Head>
          <h2>Gerenciando alunos</h2>
          <div>
            <Button type="button" onClick={handleRegister} color="#ee4d64">
              CADASTRAR
            </Button>
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
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleModifyStudent(student.id)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      apagar
                    </button>
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
