export function registerStudentRequest(data) {
  return {
    type: '@student/REGISTER_STUDENT_REQUEST',
    payload: { data },
  };
}
