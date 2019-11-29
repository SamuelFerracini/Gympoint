import React, { useState, useEffect } from 'react';
import api from '~/services/api';
import { Container, Content, Head, Table, Button } from '~/styles/global';
import history from '~/services/history';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans');
      setPlans(data);
    }

    loadPlans();
  }, []);

  function handleRegister() {
    history.push('/plans/register');
  }

  async function handleDeletePlan(id) {
    await api.delete(`plans/${id}`);
  }

  async function handleModifyPlan(id) {
    history.push(`plans/${id}`);
  }

  return (
    <Container>
      <Content>
        <Head>
          <h2>Gerenciando planos</h2>
          <div>
            <Button type="button" onClick={handleRegister} color="#ee4d64">
              CADASTRAR
            </Button>
            <input type="text" placeholder="Buscar plano" />
          </div>
        </Head>
        <Table>
          <table>
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR p/ MÊS</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>
                    {plan.duration === 1 ? '1 Mês' : `${plan.duration} meses`}
                  </td>
                  <td>R$ {plan.price}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleModifyPlan(plan.id)}
                    >
                      editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePlan(plan.id)}
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
