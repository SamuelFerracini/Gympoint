import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import { checkInSuccess, checkInFailure } from './actions';

export function* checkIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.post, `/students/${id}/checkins`);
    const checkin = response.data;
    yield put(checkInSuccess(checkin));
  } catch (err) {
    if (err.message === 'Request failed with status code 400') {
      Alert.alert(
        'Falha no checkin',
        'Você só pode fazer 5 checkins por semana'
      );
    } else {
      Alert.alert('Falha no checkin', 'Por favor, comunique o administrador!');
    }
    yield put(checkInFailure());
  }
}

export default all([takeLatest('@checkin/CHECK_IN_REQUEST', checkIn)]);
