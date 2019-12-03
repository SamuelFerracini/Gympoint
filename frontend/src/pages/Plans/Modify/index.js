import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Head, Formcontent, Input, Button } from '~/styles/global';
import history from '~/services/history';
import api from '~/services/api';
import { modifyPlanRequest } from '~/store/modules/plan/actions';

export default function ModifyPlan({ match }) {
  const [plan, setPlan] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlan() {
      const { id } = match.params;
      const { data } = await api.get(`plans/${id}`);
      setPlan(data);
    }

    loadPlan();
  }, [match.params]);

  const schema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    price: Yup.number('Insira um preço válido')
      .integer()
      .positive()
      .required('O preço é obrigatório'),
    duration: Yup.number('Insira uma duração válida')
      .integer()
      .positive()
      .required('A duração é obrigatória'),
  });

  async function handleSubmit(data) {
    data.id = plan.id;
    dispatch(modifyPlanRequest(data));
  }
  function handleReturn() {
    history.push('/plans');
  }

  return (
    <>
      <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <Head>
          <h2>Edição de plano</h2>
          <div>
            <Button type="button" onClick={handleReturn} color="#ccc">
              VOLTAR
            </Button>
            <Button type="submit" color="#ee4d64">
              SALVAR
            </Button>
          </div>
        </Head>
        <Formcontent>
          <span>
            <p>TÍTULO DO PLANO</p>
            <Input name="title" />
          </span>
          <div>
            <span>
              <p>DURAÇÃO (em meses)</p>
              <Input
                name="duration"
                type="number"
                width={270}
                // onChange={e => setDuration(e.target.value)}
              />
            </span>

            <span>
              <p>PREÇO MENSAL</p>
              <Input
                name="price"
                type="number"
                width={270}
                // onChange={e => setPrice(e.target.value)}
              />
            </span>

            <span>
              <p>PREÇO TOTAL</p>
              <Input
                name="totalPrice"
                value={plan.price * plan.duration}
                type="number"
                width={270}
                readOnly
                disabled
              />
            </span>
          </div>
        </Formcontent>
      </Form>
    </>
  );
}

ModifyPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
