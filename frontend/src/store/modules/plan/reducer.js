import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/REGISTER_PLAN_REQUEST':
        draft.loading = true;
        break;

      case '@plan/MODIFY_PLAN_REQUEST':
        draft.loading = true;
        break;
      default:
    }
  });
}
