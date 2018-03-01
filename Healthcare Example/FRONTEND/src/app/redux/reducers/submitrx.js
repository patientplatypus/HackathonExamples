const fillrx = (state = [], action) => {
  switch (action.type) {
    case 'SUBMIT_RX':
      console.log('value of FILL_RX: ', action.data);
      return state = action.data;
    case 'SUBMITRX_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default fillrx
