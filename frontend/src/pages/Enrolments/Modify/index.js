import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
// import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import {
  Container,
  Content,
  Head,
  Input,
  Button,
  Formcontent,
} from '~/styles/global';
import history from '~/services/history';
import api from '~/services/api';
import { modifyPlanRequest } from '~/store/modules/plan/actions';

export default function Plan({ match }) {
  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState({});
  const [price, setPrice] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlan() {
      const { id } = match.params;
      const { data } = await api.get(`plans/${id}`);
      const { price, duration } = data;
      setPrice(price);
      setDuration(duration);
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
    <Container>
      <Formcontent initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <Head>
          <h1>Cadastro de plano</h1>
          <div>
            <Button type="button" onClick={handleReturn} color="#ccc">
              VOLTAR
            </Button>
            <Button type="submit" color="#ee4d64">
              SALVAR
            </Button>
          </div>
        </Head>
        <Content>
          <span>
            TÍTULO DO PLANO
            <Input name="title" />
          </span>
          <div>
            <span>
              DURAÇÃO (em meses)
              <Input
                name="duration"
                type="number"
                onChange={e => setDuration(e.target.value)}
              />
            </span>
            <span>
              PREÇO MENSAL
              <Input
                name="price"
                type="number"
                onChange={e => setPrice(e.target.value)}
              />
            </span>
            <span>
              PREÇO TOTAL
              <Input
                name="totalPrice"
                value={price * duration}
                type="number"
                readOnly
                disabled
              />
            </span>
          </div>
        </Content>
      </Formcontent>
    </Container>
  );

  // return (
  //   <Container>
  //     <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
  //       <Head>
  //         <h1>Cadastro de plano</h1>
  //         <div>
  //           <Button type="button" onClick={handleReturn} color="#ccc">
  //             VOLTAR
  //           </Button>
  //           <Button type="submit" color="#ee4d64">
  //             SALVAR
  //           </Button>
  //         </div>
  //       </Head>
  //       <Formcontent>
  //         <span>TÍTULO DO PLANO</span>
  //         <Input name="title" />
  //         <div>
  //           <div>
  //             <span>DURAÇÃO (em meses)</span>
  //             <Input
  //               name="duration"
  //               type="number"
  //               onChange={e => setDuration(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <span>PREÇO MENSAL</span>
  //             <Input
  //               name="price"
  //               type="number"
  //               onChange={e => setPrice(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <span>PREÇO TOTAL</span>
  //             <Input
  //               name="totalPrice"
  //               value={price * duration}
  //               type="number"
  //               readOnly
  //               disabled
  //             />
  //           </div>
  //         </div>
  //       </Formcontent>
  //     </Form>
  //   </Container>
  // );
}
