import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

export function* registerEnrolment({ payload }) {
  try {
    const { student, plan, start_date } = payload.data;
    const { value: student_id } = student;
    const { value: plan_id } = plan;
    yield call(api.post, 'enrolments', {
      student_id,
      plan_id,
      start_date,
    });
    toast.success('Matrículula criada com sucesso');
  } catch (error) {
    toast.error('Falha no cadastro');
  }
}

export function* modifyEnrolment({ payload }) {
  try {
    const { id, title, price, duration } = payload.data;
    yield call(api.put, `plans/${id}`, {
      title,
      price,
      duration,
    });
    toast.success('Plano alterado com sucesso');
  } catch (error) {
    toast.error('Falha ao atualizar o plano');
  }
}

export default all([
  takeLatest('@enrolment/REGISTER_ENROLMENT_REQUEST', registerEnrolment),
  takeLatest('@enrolment/MODIFY_ENROLMENT_REQUEST', modifyEnrolment),
]);
