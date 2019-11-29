export function registerStudentRequest(data) {
  return {
    type: '@student/REGISTER_STUDENT_REQUEST',
    payload: { data },
  };
}

export function modifyStudentRequest(data) {
  return {
    type: '@student/MODIFY_STUDENT_REQUEST',
    payload: { data },
  };
}
