import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REGISTER_STUDENT_REQUEST':
        draft.loading = true;
        break;
      default:
    }
  });
}
