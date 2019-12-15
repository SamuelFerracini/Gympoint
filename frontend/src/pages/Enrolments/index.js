import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Head, Table, Button, Content, Center } from '../../styles/global';
import history from '../../services/history';

export default function Enrolments() {
  const [enrolments, setEnrolments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnrolments() {
      const { data } = await api.get('enrolments');
      setLoading(false);
      setEnrolments(data);
    }

    loadEnrolments();
  }, []);

  function handleRegister() {
    history.push('/enrolments/register');
  }

  async function handleDeleteEnrolment(id) {
    try {
      const { data } = await api.delete(`enrolments/${id}`);
      setEnrolments(data);
    } catch (error) {
      toast.error('Não é possivel deletar uma matrícula ativa');
    }
  }

  async function handleModifyEnrolment(id) {
    history.push(`enrolments/${id}`);
  }

  return (
    <Content width="1380px">
      <Head>
        <h2>Gerenciando matrícula</h2>
        <Button type="button" onClick={handleRegister} color="#ee4d64">
          CADASTRAR
        </Button>
      </Head>
      <Table>
        {loading ? (
          <Center>
            <h1>Carregando...</h1>
          </Center>
        ) : (
          <>
            {enrolments.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                    <th>PLANO</th>
                    <th>INÍCIO</th>
                    <th>TÉRMINO</th>
                    <th>ATIVA</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolments.map(enrolment => (
                    <tr key={enrolment.id}>
                      <td>{enrolment.students.name}</td>
                      <td>{enrolment.plans.title}</td>
                      <td>
                        {format(parseISO(enrolment.start_date), 'dd/MM/yyyy')}
                      </td>
                      <td>
                        {format(parseISO(enrolment.end_date), 'dd/MM/yyyy')}
                      </td>
                      <td>
                        <MdCheckCircle
                          size={20}
                          color={enrolment.active ? '#42cb59' : '#ddd'}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleModifyEnrolment(enrolment.id)}
                        >
                          editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEnrolment(enrolment.id)}
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
                <h1>Não há matrículas ? Cadastre C:</h1>
              </Center>
            )}
          </>
        )}
      </Table>
    </Content>
  );
}
