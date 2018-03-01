const allpatients = (state = [], action) => {
  switch (action.type) {
    case 'ALL_PATIENTS':
      console.log('value of ALL_PATIENTS: ', action.data);
      return state = action.data;
    case 'ALL_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default allpatients
