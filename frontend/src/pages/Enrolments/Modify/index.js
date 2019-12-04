import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { formatPrice } from '~/util/format';
import { Head, Formcontent, Input, Button } from '~/styles/global';
import history from '~/services/history';
import { modifyEnrolmentRequest } from '~/store/modules/enrolment/actions';
import api from '~/services/api';

import DatePicker from '~/components/DatePicker';
import AsyncSelect from '~/components/AsyncSelect';
import Select from '~/components/Select';

export default function ModifyEnrolment({ match }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [enrolment, setEnrolment] = useState({});
  const [initialData, setInitialData] = useState({});

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

  async function loadEnrolment() {
    const { id } = match.params;
    const { data } = await api.get(`enrolment/${id}`);
    setEnrolment(data);
  }

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }

    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    loadEnrolment();
    loadPlans();

    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, startDate, totalPrice]);// eslint-disable-line

  async function handleSubmit(data) {
    dispatch(modifyEnrolmentRequest(data));
  }

  function handleReturn() {
    history.push('/enrolments');
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
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
            <AsyncSelect
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
              <DatePicker name="start_date" setChange={setStartDate} />
            </span>
            <span>
              <p>DATA DE TÉRMINO</p>
              <Input
                name="end_date"
                type="text"
                value={end_date || 'dd-mm-aaaa'}
                readOnly
                disabled
              />
            </span>
            <span>
              <p>VALOR FINAL</p>
              <Input
                name="totalPrice"
                type="text"
                value={`R$ ${plan.price * plan.duration || 0}`}
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

ModifyEnrolment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
