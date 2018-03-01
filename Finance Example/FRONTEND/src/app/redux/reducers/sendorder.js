const sendorder = (state = [], action) => {
  switch (action.type) {
    case 'ORDER_RETURN':
      return state = action.data;
    case 'ORDER_ERROR':
      return state = action.data;
    default:
      return state;
  }
}

export default sendorder
