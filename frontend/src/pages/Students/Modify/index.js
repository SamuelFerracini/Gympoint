import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Head, Formcontent, Input, Button, Content } from '~/styles/global';
import history from '~/services/history';
import { modifyStudentRequest } from '~/store/modules/student/actions';
import api from '~/services/api';

export default function ModifyStudents({ match }) {
  const [student, setStudent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStudent() {
      const { id } = match.params;
      const { data } = await api.get(`students/${id}`);
      setStudent(data);
    }

    loadStudent();
  }, [match.params]);

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
    data.id = student.id;
    dispatch(modifyStudentRequest(data));
  }

  function handleReturn() {
    history.push('/students');
  }

  return (
    <Content>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <Head>
          <h2>Edição de Aluno</h2>
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
              <Input name="age" type="text" width="270px" />
            </span>
            <span>
              <p>PESO (em kg)</p>
              <Input name="weight" type="text" width="270px" />
            </span>
            <span>
              <p>ALTURA (em cm)</p>
              <Input name="height" type="text" width="270px" />
            </span>
          </div>
        </Formcontent>
      </Form>
    </Content>
  );
}

ModifyStudents.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
