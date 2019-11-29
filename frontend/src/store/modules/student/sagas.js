import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

export function* registerStudent({ payload }) {
  try {
    const { name, email, age, height, weight } = payload.data;
    yield call(api.post, 'students', {
      name,
      email,
      age,
      height,
      weight,
    });
    toast.success('Estudante criado com sucesso');
  } catch (error) {
    toast.error('Falha no cadastro');
  }
}

export function* modifyStudent({ payload }) {
  try {
    const { id, name, email, age, height, weight } = payload.data;
    yield call(api.put, `students/${id}`, {
      name,
      email,
      age,
      height,
      weight,
    });
    toast.success('Estudante alterado com sucesso');
  } catch (error) {
    toast.error('Falha ao atualizar o estudante');
  }
}

export default all([
  takeLatest('@student/REGISTER_STUDENT_REQUEST', registerStudent),
  takeLatest('@student/MODIFY_STUDENT_REQUEST', modifyStudent),
]);
