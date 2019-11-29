import React from 'react';
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
import { registerStudentRequest } from '~/store/modules/student/actions';

export default function Register() {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.number('Insira uma idade válida')
      .integer()
      .positive()
      .required('A idade é obrigatória'),
    weight: Yup.number('Insira um peso válido').required(
      'O peso é obrigatório'
    ),
    height: Yup.number().required('A idade é obrigatória'),
  });

  async function handleSubmit(data) {
    // const response = await api.post('students', data);
    dispatch(registerStudentRequest(data));
  }
  function handleReturn() {
    history.push('/students');
  }

  return (
    <Container>
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
          <FormSpace>
            <span>NOME COMPLETO</span>
            <Input name="name" placeholder="John Doe" />
            <span>ENDEREÇO DE E-MAIL</span>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
            <div>
              <div>
                <span>IDADE</span>
                <Input name="age" type="number" />
              </div>
              <div>
                <span>PESO (em kg)</span>
                <Input name="weight" type="number" />
              </div>
              <div>
                <span>ALTURA</span>
                <Input name="height" type="number" />
              </div>
            </div>
          </FormSpace>
        </Form>
      </Content>
    </Container>
  );
}
