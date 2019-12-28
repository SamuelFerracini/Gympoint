import React from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Head, Formcontent, Input, Button, Content } from '~/styles/global';
import history from '~/services/history';
import { registerStudentRequest } from '~/store/modules/student/actions';

export default function RegisterStudents() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.number()
      .integer('Precisa ser inteiro')
      .positive('Precisa ser positivo')
      .typeError('Valor inválido')
      .required(),
    weight: Yup.number()
      .required()
      .positive('Precisa ser positivo')
      .typeError('Valor inválido'),
    height: Yup.number()
      .required()
      .positive('Precisa ser positivo')
      .typeError('Valor inválido'),
  });

  async function handleSubmit(data) {
    dispatch(registerStudentRequest(data));
  }
  function handleReturn() {
    history.push('/students');
  }

  return (
    <Content>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Head>
          <h2>Cadastro de aluno</h2>
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
            <p>NOME COMPLETO</p>
            <Input name="name" placeholder="John Doe" />
          </span>
          <span>
            <p>ENDEREÇO DE E-MAIL</p>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
          </span>
          <div>
            <span>
              <p>IDADE</p>
              <Input name="age" width="270px" />
            </span>
            <span>
              <p>PESO (em kg)</p>
              <Input name="weight" width="270px" />
            </span>
            <span>
              <p>ALTURA (em cm)</p>
              <Input name="height" width="270px" />
            </span>
          </div>
        </Formcontent>
      </Form>
    </Content>
  );
}
