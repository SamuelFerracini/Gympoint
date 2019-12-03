export function registerEnrolmentRequest(data) {
  return {
    type: '@enrolment/REGISTER_ENROLMENT_REQUEST',
    payload: { data },
  };
}

export function modifyEnrolmentRequest(data) {
  return {
    type: '@enrolment/MODIFY_ENROLMENT_REQUEST',
    payload: { data },
  };
}
