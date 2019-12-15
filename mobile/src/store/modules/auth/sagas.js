import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
// delay do saga
import api from '../../../services/api';
// import history from "../../services/history";

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `students/${id}`);
    const student = response.data;
    if (!student) {
      Alert.alert('Erro no login', 'Confira seus dados');
      return;
    }
    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert('Falha na autenticação', 'contate seu administrador');
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push("/");
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
