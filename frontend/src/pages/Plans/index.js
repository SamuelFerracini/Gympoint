import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { Head, Table, Button, Center, Content } from '../../styles/global';
import history from '../../services/history';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans');
      setPlans(data);
      setLoading(false);
    }

    loadPlans();
  }, []);

  function handleRegister() {
    history.push('/plans/register');
  }

  async function handleDeletePlan(id) {
    try {
      const result = window.confirm('Certeza que deseja deletar?');
      if (result) {
        const { data } = await api.delete(`plans/${id}`);
        setPlans(data);
      }
    } catch (e) {
      toast.error(e.response.data.error);
    }
  }

  async function handleModifyPlan(id) {
    history.push(`plans/${id}`);
  }

  return (
    <Content>
      <Head>
        <h2>Gerenciando planos</h2>
        <div>
          <Button type="button" onClick={handleRegister} color="#ee4d64">
            CADASTRAR
          </Button>
        </div>
      </Head>
      <Table>
        {loading ? (
          <Center>
            <h1>Carregando...</h1>
          </Center>
        ) : (
          <>
            {plans.length > 0 ? (
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
                        {plan.duration === 1
                          ? '1 Mês'
                          : `${plan.duration} meses`}
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
            ) : (
              <Center>
                <h1>Não há planos ? Cadastre C:</h1>
              </Center>
            )}
          </>
        )}
      </Table>
    </Content>
  );
}
