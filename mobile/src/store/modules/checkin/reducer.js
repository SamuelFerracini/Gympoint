import produce from 'immer';

const INITIAL_STATE = {
  checked: false,
  loading: false,
  checkin: null,
};

export default function checkin(state = INITIAL_STATE, action) {
  return produce(state, () => {
    switch (action.type) {
      case '@checkin/CHECK_IN_REQUEST': {
        this.loading = true;
        break;
      }
      case '@checkin/CHECK_IN_SUCCESS': {
        this.checked = true;
        this.loading = false;
        this.checkin = action.payload.checkin;
        break;
      }
      case '@checkin/CHECK_IN_FAILURE': {
        this.loading = false;
        this.checkin = null;
        break;
      }
      default:
    }
  });
}
