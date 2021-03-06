import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import student from './student/sagas';
import user from './user/sagas';
import plan from './plan/sagas';
import enrolment from './enrolment/sagas';

export default function* rootSaga() {
  return yield all([auth, user, student, plan, enrolment]);
}
