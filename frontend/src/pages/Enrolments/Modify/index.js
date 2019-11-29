import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import {
  Container,
  Content,
  Head,
  FormSpace,
  Input,
  Button,
} from '~/styles/global';
import history from '~/services/history';
import { modifyStudentRequest } from '~/store/modules/student/actions';
import api from '~/services/api';

export default function Plan({ match }) {
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
    dispatch(modifyStudentRequest(data));
  }
  function handleReturn() {
    history.push('/plans');
  }

  return (
    <Container>
      <Content>
        <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
          <Head>
            <h2>Cadastro de plano</h2>
            <div>
              <Button type="button" onClick={handleReturn} color="#ccc">
                VOLTAR
              </Button>
              <Button type="submit" color="#ee4d64">
                SALVAR
              </Button>
            </div>
          </Head>
          <FormSpace>
            <span>TÍTULO DO PLANO</span>
            <Input name="title" />
            <div>
              <div>
                <span>DURAÇÃO (em meses)</span>
                <Input
                  name="duration"
                  type="number"
                  // onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div>
                <span>PREÇO MENSAL</span>
                <Input
                  name="price"
                  type="number"
                  // onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div>
                <span>PREÇO TOTAL</span>
                <Input
                  name="totalPrice"
                  value={plan.price * plan.duration}
                  type="number"
                  readOnly
                  disabled
                />
              </div>
            </div>
          </FormSpace>
        </Form>
      </Content>
    </Container>
  );
}
