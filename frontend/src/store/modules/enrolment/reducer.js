import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function enrolment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrolment/REGISTER_ENROLMENT_REQUEST':
        draft.loading = true;
        break;

      case '@enrolment/MODIFY_ENROLMENT_REQUEST':
        draft.loading = true;
        break;
      default:
    }
  });
}
