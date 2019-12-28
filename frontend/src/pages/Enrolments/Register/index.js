import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { format, addMonths, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import history from '~/services/history';
import api from '~/services/api';

import { Head, Formcontent, Input, Button, Content } from '~/styles/global';
import { registerEnrolmentRequest } from '~/store/modules/enrolment/actions';

import DatePickerInput from '~/components/DatePickerInput';
import InputAsyncSelect from '~/components/InputAsyncSelect';
import Select from '~/components/Select';

export default function EnrolmentRegister() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});

  const [endDate, setEndDate] = useState('dd-mm-yyyy');

  const schema = Yup.object().shape({
    student: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Valor inválido')
      .required('Aluno obrigatório'),
    plan: Yup.object()
      .shape({
        value: Yup.number().integer(),
      })
      .typeError('Valor inválido')
      .required('Aluno obrigatório'),
    start_date: Yup.date()
      .typeError('Valor inválido')
      .required('Data obrigatória'),
  });

  async function loadStudents(inputValue) {
    const response = await api
      .get('students', {
        params: { name: `${inputValue}` },
      })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
    return response;
  }

  async function loadPlans() {
    const response = await api
      .get('plans')
      .then(r => r.data)
      .then(d =>
        d.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
        }))
      );

    setPlans(response);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    if (!plan.duration) {
      return;
    }
    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );

    setEndDate(formattedDate);
  }, [plan, startDate]);

  async function handleSubmit(data) {
    dispatch(registerEnrolmentRequest(data));
  }

  function handleReturn() {
    history.push('/enrolments');
  }

  return (
    <Content>
      <Form schema={schema} onSubmit={handleSubmit}>
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
        <Formcontent>
          <span>
            <p>ALUNO</p>
            <InputAsyncSelect
              name="student"
              loadOptions={loadStudents}
              label="ALUNO"
            />
          </span>
          <div>
            <span>
              <p>PLANO</p>
              <Select name="plan" options={plans} setChange={setPlan} />
            </span>
            <span>
              <p>DATA DE INÍCIO</p>
              <DatePickerInput
                name="start_date"
                setChange={setStartDate}
                selectedDate={startDate}
              />
            </span>
            <span>
              <p>DATA DE TÉRMINO</p>
              <Input
                width="198px"
                name="end_date"
                type="text"
                value={endDate}
                readOnly
                disabled
              />
            </span>
            <span>
              <p>VALOR FINAL</p>
              <Input
                name="totalPrice"
                width="198px"
                type="text"
                value={`R$ ${plan.price * plan.duration || 0}`}
                readOnly
                disabled
              />
            </span>
          </div>
        </Formcontent>
      </Form>
    </Content>
  );
}
