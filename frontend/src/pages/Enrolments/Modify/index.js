import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Head, Formcontent, Input, Button, Content } from '~/styles/global';
import history from '~/services/history';
import { modifyEnrolmentRequest } from '~/store/modules/enrolment/actions';
import api from '~/services/api';

import DatePicker from '~/components/DatePicker';
import AsyncSelect from '~/components/AsyncSelect';
import Select from '~/components/Select';

export default function ModifyEnrolment({ match }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('dd-mm-aaaa');
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [enrolment, setEnrolment] = useState({});
  const [totalPrice, setTotalPrice] = useState({});
  const [student, setStudent] = useState();

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
        r.map(st => ({
          label: st.name,
          value: st.id,
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

  async function loadInitialData() {
    const { data } = await api.get(`enrolments/${match.params.id}`);

    setEnrolment(data);

    setStudent({
      label: data.students.name,
      value: data.students.id,
    });

    setPlan({
      label: data.plans.title,
      value: data.plans.id,
    });

    setTotalPrice(data.totalPrice);
    setStartDate(parseISO(data.start_date), `dd'/'MM'/'yyyy`);
    setEndDate(format(parseISO(data.end_date), `dd'/'MM'/'yyyy`));
  }

  useEffect(() => {
    loadInitialData();
    loadPlans();
  }, []); // eslint-disable-line

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

  async function handleSubmit() {
    const data = {
      plan_id: plan.value,
      enrolment_id: enrolment.id,
      start_date: startDate,
    };
    dispatch(modifyEnrolmentRequest(data));
  }

  function handleReturn() {
    history.push('/enrolments');
  }

  return (
    <Content>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Head>
          <h2>Edição de matrícula</h2>
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
              defaultValueSelected={student}
              loadOptions={loadStudents}
              label="ALUNO"
              disabled
            />
          </span>
          <div>
            <span>
              <p>PLANO</p>
              <Select
                name="plan"
                options={plans}
                setChange={setPlan}
                defaultValueSelected={plan}
              />
            </span>
            <span>
              <p>DATA DE INÍCIO</p>
              <DatePicker
                name="start_date"
                setChange={setStartDate}
                selectedDate={startDate}
              />
            </span>
            <span>
              <p>DATA DE TÉRMINO</p>
              <Input
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
                type="text"
                value={`R$ ${plan.price * plan.duration || totalPrice}`}
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

ModifyEnrolment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
