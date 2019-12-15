import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Head, Table, Button, Center, Content } from '../../styles/global';
import history from '../../services/history';
export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students', {
        params: {
          name,
        },
      });
      setLoading(false);
      setStudents(data);
    }

    loadStudents();
  }, [name]);

  function handleRegister() {
    history.push('/students/register');
  }
  async function handleDeleteStudent(id) {
    try {
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        const { data } = await api.delete(`students/${id}`);
        setStudents(data);
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  async function handleModifyStudent(id) {
    history.push(`students/${id}`);
  }

  return (
    <Content width="1200px">
      <Head>
        <h2>Gerenciando alunos</h2>
        <div>
          <Button type="button" onClick={handleRegister} color="#ee4d64">
            CADASTRAR
          </Button>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Buscar aluno"
          />
        </div>
      </Head>
      <Table>
        {loading ? (
          <Center>
            <h1>Carregando...</h1>
          </Center>
        ) : (
          <>
            {students.length > 0 ? (
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
            ) : (
              <Center>
                <h1>Não há alunos ? Cadastre C:</h1>
              </Center>
            )}
          </>
        )}
      </Table>
    </Content>
  );
}
