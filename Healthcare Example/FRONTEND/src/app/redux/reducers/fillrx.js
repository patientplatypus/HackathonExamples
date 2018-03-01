const fillrx = (state = [], action) => {
  switch (action.type) {
    case 'FILL_RX':
      console.log('value of RX_INFO: ', action.data);
      return state = action.data;
    case 'RX_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default fillrx
