
export function getAppointmentsForDay(state, day) {
  let result = []
  for (const obj of state.days) {
    if (obj.name === day) {
      for (const key of obj.appointments) {
          result.push(state.appointments[key]);
        }
      }
    }
  return result;
}

export function getInterview(state, interview) {
  let result = null;
  //onsole.log("state:",state,"interview:",interview);
  if (!interview) {
    return null;
  }
  result = {
      "student": interview.student,
      "interviewer": {
        "id": interview.interviewer,
        "name": state.interviewers[interview.interviewer].name,
        "avatar": state.interviewers[interview.interviewer].avatar
      }
    }
  return result;
  }

export function getInterviewersForDay(state, day) {
  let result = []
  for (const obj of state.days) {
    if (obj.name === day) {
      for (const key of obj.interviewers) {
          result.push(state.interviewers[key]);
        }
      }
    }
  return result;
}