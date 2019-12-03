import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { Head, Formcontent, Input, Button } from '~/styles/global';
import history from '~/services/history';
import { registerPlanRequest } from '~/store/modules/plan/actions';

export default function RegisterPlan() {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  const schema = Yup.object().shape({
    title: Yup.string().required('O título é obrigatório'),
    price: Yup.number('Insira um preço válido')
      .integer('Precisa ser inteiro')
      .positive('Precisa ser positivo')
      .typeError('Valor inválido')
      .required(),
    duration: Yup.number('Insira uma duração válida')
      .integer('Precisa ser inteiro')
      .positive('Precisa ser positivo')
      .required()
      .typeError('Valor inválido'),
  });

  async function handleSubmit(data) {
    dispatch(registerPlanRequest(data));
  }

  function handleReturn() {
    history.push('/plans');
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
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
                onChange={e => setDuration(e.target.value)}
                width={270}
              />
            </span>
            <span>
              <p>PREÇO MENSAL</p>
              <Input
                name="price"
                onChange={e => setPrice(e.target.value)}
                width={270}
              />
            </span>
            <span>
              <p>PREÇO TOTAL</p>
              <Input
                name="totalPrice"
                value={price * duration}
                type="number"
                readOnly
                disabled
                width={270}
              />
            </span>
          </div>
        </Formcontent>
      </Form>
    </>
  );
}
