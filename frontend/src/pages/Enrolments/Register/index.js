import React, { useState, useEffect } from 'react';
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
import { registerPlanRequest } from '~/store/modules/plan/actions';
import api from '~/services/api';

export default function EnrolmentRegister() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  // const schema = Yup.object().shape({
  //   student: Yup.string().required('O aluno é obrigatório'),
  //   plan: Yup.string('Insira um preço válido')
  //     .integer()
  //     .positive()
  //     .required('O preço é obrigatório'),
  //   start_date: Yup.date('Insira uma duração válida')
  //     .integer()
  //     .positive()
  //     .required('A duração é obrigatória'),
  // });

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans');
    }

    loadPlans();
  }, []);

  async function handleSubmit(data) {
    dispatch(registerPlanRequest(data));
  }

  function handleReturn() {
    history.push('/plans');
  }

  return (
    <Container>
      <Content>
        {/* <Form schema={schema} onSubmit={handleSubmit}> */}
        <Form onSubmit={handleSubmit}>
          <Head>
            <h2>Cadastro de matrícula</h2>
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
            <span>ALUNO</span>
            <Input name="student" />
            <div>
              <div>
                <span>DATA DE INÍCIO</span>
                <Input
                  name="start_date"
                  type="date"
                  // onChange={e => setDuration(e.target.value)}
                />
              </div>
              <div>
                <span>DATA DE TÉRMINO</span>
                <Input
                  name="end_date"
                  type="date"
                  readOnly
                  disabled
                  // onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div>
                <span>VALOR FINAL</span>
                <Input
                  name="totalPrice"
                  value={price * duration}
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
