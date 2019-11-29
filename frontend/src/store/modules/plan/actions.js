export function registerPlanRequest(data) {
  return {
    type: '@plan/REGISTER_PLAN_REQUEST',
    payload: { data },
  };
}

export function modifyPlanRequest(data) {
  return {
    type: '@plan/MODIFY_PLAN_REQUEST',
    payload: { data },
  };
}
