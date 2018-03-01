const patientinfo = (state = [], action) => {
  switch (action.type) {
    case 'PATIENT_INFO':
      console.log('value of PATIENT_INFO: ', action.data);
      return state = action.data;
    case 'PATIENT_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default patientinfo
