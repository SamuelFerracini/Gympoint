import { combineReducers } from 'redux';

import auth from './student/reducer';
import user from './user/reducer';
// import student from './student/reducer';

const reducers = combineReducers({
  auth,
  user,
  // student,
});

export default reducers;
