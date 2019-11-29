import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

export function* registerPlan({ payload }) {
  try {
    const { title, price, duration } = payload.data;
    yield call(api.post, 'plans', {
      title,
      price,
      duration,
    });
    toast.success('Plano criado com sucesso');
  } catch (error) {
    toast.error('Falha no cadastro');
  }
}

export function* modifyPlan({ payload }) {
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
  takeLatest('@plan/REGISTER_PLAN_REQUEST', registerPlan),
  takeLatest('@plan/MODIFY_PLAN_REQUEST', modifyPlan),
]);
